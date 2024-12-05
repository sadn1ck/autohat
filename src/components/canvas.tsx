import { batch } from '@preact/signals';
import { Canvas as FabricCanvas } from 'fabric';
import { TargetedEvent, useEffect, useRef } from 'preact/compat';
import { appState, CANVAS_PADDING, canvasState, FACE_DETECTION_CANVAS_ID } from '../state';
import { addImageToFabricCanvas, newId } from '../utils';
import { Icon } from './icon';

function addFileToAppState(file: File) {
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

function handleImageChange(event: TargetedEvent<HTMLInputElement, Event>) {
	const target = event.target as HTMLInputElement;
	const file = target.files?.[0];
	if (file) {
		addFileToAppState(file);
	}
}

function handlePaste(event: ClipboardEvent) {
	const items = event.clipboardData?.items;
	if (!items) return;

	console.log(Array.from(items));

	const imageItem = Array.from(items).find((item) => item.type.includes('image'));
	if (!imageItem) return;

	const blob = imageItem.getAsFile();
	if (!blob) return;

	addFileToAppState(blob);
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

	useEffect(() => {
		window.addEventListener('paste', handlePaste);
		return () => {
			window.removeEventListener('paste', handlePaste);
		};
	}, []);

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
							<span
								style={{
									display: 'inline-flex',
									alignItems: 'center',
									gap: 8,
									verticalAlign: 'middle'
								}}>
								Or select image <Icon icon="image-new" size="md" />
							</span>
							<input
								id="image-input"
								aria-label="Select image"
								type="file"
								accept="image/*"
								onChange={handleImageChange}
							/>
						</label>
						<p class={'autohat__madeby'}>
							Made by <a href="https://x.com/__sadn1ck__">@sadn1ck</a>. Works offline.
						</p>
						<div class={'autohat__canvas-help'}>
							<p>From left to right</p>
							<p>
								<Icon icon="add-box" size="md" /> Add hat
							</p>
							<p>
								<Icon icon="zap" size="md" /> Auto add hats (kinda)
							</p>
							<p>
								<Icon icon="save" size="md" /> Save image
							</p>
							<p>
								<Icon icon="sync" size="md" /> Flip selected object
							</p>
							<p>
								<Icon icon="delete" size="md" /> Delete selected object
							</p>
							<p>
								<Icon icon="trash-alt" size="md" /> Clear canvas
							</p>
						</div>
					</div>
				</>
			) : (
				<>{isCurrentImageLoaded ? <LoadedCanvas /> : <p>Loading...</p>}</>
			)}
		</div>
	);
};
