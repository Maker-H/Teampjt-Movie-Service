<template>
  <div>
    <p>CommentForm</p>
    <hr>
    <CommentList v-for="comment in movieComments" :key="comment.id"
    :comment="comment"/>
    <hr>
    <CommentInput />
  </div>
</template>

<script>
import CommentInput from '@/components/CommentInput'
import CommentList from '@/components/CommentList'

export default {
  name: 'CommentForm',
  components: {
    CommentInput,
    CommentList
  },
  created() {
    this.getMovieCommentList()
  },
  computed: {
    movieComments() {
      return this.$store.getters['comment/movieCommentList']
    },
  },
  methods: {
    getMovieCommentList() {
      const movieId = this.$route.params.movieId
      this.$store.dispatch('comment/getCommentList', movieId)
      this.$store.dispatch('comment/getMovieCommentList', movieId)
    }
  }
}
</script>

<style>

</style>