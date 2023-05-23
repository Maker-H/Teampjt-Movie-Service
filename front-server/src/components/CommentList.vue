<template>
  <div>
    <div v-if="$route.path == '/v/comments'">
      <ul>
        <li v-for="comment in comments" :key="comment.id">{{ comment.content }}
          <!-- <button @click="addUpdateComment(comment.id)">수정</button>
          <button @click="deleteComment(comment.id)">삭제</button> -->
        </li>
      </ul>
    </div>
    <div v-else>
      <div>
        <h4 class="text-white p-3"><b>한 줄 평론 모아보기</b></h4>
      </div>
      <div class="d-flex flex-column justify-content-center">
        <div class="p-2 text-white" v-for="comment in comments" :key="comment.id">
          {{ comment.content }}
          <button class="btn btn-light mx-1" @click="addUpdateComment(comment.id)">수정</button>
          <button class="btn btn-light" @click="deleteComment(comment.id)">삭제</button>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentList',
  props: {
    comments : Array
  },
  methods: {
    deleteComment(commentId) {
      this.$store.dispatch('comment/deleteComment', commentId)
    },
    addUpdateComment(commentId) {
      this.$store.dispatch('comment/addUpdateComment', commentId)
    },
    }
}
</script>

<style>

</style>