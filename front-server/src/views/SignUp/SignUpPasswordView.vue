<template>
  <div id="signup-total">
    <div id="signup-header">
      <img src="../../../public/images/이모티콘.png" alt="" />
      <h1
        class="h3 mb-3 fw-normal color-white font-monospace"
        id="signup-title"
      >
        Please SignUp
      </h1>
    </div>

    <form @submit.prevent="checkLoggedIn" class="form-signin" id="signup-form">
      <div class="side-label">
        <label for="username" class="side-label color-silver">핸드폰 번호</label>
      </div>
      <span class="form-control">{{ userNumber }}</span>
      <br />
      <div class="side-label">
        <label for="password1" class="color-silver">비밀번호</label>
      </div>
      <input
        type="text"
        id="password1"
        class="form-control"
        placeholder="비밀번호"
        required
        v-model="password1"
      />
      <br />
      <div class="side-label">
        <label for="password2" class="side-label color-silver"
        >비밀번호 재입력</label>
      </div>
      <input
        type="text"
        id="password2"
        class="form-control"
        placeholder="비밀번호"
        required
        v-model="password2"
      />
      <br />
      <button
        @click="signupPwd"
        class="w-100 btn btn-lg btn-warning fw-bold  font-monospace text-muted fs-4"
      >
        Complete Signup
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignUpPasswordView",
  data() {
    return {
      password1: null,
      password2: null,
    };
  },
  created() {
    this.userNumber
  },
  computed: {
    userNumber() {
      return this.$store.state.signup.renewedUserNumber.slice(1)
    },
  },
  methods: {
    signupPwd() {
      const renewedUserNumber = this.$store.state.signup.renewedUserNumber
      // console.log(renewedUserNumber)
      const password1 = this.password1;
      const password2 = this.password2;
      const user = {
        renewedUserNumber: renewedUserNumber,
        password1,
        password2,
      }
      this.$store.dispatch("signup/signupPwd", user)
    },
    checkLoggedIn() {
      this.$store.dispatch('check/checkLoggedIn')
    }
  },
};
</script>

<style scoped>
#signup-header {
  margin-top: 70px;
}

.color-white {
  color: white;
}

.color-silver {
  color: silver;
}

#signup-title {
  padding-top: 20px;
  padding-bottom: 10px;
}

#signup-form {
  width: 400px;
  margin: 0 auto;
}

#signup-total {
  margin-top: 90px;
}

.side-label {
  display: flex;
  justify-content: start;
}
</style>
