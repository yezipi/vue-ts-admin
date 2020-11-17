<template>
  <el-form ref="ruleForm" :model="ruleForm" status-icon label-width="100px" class="demo-ruleForm">
    <h4 style="padding: 15px;font-weight: bold;color: #ff6666">发件人</h4>
    <el-form-item label="发件人名称">
      <el-input v-model="ruleForm.send_nickname" required placeholder="发件人名称" maxlength="30">
      </el-input>
    </el-form-item>

    <el-form-item label="发件服务器">
      <el-input v-model="ruleForm.hosts" placeholder="发件邮件服务器,例如：smtp.exmail.qq.com" maxlength="30">
      </el-input>
    </el-form-item>

    <el-form-item label="端口号">
      <el-input v-model="ruleForm.port" placeholder="服务器端口号" maxlength="30">
      </el-input>
    </el-form-item>

    <el-form-item label="发件人邮箱">
      <el-input v-model="ruleForm.send_mail" placeholder="发件人邮箱" maxlength="30">
      </el-input>
    </el-form-item>

    <el-form-item label="邮箱密码">
      <el-input v-model="ruleForm.send_pwd" placeholder="发件人邮箱密码" maxlength="15">
      </el-input>
    </el-form-item>

    <h4 style="padding: 15px;font-weight: bold;color: #ff6666">收件人</h4>
    <el-form-item label="收件人邮箱">
      <el-input v-model="ruleForm.receive_mail" placeholder="收件人邮箱" maxlength="30">
      </el-input>
    </el-form-item>

    <h4 style="padding: 15px;font-weight: bold;color: #ff6666">通知设置</h4>
    <el-form-item label="发件标题">
      <el-input v-model="ruleForm.send_title" placeholder="发件标题" maxlength="50">
      </el-input>
    </el-form-item>

    <el-form-item label="收件标题">
      <el-input v-model="ruleForm.receive_title" placeholder="收件标题" maxlength="50">
      </el-input>
    </el-form-item>

    <el-form-item label="邮件通知我" prop="web_comment_switch">
      <el-switch
        v-model="ruleForm.receive_notice"
        :active-value="1"
        :inactive-value="0">
      </el-switch>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submit">保存更改 </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'AdSettings' })
export default class extends Vue {

  ruleForm: any = {
    port: '465',
    receive_notice: 0,
    send_nickname: '',
    send_mail: '',
    send_pwd: '',
    receive_mail: '',
    send_title: '',
    receive_title: '',
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
      await this.$api.settings.updateMail(this.ruleForm)
      this.$message.success('保存成功');
    } catch (e) {
      console.log(e)
    }
  }

  async getInfo() {
    try {
      const { result } = await this.$api.settings.getMail()
      this.ruleForm = result
    } catch (e) {
      console.log(e)
    }
  }

}

</script>

