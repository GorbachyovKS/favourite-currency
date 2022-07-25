<template>
<div>
	{{JSON.parse(item)}}
</div>
	
</template>

<script>
export default {
	props: {
		item: Object
	}
}
</script>

<style>

</style>