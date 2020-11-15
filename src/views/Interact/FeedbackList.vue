<template>
  <comment-table type="feedback"></comment-table>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

import CommentTable from '@/components/features/Interact/CommentTable.vue'

@Component({ name: 'FeedbackList', components: { CommentTable } })
export default class extends Vue {}

</script>
