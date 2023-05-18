<template>
  <div class="home">
    <h1>Home</h1>
    <div 
      v-for="(movie, idx) in fiveLatestMovies"
      :key="idx"
    > 
      {{ movie.title }}
      {{ movie.released_date }}
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  created() {
    this.getLatestMovieList();
  },
  computed: {
    fiveLatestMovies() {
      return this.$store.getters['home/fiveLatestMovies']
      // return this.$store.state.home.latestMovieList
    }
  },
  methods: {
    getLatestMovieList() {
      this.$store.dispatch("home/getLatestMovieList")
    },
  },
};
</script>
