// stores/tabbar.js
import { defineStore } from 'pinia';
import {ref} from 'vue'

export const useTabbarStore = defineStore('tabbar', () => {
	let tabbar = ref('home')
	const changeTabbar = (newTabbar) => {
		tabbar.value = newTabbar
	}
	
	return {tabbar,changeTabbar}
});