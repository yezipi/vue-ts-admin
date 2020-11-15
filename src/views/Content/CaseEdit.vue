<template>
  <article-form type="case"></article-form>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

import ArticleForm from '@/components/features/Article/ArticleForm.vue'

@Component({ name: 'ArticleEdit', components: { ArticleForm } })
export default class extends Vue {}
</script>

