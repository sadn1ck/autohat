import { deepSignal } from 'deepsignal';
import { Canvas as FabricCanvas, FabricImage } from 'fabric';
import { customAlphabet } from 'nanoid';

export function fetchWithProgress(url: string, onComplete: (response: ArrayBuffer) => void) {
	const progress = deepSignal({ progress: 0 });
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

const CANVAS_DRAW_MULTIPLIER = 2;
export function drawImageToCanvasAt2x(
	canvas: HTMLCanvasElement,
	image: HTMLImageElement,
	imageDims: { width: number; height: number }
) {
	const ctx = canvas.getContext('2d');
	canvas.width = imageDims.width * CANVAS_DRAW_MULTIPLIER;
	canvas.height = imageDims.height * CANVAS_DRAW_MULTIPLIER;
	canvas.style.width = `${imageDims.width}px`;
	canvas.style.height = `${imageDims.height}px`;
	ctx.drawImage(image, 0, 0, imageDims.width * CANVAS_DRAW_MULTIPLIER, imageDims.height * CANVAS_DRAW_MULTIPLIER);
}

const idSpace = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 16);
export const newId = () => idSpace(16);

export function addImageToFabricCanvas(
	canvas: FabricCanvas,
	imageElement: HTMLImageElement,
	imageDims: { width: number; height: number }
) {
	const image = new FabricImage(imageElement, {
		selectable: false
	});

	image.scale(Math.max(imageDims.width / imageElement.naturalWidth, imageDims.height / imageElement.naturalHeight));

	canvas.add(image);
}
