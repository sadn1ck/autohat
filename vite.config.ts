import preact from '@preact/preset-vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		preact({
			prerender: {
				enabled: true,
				renderTarget: '#app'
			}
		})
	],
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('fabric')) {
						return 'fabric';
					}
					if (id.includes('mediapipe')) {
						return 'mediapipe';
					}
				}
			}
		}
	}
});
