<template>
  <div>
    <h1>결제 성공</h1>
    <h4>포인트 충전이 완료되었습니다.</h4>
    <a @click="moveProfile">프로필로 이동</a>
  </div>
</template>

<script>
import VueCookies from 'vue-cookies'

export default {
  name: 'PaySuccess',
  created() {
    this.paySuccess()
  },
  methods: {
    paySuccess(){
      const tid = VueCookies.get('kakaoTid')
      const pgToken = this.$route.query.pg_token
      const payload = {tid, pgToken}
      this.$store.dispatch('point/paySuccess', payload)
    },
    moveProfile(){
      this.$router.push({name : 'ProfileView'})
    }
  },

}
</script>

<style>

</style>