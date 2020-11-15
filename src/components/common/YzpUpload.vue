<template>
  <div class="upload-wrap">
    <el-upload
      v-if="clip"
      :http-request="chooseImages"
      :disabled="loading"
      :on-error="uploadError"
      :before-upload="beforeUpload"
      :on-change="fileChange"
      :show-file-list="false"
      :class="{icon: type === 'icon', button: type === 'button' }"
      action=''
      list-type="picture-card"
      accept="image/jpeg,image/png"
      class="upload-ref"
    >
      <img v-if="url" :src="'/api' + url" class="upload-view" alt='' />
      <div v-if="!url" class="upload-icon">
        <i
          v-if="type === 'icon'"
          :class="loading ? 'el-icon-loading' : 'el-icon-plus'"
          class="icon"
        ></i>
        <el-button v-else type="primary" :loading="loading" :disabled="loading">
          {{ loading ? "上传中" : "选择文件" }}
        </el-button>
      </div>
    </el-upload>
    <vue-cutter
      v-if="clip"
      class="vue-cutter"
      :showChooseBtn="false"
      :cutWidth="width"
      :cutHeight="height"
      WatermarkText="@椰子皮"
      WatermarkTextFont="14px Sans-serif"
      ref="cropper"
      @cutDown="cutDown"
    >
      <div slot="open"></div>
    </vue-cutter>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

import VueCutter from 'vue-img-cutter';

interface ButtonType {
  button: string
  icon: string
}

@Component({ name: 'YzpUpload', components: { VueCutter } })

export default class YzpUpload extends Vue {
  @Prop({ default: '' }) value!: string
  @Prop({ default: 'other' }) dir!: string
  @Prop({ default: '' }) width!: number
  @Prop({ default: '' }) height!: number
  @Prop({ default: 'icon' }) type!: ButtonType
  @Prop({ default: false }) thumb!: boolean
  @Prop({ default: '' }) filename!: string
  @Prop({ default: false }) watermark!: boolean
  @Prop({ default: false }) clip!: boolean

  url: string = '';
  dialogVisible: boolean = false;
  loading: boolean = false;
  newUrl: any = '';
  currentFiles: any = '';

  @Watch('value')
  WatchValue(newVal: any) {
    this.url = newVal;
  }

  mounted() {
    this.url = this.value;
  }

  cutDown(res: any) {
    this.doUpload(res.blob);
  }

  async chooseImages({ file }: any) {
    if (!this.clip) {
      this.doUpload(file);
    } else {
      try {
        const blob = await this.dataURItoBlob(file)
        const refs: any = this.$refs.cropper
        console.log(file, blob)
        refs.handleOpen({
          name: file.name,
          src: blob,
        });
      } catch (e) {
        console.log(e)
      }
    }
  }

  // file转blob
  dataURItoBlob(file: any) {
    return new Promise((resolve: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = ({ target }: any) => {
        const base64 = target.result
        const byteString = atob(base64.split(',')[1]);
        const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
        const buffs = new ArrayBuffer(byteString.length);
        const u8a = new Uint8Array(buffs);
        for (let i = 0; i < byteString.length; i++) {
          u8a[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([buffs], {type: mimeString});
        resolve(URL.createObjectURL(blob))
      }
    })
  }

  async doUpload(file: any) {
    this.loading = true;
    const ld = this.$loading({
      text: '图片上传中...',
      lock: true,
      spinner: 'el-icon-loading',
    });
    const formData = new FormData();
    const thumb: any = this.thumb
    const watermark: any = this.watermark
    formData.append('filename', this.filename || `${new Date().valueOf()}.jpg`);
    formData.append('file', file);
    formData.append('dir', this.dir);
    formData.append('thumb', thumb);
    formData.append('maxWidth', String(this.width));
    formData.append('watermark', watermark);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    try {
      const { result } = await this.$api.common.upload(formData, config);
      this.$emit('input', result.path || result.thumb_path);
      this.$message.success('上传成功~');
    } catch (e) {
      console.log(e);
    } finally {
      ld.close();
      this.loading = false;
      this.dialogVisible = false;
    }
  }

  fileChange(file: any) {
    this.newUrl = URL.createObjectURL(file.raw);
    this.currentFiles = file;
  }

  uploadError() {
    (this.$refs as any).upload.clearFiles();
  }

  beforeUpload(file: any) {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
      this.$message.error('图片只能是JPG或者png格式!');
    }
    if (!isLt2M) {
      this.$message.error('上图片大小不能超过 2MB!');
    }
    return isJPG && isLt2M;
  }
}
</script>

<style lang="scss" scoped>
/deep/ .vue-cutter .i-dialog-footer { overflow: hidden; }
.upload-ref {
  /deep/.el-upload {
    background-color: rgba(255,255,255,0.5)!important;
  }
  &.icon {
    .upload-view, .upload-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
    .upload-view {
      object-fit: cover;
    }
  }
}
</style>
