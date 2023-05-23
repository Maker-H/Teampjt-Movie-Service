<template>
  <div id="signup-total">
    <div id="signup-header">
      <img src="../../../public/images/이모티콘.png" alt="">
      <h1 class="h3 mb-3 fw-normal color-white font-monospace" id="signup-title">Please Verify</h1>
    </div>

    <div id="signup-form" class="form-signin">
      <!-- 핸드폰 번호 입력 후 문자 전송 -->
      <div class="d-flex">
        <label for="phonenumber" class="visually-hidden">Phone Number </label>
        <input type="text" id="phonenumber" class="form-control" placeholder="핸드폰 번호" required v-model="userNumber">
        <button @click="startVerify" class="w-25 btn btn-sm btn-secondary fw-bold font-monospace side-btn">번호 전송 </button>
      </div>
      <br>
      <!-- 인증번호 입력 -->
      <div class="d-flex">
        <label for="userInputCode" class="visually-hidden" >인증 번호: </label>
        <input type="text" id="userInputCode" class="form-control" placeholder="인증번호" required v-model="userInputCode">
        <button  @click="verify" class="w-25 btn btn-sm btn-secondary fw-bold fs-6 font-monospace side-btn">인증 완료</button>
      </div>

      <div id="time" class="fs-6">인증 시간 {{ formatTime }}</div>

      <br>
      <button v-if="!isVerified" class="not-verified w-100 btn btn-lg btn-secondary fw-bold text-muted font-monospace">Must Verify</button>
      <button v-else @click="routeToSignUpPassword" class="w-100 btn btn-lg btn-warning fw-bold font-monospace color-white fs-4">Go Next</button>
    </div>
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
    renewedUserNumber() {
      return "P" + this.userNumber.toString()
    },
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
      if (!this.userNumber) {
        alert('번호를 입력해주세요')
        return
      }
      this.sendMessage()
      this.startTimer()
    },
    startTimer() {
      this.remainingSeconds = 120
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
      // 메세지 보낼때는 실제 번호 사용
      this.$store.dispatch('signup/sendMessage', this.userNumber)
    },
    verify(){
      const verificationCode = this.$store.state.signup.verificationCode
      if(this.userInputCode == verificationCode) {
        // 회원가입할때는 P번호 사용
        this.$store.dispatch('signup/storeUserNumber', this.renewedUserNumber)
        this.isVerified = true
        // this.routeToSignUpPassword()
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

<style scoped>
#signup-total {
  margin-top: 90px;
}

#signup-header {
  margin-top: 70px;
}

.color-white {
  color: white;
}

#signup-title {
  padding-top: 20px;
  padding-bottom: 10px;
}

#signup-form {
  width: 450px;
  margin: 0 auto;
}

.side-btn {
  margin-left: 10px;
}

.form-control {
  width: 350px;
}

#time {
  color: white;
  margin-top: 30px;
}
</style>