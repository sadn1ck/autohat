import { batch } from '@preact/signals';
import { TargetedEvent } from 'preact/compat';
import { appState, newId } from '../state';

function handleImageChange(event: TargetedEvent<HTMLInputElement, Event>) {
	const target = event.target as HTMLInputElement;
	const file = target.files?.[0];
	if (file) {
		const id = newId();

		const blobUrl = URL.createObjectURL(file);
		batch(() => {
			appState.currentImageId = id;
			appState.images[id] = {
				id,
				file,
				blobUrl,
				naturalWidth: 0,
				naturalHeight: 0,
				state: 'loading'
			};
		});
		const image = new Image();
		image.src = blobUrl;
		image.onload = () => {
			batch(() => {
				appState.images[id].naturalWidth = image.naturalWidth;
				appState.images[id].naturalHeight = image.naturalHeight;
				appState.images[id].state = 'loaded';
			});
		};
	}
}

const LoadedCanvas = () => {
	const currentImage = appState.currentImage;
	return (
		<div class={'autohat__canvas-loaded'}>
			<img class={'autohat__canvas-loaded-image'} src={currentImage.blobUrl} alt={currentImage.file.name} />
		</div>
	);
};

export const Canvas = () => {
	const isCurrentImageLoaded = appState.isCurrentImageLoaded;

	return (
		<div class={'autohat__canvas-inner'}>
			{appState.noCurrentImage ? (
				<>
					<div class="autohat__canvas-empty">
						<p style={{ verticalAlign: 'baseline' }}>
							Paste with <kbd>cmd</kbd>
							<kbd>v</kbd>
						</p>
						<label class="nes-btn">
							<span>Or select your image</span>
							<input type="file" accept="image/*" onChange={handleImageChange} />
						</label>
					</div>
				</>
			) : (
				<>{isCurrentImageLoaded ? <LoadedCanvas /> : <p>Loading...</p>}</>
			)}
		</div>
	);
};
