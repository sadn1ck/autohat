import { batch } from '@preact/signals';
import { Canvas as FabricCanvas } from 'fabric';
import { TargetedEvent, useEffect, useRef } from 'preact/compat';
import { appState, CANVAS_PADDING, canvasState, FACE_DETECTION_CANVAS_ID } from '../state';
import { addImageToFabricCanvas, newId } from '../utils';

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

	// new canvas for fabric
	const canvasContainerRef = useRef<HTMLCanvasElement>(null);
	const fabricCanvas = useRef<FabricCanvas>(null);

	useEffect(() => {
		const fbc = new FabricCanvas(canvasContainerRef.current, {
			selection: true,
			centeredScaling: true
		});
		fabricCanvas.current = fbc;

		canvasState.$fabric.value = {
			canvas: fbc,
			width: 0,
			height: 0
		};

		const observer = new ResizeObserver((entries) => {
			const fbCanvas = fabricCanvas.current;
			const imageDims = entries[0].contentRect;

			canvasState.$fabric.value = {
				canvas: fbCanvas,
				width: imageDims.width,
				height: imageDims.height
			};

			fbCanvas.setDimensions({
				width: imageDims.width + CANVAS_PADDING * 2,
				height: imageDims.height + CANVAS_PADDING * 2
			});
			const imageScale = Math.max(
				imageDims.width / currentImage.naturalWidth,
				imageDims.height / currentImage.naturalHeight
			);
			addImageToFabricCanvas(fbCanvas, ref.current, imageDims, imageScale);
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
			<div
				style={{
					position: 'absolute'
				}}>
				<canvas
					id={FACE_DETECTION_CANVAS_ID}
					class={'autohat__canvas-loaded-canvasel'}
					ref={canvasContainerRef}
				/>
			</div>
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
