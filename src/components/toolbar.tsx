import { effect, signal } from '@preact/signals';
import { faceDetector } from '../detection/core';
import { appState, FACE_DETECTION_CANVAS_ID, wasmState } from '../state';

const showProgress = signal(true);

effect(() => {
	if (wasmState.progress * 100 < 100) {
		setTimeout(() => {
			showProgress.value = false;
		}, 1000);
	}
});

export const Toolbar = () => {
	return (
		<div class={'autohat__toolbar'}>
			<div class="autohat__status">
				{showProgress.value && (
					<progress
						class="nes-progress is-success"
						value={wasmState.progress * 100}
						style={{
							transition: 'all 0.5s ease-in-out',
							pointerEvents: 'none'
						}}
						max="100"></progress>
				)}
			</div>
			<button
				type="button"
				class={['nes-btn', appState.noCurrentImage ? 'is-disabled' : 'is-primary'].join(' ')}
				disabled={appState.noCurrentImage}
				onClick={() => {
					console.log(faceDetector.detector);
					const canvas = document.getElementById(FACE_DETECTION_CANVAS_ID) as HTMLCanvasElement;
					if (!canvas) return;

					const result = faceDetector.detector.detect(canvas);
					console.log(result);
				}}>
				Autohat
			</button>
			<button
				type="button"
				class="nes-btn is-error is-small"
				onClick={() => {
					appState.deleteCurrentImage();
				}}>
				Clear
			</button>
		</div>
	);
};
