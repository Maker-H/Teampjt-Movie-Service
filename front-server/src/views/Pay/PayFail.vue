<template>
  <div class="text-white">
    <h1>결제 실패</h1>
    <h4>페이지를 닫아주세요</h4>
  </div>
</template>

<script>
export default {
  name: 'PayFail',
  created() {
    this.$store.dispatch('check/checkLoggedIn')
  },
  methods: {
  }
}
</script>

<style>

</style>