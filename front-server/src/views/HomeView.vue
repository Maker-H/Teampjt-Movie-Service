<template>
  <div class="home">
    <h1>Home</h1>
    <!-- <p>{{ latestMovieList }}</p> -->
  </div>
</template>

<script>
export default {
  name: "HomeView",
  created() {
    this.latestMovies();
  },
  computed: {
    latestMovieList() {
      // return this.$store.getters['todo/importantTodoList']
      // return this.$store.state.home.latestMovieList
    }
  },
  methods: {
    latestMovies() {
      this.$store.dispatch("home/latestMovies");
    },
  },
};
</script>
