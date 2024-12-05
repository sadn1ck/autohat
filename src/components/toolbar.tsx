import { effect, signal } from '@preact/signals';
import { FabricImage, Rect } from 'fabric';
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

function onAutoAdd() {
	const canvas = document.getElementById(FACE_DETECTION_CANVAS_ID) as HTMLCanvasElement;
	if (!canvas) return;

	const result = faceDetector.detector.detect(canvas);
	result.detections.forEach((face) => {
		const scale = Math.max(
			canvasState.fabric.width / face.boundingBox?.width,
			canvasState.fabric.height / face.boundingBox?.height
		);
		const rect = new Rect({
			left: face.boundingBox?.originX,
			top: face.boundingBox?.originY,
			width: face.boundingBox?.width,
			height: face.boundingBox?.height,
			fill: 'rgba(255, 0, 0, 0.3)',
			stroke: 'red',
			strokeWidth: 1,
			centeredScaling: true
		});
		console.log({ scale, ...face.boundingBox });
		rect.scale(scale);
		canvasState.fabric.canvas.add(rect);
	});
}

async function onAddHat() {
	// max 3 hats currently
	const hatNumber = Math.floor(Math.random() * 3) + 1;
	const hatImage = await FabricImage.fromURL(`/hats/${hatNumber}.png`, {});

	canvasState.fabric.canvas.add(hatImage);
}

function onSave() {
	const canvas = canvasState.fabric.canvas;
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

export const Toolbar = () => {
	return (
		<div class={'autohat__toolbar'}>
			{showProgress.value && (
				<progress
					class="autohat__status nes-progress is-success"
					value={wasmState.progress * 100}
					max="100"></progress>
			)}
			<button
				type="button"
				class={['nes-btn', appState.noCurrentImage ? 'is-disabled' : ''].join(' ')}
				onClick={onAddHat}>
				<Icon icon="add-box" size="lg" />
			</button>
			<button
				type="button"
				class={['nes-btn', appState.noCurrentImage ? 'is-disabled' : 'is-primary'].join(' ')}
				disabled={appState.noCurrentImage}
				onClick={onAutoAdd}>
				<Icon icon="zap" size="lg" />
			</button>
			<button type="button" class="nes-btn is-primary is-small" onClick={onSave}>
				<Icon icon="save" size="lg" />
			</button>
			<button
				type="button"
				class={['nes-btn', 'is-warning'].join(' ')}
				onClick={() => {
					canvasState.deleteCurrentSelectedObject();
				}}>
				<Icon icon="delete" size="lg" />
			</button>
			<button
				type="button"
				class="nes-btn is-error is-small"
				onClick={() => {
					appState.clearCanvas();
				}}>
				<Icon icon="trash" size="lg" />
			</button>
		</div>
	);
};
