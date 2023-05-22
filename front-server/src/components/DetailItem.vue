<template>
  <div>
    <h3>DetailItem</h3>
    <p>{{movie}}</p>
  </div>
</template>

<script>
export default {
    name: 'DetailItem',
    props: {
        movie: Object,
    },
}
</script>

<style>

</style>