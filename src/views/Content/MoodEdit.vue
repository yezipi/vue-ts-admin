<template>
  <div class="section-box">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="正文内容" prop="content" class="editor">
        <yzp-editor ref="editor" v-model="ruleForm.content"></yzp-editor>
      </el-form-item>

      <el-form-item label="选择地址">
        <div style="display: flex;max-width: 500px">
          <el-input v-model="ruleForm.address" placeholder="选择地址" maxlength="100"></el-input>
          <el-button type="primary" style="margin-left: 10px;" @click="showMap">选择</el-button>
        </div>
      </el-form-item>

      <el-form-item label="作者">
        <el-input v-model="ruleForm.author_name" placeholder="填写作者" maxlength="10"></el-input>
      </el-form-item>

      <el-form-item label="点击量">
        <el-input v-model="ruleForm.hit" placeholder="修改点击量" maxlength="6"></el-input>
      </el-form-item>

      <el-form-item label="">
        <div style="display: flex;justify-content: flex-start;align-items: center">
          <el-checkbox v-model="ruleForm.status" :true-label="1" :false-label="0">显示</el-checkbox>
          <el-checkbox v-model="ruleForm.comment_open" :true-label="1" :false-label="0">开启评论</el-checkbox>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">
          <span v-if="!id">立即发布</span>
          <span v-else>立即更新</span>
        </el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
      
    </el-form>
    <!--#######地图选点组件#######-->
    <el-dialog title="选择地址" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <div class="amap-page-container">
        <el-amap-search-box
          class="search-box"
          :search-option="searchOption"
          :on-search-result="onSearchResult">
        </el-amap-search-box>
        <el-amap vid="amapDemo" :center="mapCenter" :zoom="12" class="amap-demo">
          <el-amap-marker v-for="(marker, idx) in markers" :position="marker" :key="idx"></el-amap-marker>
        </el-amap>
        <p style="margin-top: 20px">地址：{{ruleForm.address}}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmMap">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { State } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'

import YzpEditor from '@/components/common/YzpEditor.vue'

@Component({ name: 'MoodEdit', components: { YzpEditor } })
export default class extends Vue {
  @State('user') user: any

  ruleForm: any = {
    content: '',
    hit: 1,
    time: '',
    status: 1,
    author_name: '',
    author_id: '',
    edit_time: new Date(),
    comment_open: 1,
    address: '',
  }

  rules: object = {
    content: [ { required: true, message: '内容必须', trigger: 'blur' }],
  }
  markers: object[] = [
    [121.59996, 31.197646],
  ]
  searchOption: object = {
    city: '广州',
    citylimit: true,
  }
  mapCenter: number[] = [ 121.59996, 31.197646 ]
  position: any = { }
  dialogVisible: boolean = false
  loading: boolean = false

  get id() {
    const route: any = this.$route
    return route.query.id
  }

  mounted() {
    this.ruleForm.author_name = this.user.nickname
    this.ruleForm.author_id = this.user.id
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
    const editor: any = this.$refs.editor
    ruleForm.resetFields()
    editor.setContent('')
  }

  showMap() {
    this.dialogVisible = true;
  }

  confirmMap() {
    this.dialogVisible = false;
    this.ruleForm.address = this.position.name
  }

  addMarker() {
    const lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
    const lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
    this.markers.push([lng, lat]);
  }

  onSearchResult(pois: any) {
    console.log(pois)
    let latSum = 0;
    let lngSum = 0;
    if (pois.length > 0) {
      pois.forEach((poi: any) => {
        const { lng, lat } = poi;
        lngSum += lng;
        latSum += lat;
        this.markers.push([poi.lng, poi.lat]);
      });
      const center = {
        lng: lngSum / pois.length,
        lat: latSum / pois.length,
      };
      this.mapCenter = [center.lng, center.lat];
      this.position = pois[0]
    }
  }

  async save() {
    this.loading = true
    try {
      const params = { ...this.ruleForm }
      params.status = params.status ? 1 : 0
      if (this.id) {
        await this.$api.mood.update(params)
      } else {
        await this.$api.mood.create(params)
      }
      this.$message.success({
        message: this.id ? '保存成功' : '创建成功',
        onClose: () => {
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
      const { result } = await this.$api.mood.info(this.id)
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

<style scoped lang="scss">
.amap-demo {
  height: 300px;
}

.search-box {
  position: absolute;
  top: 25px;
  left: 20px;
}

.amap-page-container {
  position: relative;
  overflow: hidden;
}
</style>