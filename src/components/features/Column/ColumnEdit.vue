<template>
  <yzp-drawer
    v-model="drawVisible"
    :loading="loading"
    :wrapperClosable="false"
    width="40%"
    title="编辑栏目"
    @confirm="confirm"
    @open="open"
    @close="close">
    <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="栏目标题" prop="name">
        <el-input v-model="ruleForm.name" placeholder="填写栏目标题" maxlength="10">
        </el-input>
      </el-form-item>
      <el-form-item label="栏目url" prop="url">
        <el-input v-model="ruleForm.url" auto-complete="off" placeholder="填写url名称，英文" maxlength="20">
        </el-input>
      </el-form-item>
      <el-form-item label="栏目类型">
        <el-select v-model="ruleForm.type" @change="changeType">
          <el-option v-for="(item,index) in typeList" :key="index" :label="item.alias" :value="item.type" :disabled="item.disabled && id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="打开方式">
        <el-radio-group v-model="ruleForm.is_new_window">
          <el-radio :label="0">
            原窗口
          </el-radio>
          <el-radio :label="1">
            新窗口
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否显示">
        <el-radio-group v-model="ruleForm.status">
          <el-radio :label="1">
            显示
          </el-radio>
          <el-radio :label="0">
            隐藏
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="栏目排序" prop="sort">
        <el-input v-model="ruleForm.sort" type="number" auto-complete="off" placeholder="填写栏目排序" maxlength="2">
        </el-input>
      </el-form-item>
      <el-form-item label="关键字">
        <el-input v-model="ruleForm.keywords" auto-complete="off" placeholder="填写关键字" maxlength="20">
        </el-input>
      </el-form-item>
      <el-form-item label="栏目描述">
        <el-input v-model="ruleForm.description" type="textarea" auto-complete="off" placeholder="填写栏目描述" maxlength="100">
        </el-input>
      </el-form-item>
      <el-form-item label="栏目内容" prop="content" class="editor">
        <yzp-editor ref="editor" v-model="ruleForm.content"></yzp-editor>
      </el-form-item>
    </el-form>
  </yzp-drawer>
</template>

<script lang="ts">

import { Component, Vue, Prop, Watch } from 'vue-property-decorator'


import YzpEditor from '@/components/common/YzpEditor.vue'

@Component({ name: 'ColumnEdit', components: { YzpEditor } })
export default class extends Vue {
  @Prop({ default: false }) value!: boolean
  @Prop({ default: '' }) id!: string

  loading: boolean = false

  drawVisible: boolean = false

  ruleForm: any = {
    name: '',
    alias: '',
    url: '',
    type: 'single',
    is_new_window: 0,
    status: 1,
    sort: 100,
    keywords: '',
    description: '',
    content: '',
  }

  rules: any = {
    name: [{ message: '标题必修', required: true, trigger: 'blur' }],
    sort: [{ message: '排序必修', required: true, trigger: 'blur' }],
    url: [{ message: '路径必修', required: true, trigger: 'blur' }],
    content: [{ message: '内容必修', required: true, trigger: 'blur' }],
  }

  typeList: any =  [
    { alias: '单页', type: 'single' },
  ]

  currentType: string = ''

  @Watch('value')
  WatchOpen(newVal: any) {
    this.drawVisible = newVal
  }

  open() {
    this.getInfo()
  }

  close() {
    this.drawVisible = false
    this.$emit('input', false)
  }

  changeType(v: any) {
    this.typeList.forEach((e: any) => {
      if (e.type === v) {
        this.ruleForm.alias = e.alias;
      }
    });
  }

  async getInfo() {
    if (!this.id) {
      return
    }
    try {
      const params = { id: this.id }
      const{ result } = await this.$api.column.info(params)
      this.ruleForm = result
      this.currentType = result.type
    } catch (e) {
      console.log(e)
    }
  }

  async confirm() {
    this.loading = true
    try {
      const params = { id: this.id, ...this.ruleForm }
      if (this.id) {
        await this.$api.column.update(params)
      } else {
        await this.$api.column.create(params)
      }
      this.$message.success({
        message: this.id ? '创建成功' : '保存成功',
        onClose: () => {
          this.$emit('success', true)
        },
      })
      this.close()
    } catch (e) {
      console.log(e)
    } finally {
      this.loading = false
    }
  }
}

</script>
