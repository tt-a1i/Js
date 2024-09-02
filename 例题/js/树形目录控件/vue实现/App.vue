<!-- App.vue -->
<template>
	<div id="app">
		<ul>
			<tree-node
				v-for="(item, index) in directoryData"
				:key="index"
				:item="item"
			/>
		</ul>
	</div>
</template>

<script>
import TreeNode from "./components/TreeNode.vue";
import { directoryData } from "./data.js";

export default {
	name: "App",
	components: {
		TreeNode,
	},
	setup() {
		return {
			directoryData,
		};
	},
};
</script>

<style>
body {
	font-family: Arial, sans-serif;
}

#app {
	padding: 20px;
}
</style>
