<template>
  <div>
    <span>현재 포인트: </span>
    <h3>{{ userPoint }}P</h3>
    <form @submit.prevent="getPayment">
      <label for="amount">amount</label>
      <select name="amounts" id="amount" v-model="amountValue">
        <option value='1000'>1,000원</option>
        <option value='5000'>5,000원</option>
        <option value='10000'>10,000원</option>
      </select>
      <input type="submit" value="결제" />
    </form>
  </div>
</template>

<script>
export default {
  name: 'ProfilePoint',
  data() {
    return {
      amountValue: null,
    }
  },
  created() {
    this.getUserPoint()
  }, 
  methods: {
    getUserPoint() {
      this.$store.dispatch('point/getUserPoint')
    },
    getPayment(){
      const amount = this.amountValue
      this.$store.dispatch('point/getPayment', amount)
    },
  },
  computed: {
    userPoint() {
      return this.$store.state.point.userPoint
    }
  }
}
</script>

<style>

</style>