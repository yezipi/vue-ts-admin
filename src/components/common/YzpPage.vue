<template>
  <el-pagination
    hide-on-single-page
    style="margin-top: 20px"
    background
    :page-size="filter.page_size"
    :total="total"
    layout="total, prev, pager, next, jumper"
    @current-change="goPage"
  >
  </el-pagination>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class YzpPage extends Vue {
  @Prop({ default: '' }) api!: string
  @Prop({ default: {} }) condition!: object

  filter: any = {
    page: 1,
    page_size: 10,
    loading: true,
  }
  total: number = 0
  list: object[] = []

  mounted() {
    this.getList()
  }

  init() {
    this.filter.page = 1
    this.getList()
  }

  async getList() {
    if (!this.api) {
      return
    }
    try {
      const api = this.api.split('.')
      const params = {  ...this.filter, ...this.condition }
      console.log(this.api)
      const { result: { rows, count } } = await this.$api[api[0]][api[1]](params)
      this.total = count
      this.$emit('load', rows)
    } catch (error) {
      console.log(error)
    }
  }

  goPage(val: number) {
    this.filter.page = val;
    this.getList()
  }
}
</script>
