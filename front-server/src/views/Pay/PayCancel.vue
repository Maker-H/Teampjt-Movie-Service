<template>
  <div class="text-white">
    <h1>결제 취소</h1>
    <h4>페이지를 닫아주세요</h4>
  </div>
</template>

<script>
export default {
  name: 'PayCancel',
  created() {
    this.$store.dispatch('check/checkLoggedIn')
  },
  methods: {
    
  },
}
</script>

<style>

</style>