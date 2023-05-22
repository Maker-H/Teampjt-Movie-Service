<template>
  <div>
    <h1>DetailView</h1> 
    <button v-if="!isLiked" @click="createLikedMovies">좋아요</button>
    <button v-else @click="createLikedMovies">좋아요 취소</button>
    <hr>
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
        this.getLikedMovie()
    },
    methods: {
        getDetailMovie(){
            this.$store.dispatch('detail/getDetailMovie', this.movieId)
        },
        getMovieCommentList() {
            this.$store.dispatch('comment/getCommentList')
            this.$store.dispatch('comment/getMovieCommentList', this.movieId)
        },
        createLikedMovies() {
            this.$store.dispatch('detail/createLikedMovies', this.movieId)
        },
        getLikedMovie() {
            this.$store.dispatch('detail/getLikedMovie', this.movieId)
        }
    },
    computed: {
        detailMovie() {
            return this.$store.getters['detail/detailMovie']
        },
        movieComments() {
            return this.$store.getters['comment/movieCommentList']
        },
        isLiked() {
            return this.$store.getters['detail/isLiked']
        },
    }
}
</script>

<style>

</style>