import { effect, signal } from '@preact/signals';
import { FabricImage } from 'fabric';
import { faceDetector } from '../detection/core';
import { appState, canvasState, FACE_DETECTION_CANVAS_ID, wasmState } from '../state';
import { Icon } from './icon';

const showProgress = signal(true);

effect(() => {
	if (wasmState.progress * 100 < 100) {
		setTimeout(() => {
			showProgress.value = false;
		}, 1000);
	}
});

async function onAutoAdd() {
	const canvas = document.getElementById(FACE_DETECTION_CANVAS_ID) as HTMLCanvasElement;
	if (!canvas) return;

	const result = faceDetector.detector.detect(canvas);

	for await (const face of result.detections) {
		if (face.categories?.[0]?.score < 0.75) return;

		const faceWidth = face.boundingBox?.width;

		const hatNumber = Math.floor(Math.random() * 3) + 1;
		const hatImage = await FabricImage.fromURL(
			`/hats/${hatNumber}.png`,
			{},
			{
				left: face.boundingBox?.originX / 2,
				top: face.boundingBox?.originY / 2
			}
		);

		hatImage.scaleToWidth(faceWidth);
		hatImage.set({
			top: hatImage.top - hatImage.height / 4,
			left: hatImage.left - hatImage.width / 4
		});

		canvasState.fabric.canvas.add(hatImage);
		canvasState.fabric.canvas.setActiveObject(hatImage);
	}
}

async function onAddHat() {
	// max 3 hats currently
	const hatNumber = Math.floor(Math.random() * 3) + 1;
	const hatImage = await FabricImage.fromURL(`/hats/${hatNumber}.png`, {});
	hatImage.scaleToWidth(128);
	// hatImage.controls = newFabricImageControls;
	canvasState.fabric.canvas.add(hatImage);
	canvasState.fabric.canvas.setActiveObject(hatImage);
}

function onSave() {
	const canvas = canvasState.fabric.canvas;
	canvas.discardActiveObject();
	const image = canvas.toDataURL({
		format: 'png',
		multiplier: 4
	});

	const a = document.createElement('a');
	a.download = 'autohat.png';
	a.href = image;
	a.click();
	a.remove();
}

function onFlip() {
	const activeObject = canvasState.fabric.canvas.getActiveObject();
	if (!activeObject) return;
	activeObject.set('flipX', !activeObject.flipX);
	canvasState.fabric.canvas.renderAll();
}

export const Toolbar = () => {
	return (
		<div class={'autohat__toolbar'}>
			{showProgress.value && (
				<progress
					title="Loading model"
					class="autohat__status nes-progress is-success"
					value={wasmState.progress * 100}
					max="100">
					Loading...
				</progress>
			)}
			<button
				type="button"
				class={['nes-btn', appState.noCurrentImage ? 'is-disabled' : ''].join(' ')}
				onClick={onAddHat}>
				<Icon icon="add-box" size="md" />
			</button>
			<button
				title="Auto add hats"
				type="button"
				class={['nes-btn', appState.noCurrentImage ? 'is-disabled' : 'is-primary'].join(' ')}
				disabled={appState.noCurrentImage}
				onClick={onAutoAdd}>
				<Icon icon="zap" size="md" />
			</button>
			<button
				title="Save image"
				type="button"
				class={['nes-btn', !!appState.currentImageId ? 'is-primary' : 'is-disabled'].join(' ')}
				onClick={onSave}>
				<Icon icon="save" size="md" />
			</button>
			<button title="Flip image" type="button" class="nes-btn" onClick={onFlip}>
				<Icon icon="sync" size="md" />
			</button>
			<button
				title="Delete selected object"
				type="button"
				class={['nes-btn', 'is-warning'].join(' ')}
				onClick={() => {
					canvasState.deleteCurrentSelectedObject();
				}}>
				<Icon icon="delete" size="md" />
			</button>
			<button
				title="Clear canvas"
				type="button"
				class="nes-btn is-error is-small"
				onClick={() => {
					appState.clearCanvas();
				}}>
				<Icon icon="trash-alt" size="md" />
			</button>
		</div>
	);
};
