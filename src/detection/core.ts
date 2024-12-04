import { FaceDetector } from '@mediapipe/tasks-vision';

import { FilesetResolver } from '@mediapipe/tasks-vision';
import { effect } from '@preact/signals';
import { wasmState } from '../state';
import { fetchWithProgress } from '../utils';

class CustomFaceDetector {
	private static _instance: CustomFaceDetector;

	static getInstance() {
		if (!CustomFaceDetector._instance) {
			CustomFaceDetector._instance = new CustomFaceDetector();
		}
		return CustomFaceDetector._instance;
	}

	detector: FaceDetector;

	constructor() {
		this.init();
	}

	async init() {
		return new Promise<void>(async (resolve, reject) => {
			const vision = await FilesetResolver.forVisionTasks('/wasm');

			const progress = fetchWithProgress(
				'https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/latest/blaze_face_short_range.tflite',
				async (buffer) => {
					// todo: also store buffer in indexeddb
					// and retrieve in future sessions
					this.detector = await FaceDetector.createFromOptions(vision, {
						baseOptions: {
							// modelAssetPath:
							// 	'https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/latest/blaze_face_short_range.tflite',
							modelAssetBuffer: new Uint8Array(buffer),
							delegate: 'GPU'
						},
						runningMode: 'IMAGE'
					});
					wasmState.state = 'loaded';
				}
			);

			effect(() => {
				wasmState.progress = progress.progress;
			});

			resolve();
		});
	}
}

export const faceDetector = CustomFaceDetector.getInstance();
