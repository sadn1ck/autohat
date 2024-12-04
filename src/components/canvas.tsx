import { batch } from '@preact/signals';
import { TargetedEvent, useEffect, useRef } from 'preact/compat';
import { appState, FACE_DETECTION_CANVAS_ID } from '../state';
import { drawImageToCanvasAt2x, newId } from '../utils';

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
	const ref = useRef<HTMLImageElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const observer = new ResizeObserver((entries) => {
			const canvas = canvasRef.current;
			const imageDims = entries[0].contentRect;
			if (!canvas) return;
			drawImageToCanvasAt2x(canvas, ref.current, imageDims);
		});
		observer.observe(ref.current);

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<div class={'autohat__canvas-loaded'}>
			<img
				class={'autohat__canvas-loaded-image'}
				src={currentImage.blobUrl}
				alt={currentImage.file.name}
				ref={ref}
			/>
			<canvas id={FACE_DETECTION_CANVAS_ID} class={'autohat__canvas-loaded-canvasel'} ref={canvasRef} />
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
						<label htmlFor="image-input" class="nes-btn">
							<span>Or select image</span>
							<input
								id="image-input"
								aria-label="Select image"
								type="file"
								accept="image/*"
								onChange={handleImageChange}
							/>
						</label>
					</div>
				</>
			) : (
				<>{isCurrentImageLoaded ? <LoadedCanvas /> : <p>Loading...</p>}</>
			)}
		</div>
	);
};
