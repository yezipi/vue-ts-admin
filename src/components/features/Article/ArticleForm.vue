<template>
  <div class="donggu-article">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="yzp-ruleForm">
      <el-form-item label="标题" prop="title">
        <el-input type="text" v-model="ruleForm.title" placeholder="请填写标题" maxlength="50"></el-input>
      </el-form-item>

      <el-form-item label="分类" prop="sub_column_id">
        <classification v-model="ruleForm.sub_column_id" :type="type" style="max-width: 500px;display: block"></classification>
      </el-form-item>

      <el-form-item label="封面" prop="cover">
        <yzp-upload
          v-model="ruleForm.cover_small"
          :thumb="true"
          :clip="true"
          :height="250"
          :width="500"
          dir="article_cover"
        >
        </yzp-upload>
      </el-form-item>

      <el-form-item label="关键字">
        <el-input v-model="ruleForm.keywords" type="textarea" auto-complete="off" placeholder="填写关键字" maxlength="100">
        </el-input>
      </el-form-item>

      <el-form-item label="描述">
        <el-input
          v-model="ruleForm.description"
          rows="3"
          type="textarea"
          auto-complete="off"
          placeholder="填写描述/摘要"
          maxlength="255">
        </el-input>
      </el-form-item>

      <el-form-item label="内容" prop="content">
        <yzp-editor ref="editor" v-model="ruleForm.content"></yzp-editor>
      </el-form-item>

      <el-form-item v-if="isArticle" label="运行代码">
        <el-switch
          v-model="ruleForm.is_run_code"
          :active-value="1"
          :inactive-value="0"
          inactive-color="#999">
        </el-switch>
      </el-form-item>

      <el-form-item v-if="ruleForm.is_run_code === 1 && isArticle" label="代码内容">
        <el-input
          v-model="ruleForm.code_content"
          type="textarea"
          rows="3"
          auto-complete="off"
          placeholder="填写需要运行的代码内容">
        </el-input>
      </el-form-item>

      <el-form-item label="选择标签">
        <el-select v-model="ruleForm.tags" :multiple-limit="5" multiple placeholder="请选择" style="width: 100%;max-width: 500px" value="">
          <el-option
            v-for="item in tagList"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="!isArticle" label="资源链接">
        <el-input v-model="ruleForm.download_link" placeholder="填写资源的下载链接" maxlength="200">
        </el-input>
      </el-form-item>

      <el-form-item v-if="!isArticle" label="资源密码">
        <el-input v-model="ruleForm.link_code" placeholder="例如网盘密码" maxlength="10">
        </el-input>
      </el-form-item>

      <el-form-item label="作者" prop="author">
        <el-input type="text" v-model="ruleForm.author_name" placeholder="填写作者"></el-input>
      </el-form-item>

      <el-form-item label="转载自" prop="reprint">
        <el-input type="text" v-model="ruleForm.reprint" placeholder="如果是转载，填写转载出处"></el-input>
      </el-form-item>

      <el-form-item label="点击量">
        <el-input v-model="ruleForm.hit" placeholder="修改点击量" maxlength="6">
        </el-input>
      </el-form-item>

      <el-form-item label="">
        <el-checkbox v-model="ruleForm.status" :true-label="1" :false-label="0">显示</el-checkbox>
        <el-checkbox v-model="ruleForm.comment_open" :true-label="1" :false-label="0">开启评论</el-checkbox>
        <el-checkbox v-model="ruleForm.is_recommend" :true-label="1" :false-label="0">设为推荐</el-checkbox>
        <el-checkbox v-model="ruleForm.is_top" :true-label="1" :false-label="0">置顶</el-checkbox>
      </el-form-item>

      <el-form-item>
        <el-button :loading="loading" type="primary" @click="submitForm">{{ this.id ? '立即更新': '立即创建'  }}</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { State } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'

import YzpEditor from '@/components/common/YzpEditor.vue'
import Classification from '@/components/features/Article/Classification.vue'

@Component({
  components: {
    YzpEditor,
    Classification,
  },
})
export default class extends Vue {
  @Prop({ default: 'article' }) type!: string

  @State('user') user: any

  ruleForm: any = {
    title: '',
    sub_column_id: '',
    cover_big: '',
    cover_small: '',
    keywords: '',
    description: '',
    content: '',
    author_name: '',
    author_id: '',
    reprint: '',
    hit: 1,
    time: new Date(),
    type: 'article',
    status: 1,
    is_top: 0,
    is_run_code: 0,
    is_recommend: 0,
    download_link: '',
    link_code: '',
    edit_time: new Date(),
    code_content: '',
    comment_open: 1,
    tags: [],
  }

  rules: object = {
    title: [ { required: true, message: '标题必须', trigger: 'blur' }],
    content: [ { required: true, message: '内容必须', trigger: 'blur' }],
    sub_column_id: [ { required: true, message: '请选择分类', trigger: 'blur' }],
  }

  tagList: object[] = []
  timer: any = null
  loading: boolean = false

  get id() {
    const route: any = this.$route
    return route.query.id
  }

  get isArticle() {
    return this.type === 'article'
  }

  created() {
    clearInterval(this.timer)
  }

  mounted() {
    this.ruleForm.author_name = this.user.nickname
    this.ruleForm.author_id = this.user.id
    this.getTags()
    this.getInfo()
    this.saveDraft()
  }

  destroyed() {
    clearInterval(this.timer)
  }

  submitForm() {
    const ruleForm: any = this.$refs.ruleForm
    ruleForm.validate((valid: any) => {
      if (valid) {
        this.save()
      }
    })
  }

  resetForm() {
    const ruleForm: any = this.$refs.ruleForm
    const editor: any = this.$refs.editor
    ruleForm.resetFields()
    editor.setContent('')
  }

  async save() {
    this.loading = true
    try {
      const params = { ...this.ruleForm }
      params.status = params.status ? 1 : 0
      params.tags = JSON.stringify(params.tags)
      params.cover_big = params.cover_small.replace('thumb_', 'origin_')
      if (this.id) {
        await this.$api.article.update(params)
      } else {
        await this.$api.article.create(params)
      }
      this.$message.success({
        message: this.id ? '保存成功' : '创建成功',
        onClose: () => {
          this.removeDraft()
          this.$router.go(-1)
        },
      })
    } catch (error) {
      console.log(error)
    } finally {
      this.loading = false
    }
  }

  async getInfo() {
    if (!this.id) {
      return
    }
    try {
      const { result } = await this.$api.article.info(this.id)
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

  async getTags() {
    try {
      const route: any = this.$route
      const { result } = await this.$api.article.getTags(route.query.type)
      this.tagList = result.rows
    } catch (e) {
      console.log(e)
    }
  }

  // 每30秒保存一次
  saveDraft() {
    // 进来就获取临时数据
    const local: any = localStorage
    if (local.getItem(this.type)) {
      this.ruleForm = JSON.parse(local.getItem(this.type));
    }
    this.timer = setInterval(() => {
      const tempData = this.ruleForm;
      localStorage.setItem(this.type, JSON.stringify(tempData));
      console.log('保存了', tempData);
    }, 30000);
  }

  removeDraft() {
    localStorage.removeItem(this.type);
    clearInterval(this.timer);
  }

  getRandomImg() {
    const num: any = Math.random() * 50 + 1
    return parseInt(num, 10)
  }
}
</script>

