import { effect } from '@preact/signals';
import { deepSignal } from 'deepsignal';
import { customAlphabet } from 'nanoid';

export type UserFile = {
	id: string;
	file: File;
	blobUrl: string | null;
	naturalWidth: number;
	naturalHeight: number;

	state: 'loading' | 'loaded';
};

type AppState = {
	images: Record<string, UserFile>;
	currentImageId: string | null;

	readonly noCurrentImage: boolean;
	readonly currentImage: UserFile | null;
	readonly isCurrentImageLoaded: boolean;

	deleteCurrentImage: () => void;
};

export const appState = deepSignal<AppState>({
	images: {},
	currentImageId: null,
	get noCurrentImage() {
		return appState.currentImageId === null;
	},
	get currentImage() {
		return appState.images[appState.currentImageId] ?? null;
	},
	get isCurrentImageLoaded() {
		const currentImage = appState.currentImage;
		return currentImage?.state === 'loaded';
	},
	deleteCurrentImage: () => {
		appState.images[appState.currentImageId] = undefined;
		appState.currentImageId = null;
	}
});

effect(() => {
	console.log(appState.images);
});

const idSpace = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 16);

export const newId = () => idSpace(16);
