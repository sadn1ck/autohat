import { Canvas } from './components/canvas';
import { Toolbar } from './components/toolbar';

export function RootLayout() {
	return (
		<main class={'root'}>
			<div class="autohat__canvas nes-container with-title is-centered">
				<p class="title">autohat</p>
				<Canvas />
			</div>
			<Toolbar />
		</main>
	);
}
