<template>
  <yzp-drawer v-model="drawVisible" :loading="loading" title="编辑评论" @confirm="confirm" @open="open" @close="close">
    <el-form ref="ruleForm" :model="ruleForm" status-icon label-width="100px" class="demo-ruleForm">

      <el-form-item v-if="ruleForm.art_title" label="所属文章">
        <span>{{ ruleForm.art_title }}</span>
      </el-form-item>

      <!-- <el-form-item label="头像">
        <span>{{ ruleForm.avatar }}</span>
      </el-form-item> -->

      <el-form-item label="昵称">
        <el-input v-model="ruleForm.nickname" placeholder="评论者的昵称" maxlength="10"></el-input>
      </el-form-item>

      <el-form-item label="邮箱">
        <el-input v-model="ruleForm.email" placeholder="评论者的邮箱" maxlength="20"></el-input>
      </el-form-item>

      <el-form-item label="站点">
        <el-input v-model="ruleForm.site" placeholder="评论者的站点" maxlength="20"></el-input>
      </el-form-item>

      <el-form-item label="时间">
        <span>{{ ruleForm.time | $formatTime }}</span>
      </el-form-item>

      <el-form-item label="位置">
        <span>{{ ruleForm.address || '-' }}</span>
      </el-form-item>

      <el-form-item label="终端">
        <span>{{ ruleForm.ua || '-' }}</span>
      </el-form-item>

      <el-form-item label="内容">
        <el-input
          v-model="ruleForm.content"
          type="textarea"
          auto-complete="off"
          placeholder="评论的内容"
          rows="3"
          maxlength="300">
        </el-input>
      </el-form-item>

      <el-form-item label="回复内容">
        <el-input
          v-model="ruleForm.recontent"
          type="textarea"
          auto-complete="off"
          placeholder="回复评论者"
          rows="3"
          maxlength="300">
        </el-input>
      </el-form-item>

      <el-form-item v-if="ruleForm.retime" label="回复时间">
        <span>{{ ruleForm.retime | $formatTime }}</span>
      </el-form-item>

      <el-form-item label="邮件通知TA">
        <el-switch
          v-model="ruleForm.is_notice"
          :active-value="1"
          :inactive-value="0"
          inactive-color="#999">
        </el-switch>
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
    try {
      const params = { id: this.id }
      const{ result } = await this.$api.blogroll.info(params)
      this.ruleForm = result
    } catch (e) {
      console.log(e)
    }
  }

  async confirm() {
    this.loading = true
    try {
      const params = { id: this.id, ...this.ruleForm }
      await this.$api.blogroll.update(params)
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
