<template>
  <div>
    <h1>영화 추천</h1>
    <p>현재 날씨는 {{state}}, 기온은 {{temperature}}도 입니다</p>
  </div>
</template>

<script>
export default {
  name: 'RecommandView',
  created() {
    this.getRecommandMovieList()
  },
  computed: {
    state(){
      return this.$store.getters['recommand/state']
    },
    temperature(){
      return this.$store.getters['recommand/temperature']
    },
  },
  methods: {
    getRecommandMovieList() {
      this.$store.dispatch('recommand/getMovieList')
      this.$store.dispatch('recommand/getWeather')
    }
  }
}
</script>

<style>

</style>