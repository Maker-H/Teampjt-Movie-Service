<template>
  <div>
    <h1>검색</h1>
    <h4>'{{ $route.query.title }}'에 대한 검색 결과입니다.</h4>
    <p v-if="searchMovies">{{searchMovies}}</p>
    <p v-else-if="(searchMovies && searchMovies.length) === 0">일치하는 검색결과가 없습니다.</p>
  </div>
</template>

<script>
export default {
  name: 'SearchView',
  data() {
    return {
    }
  },
  created() {
    this.getSearchMovieList()
  },
  computed: {
    searchMovies() {
      return this.$store.getters['search/searchMovieList']
    }
  },
  methods: {
    getSearchMovieList() {
      const movieTitle = this.$route.query.title
      this.$store.dispatch('search/getSearchMovieList', movieTitle)
    }
  }
}
</script>

<style>

</style>