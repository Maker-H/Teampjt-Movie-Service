<template>
	<div>
		<form @submit.prevent="login">
			<label for="username">username: </label>
			<input type="text" id="username" v-model="username">
			<br>
			<label for="password">password: </label>
			<input type="text" id="password" v-model="password">
			<br>
			<button @click="login">로그인</button>
		</form>
	</div>
</template>

<script>
export default {
	name: 'LoginView',
	data() {
		return {
			username: null,
			password: null,
		}
	},
	methods: {
		login() {
			const renewedUsername = "P" + this.username
			const password = this.password
			const user = {
				renewedUsername, password
			}
			this.$store.dispatch('login/login', user)
		}
	}
}
</script>

<style>

</style>