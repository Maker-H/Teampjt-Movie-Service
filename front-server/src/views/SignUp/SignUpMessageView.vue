<template>
  <div>
    <form @submit.prevent="sendMessage">
      <label for="phonenumber">phonenumber: </label>
      <input type="text" id="phonenumber" v-model="userNumber">
      <button @click="sendMessage">인증하기</button>
      <br>
      <label for="userInputCode">인증 번호: </label>
      <input type="text" id="userInputCode" v-model="userInputCode">
      <button @click="verify">인증 완료</button>
      <br>
      <button v-if="isVerified" @click="routeToSignUpPassword">다음</button>
      <button v-else>다음</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SignUpMessageView',
  data() {
    return {
      userNumber: null,
      userInputCode: null,
      isVerified: false,
    }
  },
  methods: {
    sendMessage() {
      this.$store.dispatch('signup/sendMessage', this.userNumber)
    },
    verify(){
      const verificationCode = this.$store.state.signup.verificationCode
      if(this.userInputCode == verificationCode) {
        alert('인증되었습니다')
        this.$store.dispatch('signup/storeUserNumber', this.userNumber)
        
        this.isVerified = true
      }
      else {
        alert('잘못된 인증번호 입니다 재입력해주세요')
      }
    },
    routeToSignUpPassword() {
      if (this.isVerified) {
        this.$router.push({name: 'SignUpPassword'})
      }
    }
  }
}
</script>

<style>

</style>