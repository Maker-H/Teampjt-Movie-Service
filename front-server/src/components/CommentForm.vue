<template>
  <div>
    <p>CommentForm</p>
    <CommentList /><hr>
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
}
</script>

<style>

</style>