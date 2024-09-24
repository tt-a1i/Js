<!-- TreeNode.vue -->
<template>
	<li>
		<div
			@click="toggle"
			class="toggle"
			:class="{ folder: hasChildren, file: !hasChildren }"
		>
			{{ item.name }}
		</div>
		<ul v-if="hasChildren && open">
			<tree-node
				v-for="(child, index) in item.children"
				:key="index"
				:item="child"
			/>
		</ul>
	</li>
</template>

<script>
import { ref, computed } from "vue";

export default {
	name: "TreeNode",
	components: {
		TreeNode: defineAsyncComponent(() => import("./TreeNode.vue")),
	},
	props: {
		item: {
			type: Object,
			required: true,
		},
	},
	setup(props) {
		const open = ref(false);

		const hasChildren = computed(() => {
			return props.item.children && props.item.children.length;
		});

		const toggle = () => {
			if (hasChildren.value) {
				open.value = !open.value;
			}
		};

		return { open, hasChildren, toggle };
	},
};
</script>

<style scoped>
ul {
	list-style-type: none;
	padding-left: 20px;
}

.toggle {
	cursor: pointer;
}

.folder::before {
	content: "📁";
	margin-right: 5px;
}

.file::before {
	content: "📄";
	margin-right: 5px;
}
</style>
