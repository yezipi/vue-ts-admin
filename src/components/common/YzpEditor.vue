<template>
  <div>
    <editor id="tinymce" ref="tinymceEditor" v-model="value" :init="init" @input="onEditorInput"></editor>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import tinymce from 'tinymce'

import 'tinymce/themes/silver/theme.min.js'
import 'tinymce/icons/default/icons'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/media'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/paste'

import Editor from '@tinymce/tinymce-vue'

@Component({ name: 'TinymceEditor', components: { Editor } })
export default class extends Vue {

  @Prop({ default: '' }) content!: string

  // 富文本框值
  private value: string = ''

  // 富文本框init配置
  private get init() {
    return {
      selector: '#tinymce',
      language_url: '/tinymce/langs/zh_CN.js',
      language: 'zh_CN',
      skin_url: '/tinymce/skins/ui/oxide',
      height: 350,
      branding: false,
      plugins:
        'link lists image codesample code table wordcount  media table fullscreen preview pagebreak insertdatetime hr paste', // 插件
      toolbar:
        'codesample image bold italic underline alignleft aligncenter alignright alignjustify | forecolor backcolor | fontselect | fontsizeselect | formatselect |  bullist numlist | outdent indent blockquote | removeformat| undo redo | link unlink media insertdatetime table  hr pagebreak | fullscreen preview | strikethrough', // 工具条
      font_formats: 'Arial=arial,helvetica,sans-serif; 宋体=SimSun;  微软雅黑=Microsoft Yahei; Impact=impact,chicago;', // 字体
      fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px 64px 72px', // 文字大小
      paste_data_images: true,
      codesample_languages: [
        {text: 'HTML/XML', value: 'markup'},
        {text: 'JavaScript', value: 'javascript'},
        {text: 'CSS', value: 'css'},
        {text: 'Java', value: 'java'},
        {text: 'C++', value: 'cpp'},
      ],
      // 图片上传回调
      images_upload_handler: (blobInfo: any, success: any) => {
        const file = blobInfo.blob()
        this.uploadToServe(file).then((url: any) => {
          success('/api' + url)
        })
      },
    }
  }

  mounted() {
    tinymce.init({})
    this.value = this.content
  }

  onEditorInput(e: any) {
    this.$emit('input', this.value)
  }

  setContent(str: any) {
    this.value = str
  }

  async uploadToServe(file: any) {
    const ld = this.$loading({
      text: '图片上传中...',
      lock: true,
      spinner: 'el-icon-loading',
    });
    const formData = new FormData();
    formData.append('filename', `${new Date().valueOf()}.jpg`);
    formData.append('file', file);
    formData.append('dir', 'article_content');
    formData.append('maxWidth', '750');
    formData.append('watermark', 'true');
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    try {
      const { result } = await this.$api.common.upload(formData, config);
      this.$message.success('上传成功~');
      return result.path
    } catch (e) {
      console.log(e);
    } finally {
      ld.close();
    }
  }

}
</script>

<style lang="scss" scoped></style>