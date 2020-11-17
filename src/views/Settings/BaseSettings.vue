<template>
  <el-form ref="ruleForm" :model="ruleForm" status-icon label-width="100px" class="demo-ruleForm">
    <el-form-item label="网站头像">
      <yzp-upload
        v-model="ruleForm.web_avatar"
        :thumb="false"
        :clip="true"
        :height="120"
        :width="120"
        :watermark="false"
        :size-change="false"
        filename="web_avatar.png"
        dir=""
        >
      </yzp-upload>
    </el-form-item>

    <el-form-item label="网站logo">
      <yzp-upload
        v-model="ruleForm.web_logo"
        :thumb="false"
        :clip="true"
        :height="50"
        :width="150"
        :watermark="false"
        :size-change="false"
        filename="web_logo.png"
        dir=""
        style="width: 150px;height:50px;"
        >
      </yzp-upload>
    </el-form-item>

    <el-form-item label="网站名称">
      <el-input v-model="ruleForm.web_name" placeholder="请输入网站名称" maxlength="10">
      </el-input>
    </el-form-item>

    <el-form-item label="网站作者">
      <el-input v-model="ruleForm.web_author" placeholder="请输入网站作者" maxlength="10">
      </el-input>
    </el-form-item>

    <el-form-item label="个性签名">
      <el-input v-model="ruleForm.web_sign" placeholder="请输入个性签名" maxlength="20">
      </el-input>
    </el-form-item>

    <el-form-item v-for="(k,index) in ruleForm.web_slogan" :key="index" label="系统消息">
      <div class="msg-item">
        <el-input v-model="k.value" maxlength="20" :style="index>0?'background:#F6FFC7':''" :placeholder="index>0?'':'添加消息'" style="flex: 1">
        </el-input>
        <el-button v-if="index>0" type="text" style="color: red;" @click="removeSlogan(index)">
          <i class="el-icon-delete"></i>
        </el-button>
      </div>
    </el-form-item>

    <el-form-item label="">
      <el-button type="primary" size="small" plain icon="el-icon-plus" @click="addSlogan">
        添加消息
      </el-button>
    </el-form-item>

    <el-form-item label="网站标题">
      <el-input v-model="ruleForm.web_title" placeholder="请输入请输入网站名称" maxlength="30">
      </el-input>
    </el-form-item>

    <el-form-item label="网站网址">
      <el-input v-model="ruleForm.web_url" placeholder="请输入网站网址" maxlength="50">
      </el-input>
    </el-form-item>

    <el-form-item label="备案号">
      <el-input v-model="ruleForm.web_beian" placeholder="请输入网站备案号" maxlength="20">
      </el-input>
    </el-form-item>

    <el-form-item label="网站邮箱">
      <el-input v-model="ruleForm.web_mail" placeholder="请输入网站邮箱" maxlength="20">
      </el-input>
    </el-form-item>

    <el-form-item label="ip拦截">
      <el-input v-model="ruleForm.web_blackip" rows="3" type="textarea" placeholder="ip拦截 '|'分割" maxlength="100">
      </el-input>
    </el-form-item>

    <el-form-item label="建站时间">
      <el-date-picker
        style="width: 100%"
        v-model="ruleForm.web_time"
        type="date"
        class="dateSelect"
        value-format="yyyy-MM-dd"
        placeholder="请选中建站时间">
      </el-date-picker>
    </el-form-item>

    <el-form-item label="网站版本">
      <el-input v-model="ruleForm.web_version" placeholder="请输入网站版本号" maxlength="10">
      </el-input>
    </el-form-item>

    <el-form-item label="网站关键词">
      <el-input v-model="ruleForm.web_keywords" rows="3" type="textarea" placeholder="请输入网站关键词，中文逗号分隔" maxlength="100">
      </el-input>
    </el-form-item>

    <el-form-item label="网站描述">
      <el-input v-model="ruleForm.web_description" rows="3" type="textarea" placeholder="请输入网站描述" maxlength="100">
      </el-input>
    </el-form-item>

    <el-form-item label="统计代码">
      <el-input v-model="ruleForm.web_tongji" rows="3" type="textarea" placeholder="请输入统计代码" maxlength="500">
      </el-input>
    </el-form-item>

    <el-form-item label="网站版权">
      <el-input v-model="ruleForm.web_copyright" rows="3" type="textarea" placeholder="请输入网站版权" maxlength="50">
      </el-input>
    </el-form-item>

    <el-form-item label="评论总开关">
      <el-checkbox v-model="ruleForm.comment_open" :true-label="1" :false-label="0">打开全部评论</el-checkbox>
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
    web_name: '',
    web_sign: '',
    web_slogan: [{ value: '' }],
    web_title: '',
    web_url: '',
    web_beian: '',
    web_mail: '',
    web_blackip: '',
    web_time: '',
    web_version: '',
    web_keywords: '',
    web_description: '',
    web_tongji: '',
    web_copyright: '',
    comment_open: 1,
    web_avatar: '',
    web_logo: '',
    web_author: '',
    loading: true,
  }

  actVal: number = 1
  inactVal: number =  0

  mounted() {
    this.getInfo()
  }

  addSlogan() {
    if (this.ruleForm.web_slogan.length >= 5) {
      this.$message.warning('最多添加5条消息哦');
      return false;
    }
    this.ruleForm.web_slogan.push({ value: ''});
  }

  removeSlogan(index: number) {
    this.ruleForm.web_slogan.splice(index, 1);
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
      await this.$api.settings.updateBase(this.ruleForm)
      this.$message.success('保存成功');
    } catch (e) {
      console.log(e)
    }
  }

  async getInfo() {
    try {
      const { result } = await this.$api.settings.getBase()
      this.ruleForm = result
      this.ruleForm.web_slogan = result.web_slogan ? JSON.parse(result.web_slogan) : [{ value: '' }]
    } catch (e) {
      console.log(e)
    }
  }

}

</script>

<style scoped>
.msg-item {
  max-width: 500px;
  display:flex;
}
</style>


