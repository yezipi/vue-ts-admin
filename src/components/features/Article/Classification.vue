<template>
  <el-select v-model="val" placeholder="请选择类型" clearable @change="onSelectChange">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

@Component
export default class YzpPage extends Vue {
  @Prop({ default: '' }) value!: string
  @Prop({ default: 'article' }) type!: string

  options: object[] = []
  val: any = ''

  @Watch('value')
  WatchValue(newVal: any) {
    this.val = newVal
  }

  mounted() {
    this.getList()
  }

  async getList() {
    try {
      const { result: { rows } } = await this.$api.article.getClassification(this.type)
      this.options = rows
    } catch (error) {
      console.log(error)
    }
  }

  onSelectChange(data: any) {
    this.$emit('input', data)
  }
}
</script>
