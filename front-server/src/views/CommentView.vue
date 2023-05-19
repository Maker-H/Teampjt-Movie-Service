<template>
  <div>
    <h1>평론 리스트</h1>
    <hr>
    <CommentList :comments="comments"/>
  </div>
</template>

<script>
import CommentList from '@/components/CommentList'
export default {
  name: 'CommentView',
  components: {
    CommentList
  },
  created() {
    this.getCommentList()
  },
  methods: {
    getCommentList(){
      this.$store.dispatch('comment/getCommentList')
    }
  },
  computed: {
    comments() {
      return this.$store.getters['comment/commentList']
    }
  }
}
</script>

<style>

</style>