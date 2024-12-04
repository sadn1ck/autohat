import { appState } from '../state';

export const Toolbar = () => {
	return (
		<div class={'autohat__toolbar'}>
			<button
				type="button"
				class={['nes-btn', appState.noCurrentImage ? 'is-disabled' : 'is-primary'].join(' ')}
				disabled={appState.noCurrentImage}>
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
