<template>
  <el-form ref="ruleForm" :model="ruleForm" status-icon label-width="100px" class="demo-ruleForm">
    <el-form-item label="首页banner下方">
      <el-input rows="3" type="textarea" v-model="ruleForm.ad_index" placeholder="广告代码,js/html"></el-input>
    </el-form-item>

    <el-form-item label="侧边栏">
      <el-input rows="3" type="textarea" v-model="ruleForm.ad_aside" placeholder="广告代码,js/html"></el-input>
    </el-form-item>

    <el-form-item label="右下角悬浮">
      <el-input rows="3" type="textarea" v-model="ruleForm.ad_float" placeholder="广告代码,js/html"></el-input>
    </el-form-item>

    <el-form-item label="是否显示">
      <el-switch
        v-model="ruleForm.ad_status"
        :active-value="1"
        :inactive-value="0">
      </el-switch>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submit">保存更改</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'AdSettings' })
export default class extends Vue {

  ruleForm: any = {
    ad_index: '',
    ad_aside: '',
    ad_float: '',
    ad_status: 0,
  }

  mounted() {
    this.getInfo()
  }

  submit() {
    const formResf: any = this.$refs.ruleForm
    formResf.validate((valid: any) => {
      if (valid) {
        this.update()
      }
    });
  }

  async update() {
    try {
      await this.$api.settings.updateAd(this.ruleForm)
      this.$message.success('保存成功');
    } catch (e) {
      console.log(e)
    }
  }

  async getInfo() {
    try {
      const { result } = await this.$api.settings.getAd()
      this.ruleForm = result
    } catch (e) {
      console.log(e)
    }
  }

}

</script>

