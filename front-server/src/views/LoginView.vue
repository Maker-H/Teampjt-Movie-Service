<template>
	<div id="login-total">
    <!-- 헤더 -->
    <div id="login-header">
			<img src="../../public/images/이모티콘.png" alt="">
      <h1 class="h3 mb-3 fw-normal color-white font-monospace" id="login-title">Please Login in</h1>
    </div>

    <!-- 바디 -->
		<form @submit.prevent="checkLoggedIn" class="form-signin" id="login-form">
			<label for="username" class="visually-hidden">Phone Number </label>
			<input type="text" id="username" class="form-control" placeholder="핸드폰 번호" required v-model="username">
			<br>
			<label for="password" class="visually-hidden">Password </label>
			<input type="text" id="password" class="form-control" placeholder="비밀번호" required v-model="password">
			<br>
			<button class="w-100 btn btn-lg btn-warning fw-bold text-muted font-monospace fs-4" @click="login">Login</button>
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
		},
    checkLoggedIn() {
      this.$$store.dispatch('check/checkLoggedIn')
    }
	}
}
</script>

<style scoped>
#login-header {
  margin-top: 70px;
}

.color-white {
  color: white;
}

#login-title {
  padding-top: 20px;
  padding-bottom: 10px;
}

#login-form {
  width: 400px;
  margin: 0 auto;
}

#login-total {
  margin-top: 90px;
}
</style>