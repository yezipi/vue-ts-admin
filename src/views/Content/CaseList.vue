<template>
  <case-table type="case"></case-table>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

import CaseTable from '@/components/features/Article/ArticleTable.vue'

@Component({ name: 'CaseList', components: { CaseTable } })
export default class extends Vue {}

</script>

