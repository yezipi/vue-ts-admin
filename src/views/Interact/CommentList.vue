<template>
  <comment-table type="article"></comment-table>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

import CommentTable from '@/components/features/Interact/CommentTable.vue'

@Component({ name: 'CommentList', components: { CommentTable } })
export default class extends Vue {}

</script>
