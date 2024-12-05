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

// InteractiveFabricObject.controls.mtr = new Control({
// 	x: 0,
// 	y: 0.5,
// 	offsetX: -20,
// 	offsetY: 30,
// 	withConnection: false,
// 	actionName: 'rotate',
// 	cursorStyle: 'pointer',
// 	//mouseUpHandler: rotateObject,
// 	// cornerSize: 24,
// 	actionHandler: controlsUtils.rotationWithSnapping
// });

// const rotateIcon =
// 	'data:image/svg+xml;base64,PHN2ZyBmaWxsPSdub25lJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCc+PHBhdGggZD0nTTE2IDJoLTJ2MmgydjJINHYySDJ2NWgyVjhoMTJ2MmgtMnYyaDJ2LTJoMlY4aDJWNmgtMlY0aC0yVjJ6TTYgMjBoMnYyaDJ2LTJIOHYtMmgxMnYtMmgydi01aC0ydjVIOHYtMmgydi0ySDh2Mkg2djJINHYyaDJ2MnonIGZpbGw9J2N1cnJlbnRDb2xvcicvPjwvc3ZnPgo=';

// const mtr = new Control({
// 	x: 0,
// 	y: 0,
// 	touchSizeX: 44,
// 	touchSizeY: 44,
// 	actionHandler: controlsUtils.rotationWithSnapping,
// 	cursorStyleHandler: controlsUtils.rotationStyleHandler,
// 	withConnection: false,
// 	actionName: 'rotate',
// 	visible: true,
// 	render: function (ctx, left, top, styleOverride, fabricObject) {
// 		const size = 16;
// 		ctx.save();
// 		const img = new Image();
// 		img.src = rotateIcon;
// 		ctx.translate(left, top);
// 		ctx.rotate(util.degreesToRadians(fabricObject.angle));
// 		ctx.drawImage(img, -size / 2, -size / 2, size, size);
// 		ctx.restore();
// 	}
// });

// export const newFabricImageControls: Record<string, Control> = {
// 	...FabricImage.createControls().controls,
// 	mtr
// };
