<template>
  <div>
    <h1>결제 취소</h1>
    <a @click="moveProfile">프로필로 이동</a>
  </div>
</template>

<script>
export default {
  name: 'PayCancel',
  methods: {
    moveProfile(){
      this.$router.push({name : 'ProfileView'})
    }
  },
}
</script>

<style>

</style>