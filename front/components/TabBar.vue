<script setup>
	import {
		ref
	} from 'vue'
	import {
		useTabbarStore
	} from '../store/tabbar.js'

	const tabbarStore = useTabbarStore()

	let goto = (name) => {
		tabbarStore.changeTabbar(name)
		uni.switchTab({
			url: `/pages/${tabbarStore.tabbar}/index`
		})
	}
</script>

<template>
	<up-tabbar class="tabbar" :value="tabbarStore.tabbar" @change="goto" :fixed="true" :placeholder="true"
		activeColor="#32B9FF" :safeAreaInsetBottom="false">
		<up-tabbar-item text="首页" icon="home-fill" name="home"></up-tabbar-item>
		<up-tabbar-item text="申请信息" icon="list-dot" name="center"></up-tabbar-item>
		<up-tabbar-item text="个人中心" icon="account-fill" name="user"></up-tabbar-item>
	</up-tabbar>
</template>

<style lang="scss" scoped>
</style>