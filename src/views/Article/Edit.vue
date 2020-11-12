<template>
  <div class="donggu-article">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="yzp-ruleForm">
      <el-form-item label="标题" prop="title">
        <el-input type="text" v-model="ruleForm.title" placeholder="请填写标题"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="type">
        <classification v-model="ruleForm.sub_column_id"></classification>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <yzp-upload
          v-model="ruleForm.cover_small"
          :thumb="true"
          :clip="true"
          dir="article_cover"
          :height="250"
          :width="500"
        >
        </yzp-upload>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <yzp-editor ref="editor" @input="ruleForm.content = $event"></yzp-editor>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input type="text" v-model="ruleForm.author" placeholder="填写作者"></el-input>
      </el-form-item>
      <el-form-item label="转载自" prop="reprint">
        <el-input type="text" v-model="ruleForm.reprint" placeholder="如果是转载，填写转载出处"></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-checkbox v-model="ruleForm.recommend">推荐</el-checkbox>
        <el-checkbox v-model="ruleForm.status">显示</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">{{ this.id ? '立即更新': '立即创建'  }}</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import YzpUpload from '@/components/common/YzpUpload.vue'
import YzpEditor from '@/components/common/YzpEditor.vue'
import Classification from '@/components/features/Article/Classification.vue'

@Component({
  components: {
    YzpEditor,
    YzpUpload,
    Classification,
  },
})
export default class extends Vue {

  ruleForm: any = {
    title: '',
    type: 'spots',
    cover: '',
    recommend: false,
    content: '',
    status: true,
    reprint: '',
    author: '美丽东固',
    hit: 0,
  }

  rules: object = {
    title: [ { required: true, message: '标题必须', trigger: 'blur' }],
    content: [ { required: true, message: '内容必须', trigger: 'blur' }],
  }

  typeOptions: object[] = [
    { label: '景点', value: 'spots' },
    { label: '周边', value: 'around' },
    { label: '资讯', value: 'news' },
    { label: '攻略', value: 'plan' },
    { label: '关于', value: 'about' },
    { label: '简介', value: 'desc' },
  ]

  get id() {
    const route: any = this.$route
    return route.query.id
  }

  mounted() {
    this.getInfo()
  }

  submitForm() {
    const ruleForm: any = this.$refs.ruleForm
    console.log(this.$refs.editor)
    ruleForm.validate((valid: any) => {
      if (valid) {
        this.save()
      }
    })
  }

  resetForm() {
    const ruleForm: any = this.$refs.ruleForm
    ruleForm.resetFields()
    const editor: any = this.$refs.editor
    editor.setContent('')
  }

  async save() {
    try {
      const params = {
        ...this.ruleForm,
      }
      params.status = params.status ? 1 : 0
      if (this.id) {
        await this.$api.donggu.article.update(params)
      } else {
        await this.$api.donggu.article.add(params)
      }
      this.$message.success(this.id ? '保存成功' : '创建成功')
      this.$router.replace('/donggu-article-list')
    } catch (error) {
      console.log(error)
    }
  }

  async getInfo() {
    if (!this.id) {
      return
    }
    try {
      const { result } = await this.$api.donggu.article.info(this.id)
      const info = {
        ...result,
      }
      info.status = info.status === 1
      this.ruleForm = info
      const editor: any = this.$refs.editor
      editor.setContent(info.content)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

