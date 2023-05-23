<template>
  <div>
    <div class="col row row-cols-5 row-cols-xl-5">
      <div 
        v-for="(movie, idx) in movies"
        :key="idx">
        <MovieCard :movie="movie"/>
      </div>
    </div>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'
export default {
  name: 'MovieItemList',
  components: {
    MovieCard,
  },
  props:{
    movies: Array
  }
}
</script>

<style>

</style>