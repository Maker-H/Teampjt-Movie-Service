<template>
	<div>
		<form @submit.prevent="signup">
			<label for="username">username: </label>
			<input type="text" id="username" v-model="username">
			<br>
			<label for="password1">비밀번호: </label>
			<input type="text" id="password1" v-model="password1">
      <br>
			<label for="password2">비밀번호 재입력: </label>
			<input type="text" id="password2" v-model="password2">
			<br>
			<button>회원가입</button>
		</form>
	</div>
</template>

<script>
export default {
  name: 'SignUpView',
  data() {
		return {
			username: null,
			password1: null,
			password2: null,
		}
	},
	methods: {
		signup() {
			const username = this.username
			const password1 = this.password1
			const password2 = this.password2
			const user = {
				username, password1, password2
			}
			this.$store.dispatch('signup/signup', user)
		}
	}
}
</script>

<style>

</style>