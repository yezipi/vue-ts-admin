<template>
  <el-form ref="ruleForm" :model="ruleForm" status-icon label-width="100px" class="demo-ruleForm">
    <el-form-item label="网站风格">
      <el-select v-model="ruleForm.web_style" placeholder="网站风格">
        <el-option v-for="(item, index) in webStyle" :key="index" :label="item.name" :value="item.value"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item v-if="ruleForm.web_style === 1" label="背景选择">
      <ul class="bglist">
        <li v-for="(item, index) in webBg" :key="index" :class="{ active: ruleForm.current_bg === item }" @click="selectBg(item)">
          <img :src="'/api'+item" alt="" />
          <i v-if="ruleForm.current_bg !== item" class="icon el-icon-error" @click.stop="deleteBg(item, index)"></i>
        </li>
        <li v-if="webBg.length < 5">
          <yzp-upload
            class="list-upload-btn"
            :thumb="false"
            :clip="false"
            :width="1366"
            :filename="webBg.length + '.jpg'"
            dir="webbg"
            @input="uploadSuccess"
            >
          </yzp-upload>
        </li>
      </ul>
    </el-form-item>

    <el-form-item label="网站字体">
      <el-select v-model="ruleForm.web_font" placeholder="网站字体">
        <el-option v-for="(item, index) in webFont" :key="index" :label="item.name" :value="item.value"></el-option>
      </el-select>
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

  webStyle: object[] = [
    { name: '简约', value: 0 },
    { name: '小清新', value: 1 },
    { name: '春季', value: 2 },
    { name: '夏季', value: 3 },
    { name: '秋季', value: 4 },
    { name: '冬季', value: 5 },
  ]

  webFont: object[] = [
    { name: '微软雅黑', value: 'Microsoft YaHei' },
  ]

  ruleForm: any = {
    web_style: 0,
    web_font: 'Microsoft YaHei',
    web_bg: '[]',
    current_bg: '',
  }

  webBg: any[] = []

  mounted() {
    this.getInfo()
  }

  selectBg(item: any) {
    this.ruleForm.current_bg = item
  }

  uploadSuccess(file: any) {
    this.webBg.push(file)
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
      this.ruleForm.web_bg = this.webBg.join()
      await this.$api.settings.updateCustom(this.ruleForm)
      this.$message.success('保存成功');
    } catch (e) {
      console.log(e)
    }
  }

  async getInfo() {
    try {
      const { result } = await this.$api.settings.getCustom()
      this.ruleForm = result
      const bg = result.web_bg
      this.webBg = bg ? bg.split(',') : []
    } catch (e) {
      console.log(e)
    }
  }

  deleteBg(item: any, index: number) {
    this.$confirm('确定删除此图片？, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      try {
        const { data } = await this.$api.common.deleteImg({
          params: { loading: true, path: item },
        })
        this.webBg.splice(index, 1)
        this.$message.success(data.errMsg)
      } catch (e) {
        console.log(e)
      }
    })
  }

}

</script>

<style scoped lang="scss">

  .bglist {
    &:after {
      content: '';
      display: block;
      clear: both;
    }
    .list-upload-btn {
      width: 150px;
      height: 85px;
    }
    li {
      margin-bottom: 10px;
      width: 150px;
      margin-left: 10px;
      height: 85px;
      float: left;
      position: relative;
      background: #eeeeee;
      img {
        cursor: pointer;
        width: 100%;
        height: 100%;
        object-fit: cover;
        box-sizing: border-box;
        border-radius: 5px;
      }
      .icon {
        position: absolute;
        top: -8px;
        right: -8px;
        border-radius: 50%;
        background: #FFFFFF;
        z-index: 1;
        text-align: center;
        cursor: pointer;
        font-size: 24px;
        color: #ff0000;
      }

      &.active {
        img {
          border: 2px solid #ff6700;
        }
        &:after {
          content: '';
          display: block;
          position: absolute;
          width: 40px;
          height: 40px;
          bottom: 0;
          right: 0;
          background: url('~@/assets/img/success.png')no-repeat center;
          background-size: 100%;
        }
      }
    }
  }
</style>