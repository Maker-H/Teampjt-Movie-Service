<template>
  <div>
    <label for="phonenumber">phonenumber: </label>
    <input type="text" id="phonenumber" v-model="userNumber">
    <button @click="startVerify">인증하기</button>
    <br>
    <label for="userInputCode">인증 번호: </label>
    <input type="text" id="userInputCode" v-model="userInputCode">
    <span>{{ formatTime }}</span>
    <button @click="verify">인증 완료</button>
    <br>
    <button v-if="!isVerified" >다음(인증필요)</button>
    <button v-else @click="routeToSignUpPassword">다음</button>
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
      totalSeconds: 120, 
      remainingSeconds: 120, 
      timer: null 
    }
  },
  computed: {
    formatTime() {
      // Math.floor: 주어진 숫자와 같거나 작은 정수 중에서 가장 큰 수를 반환
      const minutes = Math.floor(this.remainingSeconds / 60)
      const seconds = this.remainingSeconds % 60

      // String.padStart: 2의 길이가 될때까지 앞을 0으로 채움
      return `${minutes}:${String(seconds).padStart(2, "0")}`
    }
  },
  methods: {
    startVerify() {
      this.sendMessage()
      this.startTimer()
    },
    startTimer() {
      if (this.timer) return; // 이미 타이머가 실행 중인 경우 중복 실행 방지

      this.timer = setInterval(() => {
        this.remainingSeconds--;

        if (this.remainingSeconds === 0) {
          clearInterval(this.timer)
          this.timer = null
          this.$store.dispatch('signup/clearVerificationCode')
        }
      }, 1000); // 1초마다 카운트다운 감소

      // 2분 후에 타이머 종료
      setTimeout(() => {
        clearInterval(this.timer)
        this.timer = null
        this.$store.dispatch('signup/clearVerificationCode')
      }, 120000); // 2분 = 120,000밀리초
    },
    sendMessage() {
      alert('발송되었습니다')
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
        this.userInputCode = ''
      }
    },
    routeToSignUpPassword() {
      if (this.isVerified) {
        this.$router.push({name: 'SignUpPasswordView'})
      }
    }
  }
}
</script>

<style>

</style>