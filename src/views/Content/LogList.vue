<template>
  <div class="article-list">
    
    <el-form size="small" class="form-search" inline label-width="80px">
      <div class="fs-left"></div>
      <div class="fs-right">
        <el-button type="primary" size="small" icon="el-icon-edit-outline" @click="showDraw = true">
          创建日志
        </el-button>
      </div>
    </el-form>

    <el-table
      :data="list"
      class="admin-table"
      style="width: 100%">
      <el-table-column prop="title" width="400" label="内容">
        <template slot-scope="scope">
          <div class="html-content">{{ scope.row.content }}</div>
        </template>
      </el-table-column>

      <el-table-column prop="type" label="类型"></el-table-column>

      <el-table-column prop="time" label="发布时间">
        <template slot-scope="scope">
          <span>{{ scope.row.time | $formatTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <yzp-remove-btn :id="scope.row.id" api="log.remove" @change="pageRefs.getList()"></yzp-remove-btn>
        </template>
      </el-table-column>

    </el-table>
    <yzp-drawer v-model="showDraw" :loading="loading" title="添加日志" @confirm="add">
      <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="日志内容" prop="content">
          <el-input type="textarea" rows="3" v-model="ruleForm.content" placeholder="填写日志内容" maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="ruleForm.type" placeholder="请选择" style="display: block">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </yzp-drawer>
    <yzp-page ref="page" api="log.getList" @load="load"></yzp-page>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import LogEdit from '@/components/features/log/LogEdit.vue'

@Component({ name: 'LogList' })
export default class extends Vue {

  list: object[] = []

  showDraw: boolean = false

  ruleForm: any =  {
    type: '修复',
    content: '',
  }

  rules: object = {
    content: [
      { required: true, message: '请输入日志内容', trigger: 'blur' },
    ],
  }

  options: object[] =  [
    { name: '修复', value: 0 },
    { name: '新增', value: 1 },
    { name: '删除', value: 2 },
    { name: '优化', value: 3 },
  ]

  loading: boolean = false

  get pageRefs(): any {
    return this.$refs.page
  }

  load(data: object[]) {
    this.list = data
  }

  init() {
   this.pageRefs.init()
  }

  async add() {
    if (this.ruleForm.content.length < 5) {
      this.$message.error('内容太短了哦~')
      return
    }
    try {
      this.loading = true
      const { data } = await this.$api.log.create(this.ruleForm)
      this.ruleForm.content = ''
      this.showDraw = false
      this.$message.success('添加成功')
      this.init()
    } catch (e) {
      console.log(e)
    } finally {
      this.loading = false
    }
  }

}
</script>


<style scoped lang="scss">

</style>