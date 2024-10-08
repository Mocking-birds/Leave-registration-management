import App from './App'


// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import * as Pinia from 'pinia';
import uviewPlus from '@/uni_modules/uview-plus'

export function createApp() {
	const app = createSSRApp(App);
	app.use(uviewPlus)
	app.use(Pinia.createPinia());
	return {
		app,
		Pinia
	}
}
// #endif