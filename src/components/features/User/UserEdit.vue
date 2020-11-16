<template>
  <yzp-drawer v-model="drawVisible" :loading="loading" title="编辑用户" @confirm="confirm" @open="open" @close="close">
    <el-form ref="ruleForm" :model="ruleForm" status-icon label-width="100px" class="demo-ruleForm">

      <!-- <el-form-item label="头像">
        <span>{{ ruleForm.avatar }}</span>
      </el-form-item> -->

      <el-form-item label="账号">
        <el-input v-model="ruleForm.name" placeholder="用户账号" disabled maxlength="10"></el-input>
      </el-form-item>

      <el-form-item label="昵称">
        <el-input v-model="ruleForm.nickname" placeholder="用户昵称" maxlength="10"></el-input>
      </el-form-item>

      <el-form-item label="密码">
        <el-input v-model="ruleForm.password" placeholder="用户密码" maxlength="20"></el-input>
      </el-form-item>

      <el-form-item label="是否显示">
        <el-switch
          v-model="ruleForm.status"
          :active-value="1"
          :inactive-value="0"
          inactive-color="#999">
        </el-switch>
      </el-form-item>
    </el-form>
  </yzp-drawer>
</template>

<script lang="ts">

import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component({ name: 'InteractEdit' })
export default class extends Vue {
  @Prop({ default: false }) value!: boolean
  @Prop({ default: '' }) id!: string

  loading: boolean = false

  drawVisible: boolean = false

  ruleForm: any = { is_notice: false }

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

  async getInfo() {
    if (!this.id) {
      return
    }
    try {
      const params = { id: this.id }
      const{ result } = await this.$api.user.info(params)
      this.ruleForm = result
    } catch (e) {
      console.log(e)
    }
  }

  async confirm() {
    this.loading = true
    try {
      const params = { id: this.id, ...this.ruleForm }
      if (this.id) {
        await this.$api.user.update(params)
      } else {
        await this.$api.user.create(params)
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
