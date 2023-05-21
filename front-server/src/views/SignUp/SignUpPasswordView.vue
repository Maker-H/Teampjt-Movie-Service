<template>
	<div>
		<form @submit.prevent="signupPwd">
			<label for="username">username: </label>
      <span>{{ username }}</span>
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
  computed: {
    username() {
      return this.$store.state.signup.userNumber
    }
  },
	methods: {
		signupPwd() {
			const username = this.username
			const password1 = this.password1
			const password2 = this.password2
			const user = {
				username, password1, password2
			}
			this.$store.dispatch('signup/signupPwd', user)
		}
	}
}
</script>

<style>

</style>