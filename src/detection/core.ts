import { FaceDetector, FilesetResolver } from '@mediapipe/tasks-vision';
import { effect } from '@preact/signals';
import { IDBPDatabase, openDB } from 'idb';
import { wasmState } from '../state';
import { fetchWithProgress } from '../utils';

class CustomFaceDetector {
	private static _instance: CustomFaceDetector;
	private cacheStorage: IDBPDatabase;
	private IDB_NAME = 'autohat_cache';
	private MODEL_STORE_NAME = 'model_cache';

	private MODEL_NAME = 'blaze_face_short_range';
	private MODEL_VERSION = 'latest';

	static getInstance() {
		if (!CustomFaceDetector._instance) {
			CustomFaceDetector._instance = new CustomFaceDetector();
		}
		return CustomFaceDetector._instance;
	}

	detector: FaceDetector;

	constructor() {
		if (typeof window === 'undefined') {
			return;
		}

		this.setupCache().then(() => {
			this.init();
		});
	}

	async setupCache() {
		return new Promise<void>(async (resolve, reject) => {
			try {
				this.cacheStorage = await openDB(this.IDB_NAME, 1, {
					upgrade: (db) => {
						db.createObjectStore(this.MODEL_STORE_NAME);
					}
				});
				resolve();
			} catch (error) {
				reject(error);
			}
		});
	}

	async getModelFromCache(modelName: string, modelVersion: string): Promise<ArrayBuffer | null> {
		let model: ArrayBuffer | null = null;
		try {
			const tx = this.cacheStorage.transaction(this.MODEL_STORE_NAME, 'readonly');
			const store = tx.store;
			model = await store.get(`${modelName}-${modelVersion}`);
		} catch (error) {
			console.error(`[model_cache] error getting model from cache`, error);
		}
		return model;
	}

	async putModelToCache(modelName: string, modelVersion: string, model: ArrayBuffer) {
		try {
			const tx = this.cacheStorage.transaction(this.MODEL_STORE_NAME, 'readwrite');
			const store = tx.store;
			const value = model;
			const key = `${modelName}-${modelVersion}`;
			await store.put(value, key);
		} catch (error) {
			console.error(`[model_cache] error putting model to cache`, error);
		}
	}

	async init() {
		return new Promise<void>(async (resolve, reject) => {
			const cachedModel = await this.getModelFromCache(this.MODEL_NAME, this.MODEL_VERSION);
			if (cachedModel) {
				console.log(`[model_cache] using cached model`);
				await this.createDetector(cachedModel);
				wasmState.progress = 1;
				resolve();
			} else {
				const url = `${window.location.origin}/wasm/blaze_face_short_range.tflite`;

				const progress = fetchWithProgress(url, async (buffer) => {
					await this.createDetector(buffer);
					wasmState.state = 'loaded';
					await this.putModelToCache(this.MODEL_NAME, this.MODEL_VERSION, buffer);
				});

				effect(() => {
					wasmState.progress = progress.progress;
				});
			}

			resolve();
		});
	}

	async createDetector(buffer: ArrayBuffer) {
		const vision = await FilesetResolver.forVisionTasks('/wasm');
		this.detector = await FaceDetector.createFromOptions(vision, {
			baseOptions: {
				modelAssetBuffer: new Uint8Array(buffer),
				delegate: 'GPU'
			},
			runningMode: 'IMAGE'
		});
		await this.putModelToCache(this.MODEL_NAME, this.MODEL_VERSION, buffer);
	}
}

export const faceDetector = CustomFaceDetector.getInstance();
