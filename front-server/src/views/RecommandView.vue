<template>
  <div>
    <h1>영화 추천</h1>
    <p>현재 날씨는 {{state}}, 기온은 {{temperature}}도 입니다</p>
    <p>추천 장르는 {{recommandGenre}}입니다.</p>
    <p>{{ recommandMovie }}</p>
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
    recommandGenre(){
      return this.$store.getters['recommand/recommandGenre']
    },
    recommandMovie(){
      // console.log('recommand', this.$store.getters['recommand/recommandMovie'])
      return this.$store.getters['recommand/recommandMovie']
    }
  },
  methods: {
    getRecommandMovieList() {
      this.$store.dispatch('recommand/getMovieList')
      this.$store.dispatch('recommand/getGenreList')
      this.$store.dispatch('recommand/getWeather')
    }
  }
}
</script>

<style>

</style>