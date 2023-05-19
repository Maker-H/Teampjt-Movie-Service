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
      <ul>
        <li v-for="comment in comments" :key="comment.id">{{ comment.content }}
          <button @click="addUpdateComment(comment.id)">수정</button>
          <button @click="deleteComment(comment.id)">삭제</button>
        </li>
      </ul>
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