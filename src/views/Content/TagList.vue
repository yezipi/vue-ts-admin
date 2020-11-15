<template>
  <div class="tag-list">
    <el-tag
      v-for="(tag, index) in list"
      :key="index"
      :type="tag.type"
      :disable-transitions="false"
      effect="dark"
      closable
      @close="remove(tag)"
    >
      {{ tag.name }}
    </el-tag>
    <el-input
      v-if="inputVisible"
      class="input-new-tag"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
      placeholder="填写名称"
    >
    </el-input>
    <el-button v-else :loading="loading" class="button-new-tag" icon="el-icon-plus" size="small" @click="showInput">添加标签</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import LogEdit from '@/components/features/log/LogEdit.vue'

@Component({ name: 'LogList' })
export default class extends Vue {

  list: object[] = []

  inputVisible: boolean = false

  inputValue: string = ''

  loading: boolean = false

  tagTypeDict: any = {
    0: '',
    1: 'success',
    2: 'info',
    3: 'warning',
    4: 'danger',
  }

  load(data: object[]) {
    this.list = data
  }

  mounted() {
    this.init()
  }

  randomNum() {
    const num: any = Math.random() * 5
    return parseInt(num.toFixed(1), 10)
  }

  showInput() {
    this.inputVisible = true;
    this.$nextTick(() => {
      const refsInput: any = this.$refs.saveTagInput
      refsInput.$refs.input.focus();
    });
  }

  async init() {
    try {
      const { result } = await this.$api.tag.getList({ page: 1, page_size: 99, loading: true })
      this.list = result.rows.map((e: any) => {
        const num: number = this.randomNum()
        e.type = this.tagTypeDict[num]
        return e
      })
    } catch (e) {
      console.log(e)
    }
  }

  async handleInputConfirm() {
    if (!this.inputValue) {
      this.inputVisible = false;
      return
    }
    this.loading = true
    try {
      const { data } = await this.$api.tag.create({ name: this.inputValue })
      this.$message.success('添加成功')
      this.inputValue = ''
      this.init()
    } catch (e) {
      console.log(e)
    } finally {
      this.inputVisible = false;
      this.loading = false
    }
  }

  remove(item: any) {
    const me: any = this
    me.$doDelete('tag.remove', item.id).then(() => {
      this.init()
    })
  }

}
</script>


<style scoped lang="scss">
.el-tag {
  margin-right: 20px;
  margin-bottom: 20px
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-right: 20px;
}
</style>