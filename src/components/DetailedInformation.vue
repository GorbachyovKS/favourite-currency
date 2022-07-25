<template>
  <div>
	hello
	{{item}}
  </div>
</template>

<script>
export default {
props: {
	item: Object
},
mounted() {
	console.log(this.item)
}
}
</script>

<style>

</style>