<template>
  <div>
    <form @submit.prevent="sendMessage">
      <label for="phonenumber">phonenumber: </label>
      <input type="text" id="phonenumber" v-model="userNumber">
      <button @click="sendMessage">인증하기</button>
      <br>
      <label for="verificationNumber">인증 번호: </label>
      <input type="text" id="verificationNumber" v-model="verificationNumber">
    </form>
  </div>
</template>

<script>
export default {
  name: 'SignUpMessageView',
  data() {
    return {
      userNumber: null,
      verificationNumber: null,
    }
  },
  methods: {
    sendMessage() {
      this.$store.dispatch('signup/signupMessage', this.userNumber)
    }
  }
}
</script>

<style>

</style>