<template>
	<div id="app">
		<navbar />
		<index />
		<foot />
	</div>
</template>

<script>
import navbar from '@/components/navbar.vue';
import index from '@/components/index.vue';
import foot from '@/components/foot.vue';

export default {
	name: 'App',
	components: {
		navbar,
		index,
		foot,
	},
};
</script>
