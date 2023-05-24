<template>
  <div class="text-white">
    <h1>결제 성공</h1>
    <h4>포인트 충전이 완료되었습니다.</h4>
    <h4 class="text-danger">페이지를 닫아주세요</h4>
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
  },

}
</script>

<style>

</style>