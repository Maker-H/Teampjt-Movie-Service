<template>
  <div>
    <!-- comment의 경우 보이는 부분 -->
    <div v-if="$route.path == '/v/comments'">
      <ul>
        <li v-for="comment in comments" :key="comment.id">{{ comment.content }}
          <!-- <button @click="addUpdateComment(comment.id)">수정</button>
          <button @click="deleteComment(comment.id)">삭제</button> -->
        </li>
      </ul>
    </div>

    <!-- comments가 아닌 경우 보이는 경우 (detail) -->
    <div v-else>
      <div>
        <h4 class="text-white p-3"><b>한 줄 평론 모아보기</b></h4>
      </div>
      <div class="d-flex flex-column justify-content-center" id="comments">
        <div class="p-2 text-white" v-for="comment in comments" :key="comment.id">
          {{ comment.content }}
          <div class="d-flex justify-content-end" id="comment-update">
            <p class="" @click="addUpdateComment(comment.id)">수정</p>
            <p class="margin-left-delete" @click="deleteComment(comment.id)">삭제</p>
          </div>
          <hr>
        </div>
      </div> 


    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentList',
  props: {
    comments: Array
  },
  methods: {
    deleteComment(commentId) {
      this.$store.dispatch('comment/deleteComment', commentId)
    },
    addUpdateComment(commentId) {
      this.$store.dispatch('comment/addUpdateComment', commentId)
      // 페이지 하단으로 이동하는 기능
      window.scrollTo({ 
        top: document.body.scrollHeight,
        behavior: "smooth" 
      });
    },
    }
}
</script>

<style scoped>
  #comment-update{
    margin-right: 20px;
    /* margin-top: 10; */
  }

  .margin-left-delete {
    margin-left:10px;
  }

  #comments {
    width: 800px;
    margin: 0 auto;
    border: 1px solid rgb(223, 124, 12);
    padding-top: 30px;
  }
</style>