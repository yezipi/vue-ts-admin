<template>
  <el-switch
    v-model="val"
    :active-value="1"
    :inactive-value="0"
    size="mini"
    inactive-color="#999"
    @change="update"
  >
  </el-switch>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({ default: '' }) value!: any
  @Prop({ default: '' }) id!: string
  @Prop({ default: '' }) fields!: string // 更新的字段
  @Prop({ default: '' }) api!: string

  val: any = ''

  @Watch('value')
  WatchOpen(newVal: any) {
    console.log(newVal)
    this.val = newVal
  }

  mounted() {
    this.val = this.value
  }

  update() {
    const me: any = this
    if (!this.api) {
      return me.$message('缺少api参数')
    }
    const params: any = { id: me.id }
    params[me.fields] = me.val
    me.$doUpdate(this.api, params).then(() => {
      this.$emit('change')
    })
  }
}
</script>
