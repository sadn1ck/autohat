import { deepSignal } from 'deepsignal';
import { Canvas as FabricCanvas, FabricImage } from 'fabric';
import { customAlphabet } from 'nanoid';
import { CANVAS_PADDING } from './state';

export function fetchWithProgress(url: string, onComplete: (response: ArrayBuffer) => void) {
	const progress = deepSignal({ progress: 0 });
	if (typeof window === 'undefined') {
		return progress;
	}

	const xhr = new XMLHttpRequest();

	xhr.open('GET', url);
	xhr.responseType = 'arraybuffer';
	xhr.onload = () => {
		onComplete(xhr.response);
	};
	xhr.onprogress = (event) => {
		progress.progress = event.loaded / event.total;
	};
	xhr.send();

	return progress;
}

const idSpace = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 16);
export const newId = () => idSpace(16);

export function addImageToFabricCanvas(
	canvas: FabricCanvas,
	imageElement: HTMLImageElement,
	imageDims: { width: number; height: number },
	imageScale: number
) {
	const image = new FabricImage(imageElement, {
		selectable: false,
		left: CANVAS_PADDING,
		top: CANVAS_PADDING
	});

	image.scale(imageScale);

	canvas.add(image);
}
