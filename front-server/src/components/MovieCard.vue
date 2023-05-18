<template>
  
  <div
    id="movie-card" 
    class="card mb-3 mx-auto" 
    style="width: 18rem;"
  >
    <img :src="poster" class="card-img-top" alt="...">

      <!-- 홈인 경우 내용을 안보이게 한다 -->
    <div v-if="$route.path !== '/v'">
      <div class="card-body">
        <p class="card-text">{{ movie.title }}</p>
        <p class="card-text">{{ movieOverview }}</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movie: Object,
  },
  computed: {
    poster() {
      return `https://image.tmdb.org/t/p/original${this.movie.poster_path}`
    },
    movieOverview() {
      return this.movie.overview.slice(0, 100)
    }
  }
}
</script>

<style>

</style>