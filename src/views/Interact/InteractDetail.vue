<template>
  <interact-edit v-model="visible"></interact-edit>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

import InteractEdit from '@/components/features/Interact/InteractEdit.vue'

@Component({ name: 'CommentList', components: { InteractEdit } })
export default class extends Vue {
  visible: boolean = false
}

</script>
