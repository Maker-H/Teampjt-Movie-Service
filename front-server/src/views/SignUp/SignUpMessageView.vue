<template>
  <div>
    <form>
      <label for="phonenumber">phonenumber: </label>
      <input type="text" id="phonenumber">
      <button @click="sendMessage">인증하기</button>
      <br>
      <label for="messagenumber">인증 번호: </label>
      <input type="text" id="messagenumber">
    </form>
  </div>
</template>

<script>
export default {
  name: 'SignUpMessage',
  methods: {
    sendMessage() {
      
    }
  }
}
</script>

<style>

</style>