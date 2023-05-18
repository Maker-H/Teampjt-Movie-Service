<template>
  <div class="home">
    <h1>Home</h1>
    <div> 
      <MovieItemList :movies="fiveLatestMovies"/>
    </div>
  </div>
</template>

<script>
import MovieItemList from '@/components/MovieItemList.vue';
export default {
  name: "HomeView",
  components: {
    MovieItemList
  },
  created() {
    this.getLatestMovieList();
  },
  computed: {
    fiveLatestMovies() {
      return this.$store.getters['home/fiveLatestMovies']
    }
  },
  methods: {
    getLatestMovieList() {
      this.$store.dispatch("home/getLatestMovieList")
    },
  },
};
</script>
