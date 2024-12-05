import { deepSignal } from 'deepsignal';
import { Canvas as FabricCanvas } from 'fabric';

export type UserFile = {
	id: string;
	file: File;
	blobUrl: string | null;
	naturalWidth: number;
	naturalHeight: number;

	state: 'loading' | 'loaded';
};

export const appState = deepSignal({
	images: {},
	currentImageId: null,
	get noCurrentImage() {
		return appState.currentImageId === null;
	},
	get currentImage() {
		return appState.images[appState.currentImageId] ?? null;
	},
	get isCurrentImageLoaded() {
		const currentImage = appState.images[appState.currentImageId];
		return currentImage?.state === 'loaded';
	},
	clearCanvas: () => {
		appState.images[appState.currentImageId] = undefined;
		appState.currentImageId = null;
	}
});

type CanvasState = {
	fabric: {
		canvas: FabricCanvas | null;
		width: number;
		height: number;
	};
	deleteCurrentSelectedObject: () => void;
};

export const canvasState = deepSignal<CanvasState>({
	fabric: {
		canvas: null,
		width: 0,
		height: 0
	},
	deleteCurrentSelectedObject: () => {
		const fb = canvasState.fabric.canvas;
		if (!fb) return;
		const selectedObjects = fb.getActiveObject();
		if (!selectedObjects) return;
		fb.remove(selectedObjects);
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

export const CANVAS_PADDING = 50;
