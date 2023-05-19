<template>
  <div>
    <h1>DetailView</h1> 
    <DetailItem :movie="detailMovie"/>
    <hr>
    <CommentList :comments="movieComments"/>
    <hr>
    <CommentInput />
  </div>
</template>

<script>
import DetailItem from '@/components/DetailItem'
import CommentList from '@/components/CommentList'
import CommentInput from '@/components/CommentInput'

export default {
    name: 'DetailView',
    components: {
        DetailItem,
        CommentList,
        CommentInput,
    },
    data() {
        return {
            movieId: this.$route.params.movieId,
        }
    },
    created() {
        this.getDetailMovie()
        this.getMovieCommentList()
    },
    methods: {
        getDetailMovie(){
            this.$store.dispatch('detail/getDetailMovie', this.movieId)
        },
        getMovieCommentList() {
            const movieId = this.$route.params.movieId
            this.$store.dispatch('comment/getCommentList')
            this.$store.dispatch('comment/getMovieCommentList', movieId)
        }
    },
    computed: {
        detailMovie() {
            return this.$store.getters['detail/detailMovie']
        },
        movieComments() {
            return this.$store.getters['comment/movieCommentList']
        },
    }
}
</script>

<style>

</style>