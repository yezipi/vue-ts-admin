<template>
  <el-button size="mini" type="text" @click="remove">删除</el-button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({ default: '' }) id!: any
  @Prop({ default: '' }) api!: string

  remove() {
    const me: any = this
    if (!this.api) {
      return me.$message('缺少api参数')
    }
    me.$doDelete(this.api, me.id).then(() => {
      this.$emit('change')
    })
  }
}
</script>
