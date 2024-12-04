import { deepSignal } from 'deepsignal';

export type UserFile = {
	id: string;
	file: File;
	blobUrl: string | null;
	naturalWidth: number;
	naturalHeight: number;

	state: 'loading' | 'loaded';
};

type AppState = {
	images: Record<string, UserFile>;
	currentImageId: string | null;

	readonly noCurrentImage: boolean;
	readonly currentImage: UserFile | null;
	readonly isCurrentImageLoaded: boolean;

	deleteCurrentImage: () => void;
};

export const appState = deepSignal<AppState>({
	images: {},
	currentImageId: null,
	get noCurrentImage() {
		return appState.currentImageId === null;
	},
	get currentImage() {
		return appState.images[appState.currentImageId] ?? null;
	},
	get isCurrentImageLoaded() {
		const currentImage = appState.currentImage;
		return currentImage?.state === 'loaded';
	},
	deleteCurrentImage: () => {
		appState.images[appState.currentImageId] = undefined;
		appState.currentImageId = null;
	}
});

type WasmState = {
	state: 'loading' | 'loaded' | 'error';
	progress: number;
};

export const wasmState = deepSignal<WasmState>({
	state: 'loading',
	progress: 0
});

export const FACE_DETECTION_CANVAS_ID = 'face-detector-canvas-el';
