<template>
  <div>
    <span>현재 포인트: </span>
    <h3>{{ userPoint }}P</h3>
  </div>
</template>

<script>
export default {
  name: 'ProfilePoint',
  created() {
    this.getUserPoint()
  }, 
  methods: {
    getUserPoint() {
      this.$store.dispatch('point/getUserPoint')
    }
  },
  computed: {
    userPoint() {
      return this.$store.state.point.userPoint
    }
  }
}
</script>

<style>

</style>