import { hydrate, prerender as ssr } from 'preact-iso';

import { RootLayout } from './root';
import './style.css';

export function App() {
	return <RootLayout />;
}

if (typeof window !== 'undefined') {
	hydrate(<App />, document.getElementById('app'));
}

export async function prerender(data) {
	return await ssr(<App {...data} />);
}
