<template>
  <article-table type="article"></article-table>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

import ArticleTable from '@/components/features/Article/ArticleTable.vue'

@Component({ name: 'ArticleList', components: { ArticleTable } })
export default class extends Vue {}

</script>

