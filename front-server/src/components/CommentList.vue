<template>
  <div>
    <ul>
      <li>{{ comment.content }}
        <button>수정</button>
        <button @click="deleteComment(comment.id)">삭제</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CommentList',
  props: {
    comment : Object
  },
  methods: {
    deleteComment(commentId) {
      this.$store.dispatch('comment/deleteComment', commentId)
    }
  }
}
</script>

<style>

</style>