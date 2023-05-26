<template>
  <div class="text-white">
    <span>현재 포인트</span>
    <h3>{{ userPoint }}P</h3>
    <form @submit.prevent="getPayment">
      <div class="d-flex justify-content-center align-items-center">
        <label for="amount" style="margin-right:20px"><b>포인트 충전</b></label>
        <div style="max-width: 200px;">
          <select class="form-select" name="amounts" id="amount" aria-label="select example" v-model="amountValue">
            <option selected>금액 선택</option>
            <option value='1000'>1,000원</option>
            <option value='5000'>5,000원</option>
            <option value='10000'>10,000원</option>
          </select>
        </div>
        <div>
          <input class="image-input" type="submit" value=""/>
        </div>
      </div>
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
      this.$router.push({name : 'RecommandView'})
    },
  },
  computed: {
    userPoint() {
      return this.$store.state.point.userPoint
    }
  }
}
</script>

<style scoped>
  .image-input {
    background-image: url('../../public/images/payment_icon_yellow_large.png');
    margin-top: 10px;
    margin-left: 10px;
    padding: 20px 40px;
    background-color: transparent;
    border: none;
    outline: none;
    color: transparent;
    text-shadow: 0 0 0 black;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
</style>