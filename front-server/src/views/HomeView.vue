<template>
  <div class="home">
    <h1>Home</h1>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  created() {
    this.latestMovies();
  },
  methods: {
    latestMovies() {
      this.$store.dispatch("home/latestMovies");
    },
  },
};
</script>
