<template>
	<div>
		<form @submit.prevent="">
			<label for="username">username: </label>
      <span>{{ userNumber }}</span>
			<br>
			<label for="password1">비밀번호: </label>
			<input type="text" id="password1" v-model="password1">
      <br>
			<label for="password2">비밀번호 재입력: </label>
			<input type="text" id="password2" v-model="password2">
			<br>
			<button @click="signupPwd">회원가입</button>
		</form>
	</div>
</template>

<script>
export default {
  name: 'SignUpPasswordView',
  data() {
		return {
			password1: null,
			password2: null,
		}
	},
  created() {
    this.userNumber
  },
  computed: {
    userNumber() {
      return this.$store.state.signup.renewedUserNumber
    }
  },
	methods: {
		signupPwd() {
      const renewedUserNumber = this.$store.state.signup.renewedUserNumber
      // console.log(renewedUserNumber)
			const password1 = this.password1
			const password2 = this.password2
			const user = {
				'renewedUserNumber': renewedUserNumber
        , password1, password2
			}
			this.$store.dispatch('signup/signupPwd', user)
		}
	}
}
</script>

<style>

</style>