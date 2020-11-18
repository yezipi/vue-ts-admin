<template>
  <div class="Picture-manage">
    <el-button type="primary" @click="showDialog">新建图片</el-button>

    <div class="Picture-list">
      <div style="margin-bottom: 20px;">
        <el-select v-model="currentAlbumId" placeholder="全部" value="" @change="selectAlbum">
          <el-option
            v-for="(item,index) in albumList"
            :key="index" :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <span style="display: inline-block;margin-left: 20px;">共 {{ list.length }} 张</span>
      </div>
      <ul>
        <li v-for="(item, k) in list" :key="k">
          <div class="al-cover">
            <img :src="'/api'+item.thumb_path" alt=""/>
            <div class="al-todo">
              <i class="el-icon-edit" @click="editPicture(item)"></i>
              <i class="el-icon-delete" @click="delPicture(item)"></i>
            </div>
          </div>
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>

    <el-dialog
      :title="this.ruleForm.id ? '编辑图片' : '新建图片'"
      :append-to-body="true"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="30%">
      <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="name">
          <el-input v-model="ruleForm.name" placeholder="填写图片标题" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="选择相册" prop="album_id">
          <el-select v-model="ruleForm.album_id" placeholder="选择分类" value="">
            <el-option
              v-for="(item,index) in albumList"
              :key="index" :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片" prop="thumb_path">
          <yzp-upload
            v-model="ruleForm.thumb_path"
            :thumb="false"
            style="width: 150px;height: 100px"
            dir="picture"
            >
          </yzp-upload>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" rows="3" v-model="ruleForm.description" placeholder="填写图片描述" maxlength="100"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">{{ this.ruleForm.id ? '保存' : '创建' }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'AlbumList'})
export default class extends Vue {

  dialogVisible: boolean = false
  ruleForm: any = {
    loading: true,
    thumb_path: '',
    origin_path: '',
    name: '',
    description: '',
    id: '',
    album_id: '',
  }
  rules: object = {
    name: [{ required: true, message: '名称必填', trigger: 'blur' }],
    path: [{ required: true, message: '请上传图片', trigger: 'change' }],
    album_id: [{ required: true, message: '请选择相册', trigger: 'change' }],
  }
  list: any = []
  albumList: any = []
  currentAlbumId: string = ''

  mounted() {
    this.ruleForm.album_id = this.$route.query.album_id
    this.getAlbumList()
    this.getList()
  }

  selectAlbum(e: any) {
    this.ruleForm.album_id = e
    this.getList()
  }

  submit() {
    const ruleForm: any = this.$refs.ruleForm
    ruleForm.validate((valid: any) => {
      if (!valid) {
        return
      }
      if (this.ruleForm.id) {
        this.updatePicture()
      } else {
        this.doSave()
      }
    })
  }

  async getAlbumList() {
    try {
      const { result } = await this.$api.album.getList()
      this.albumList = result.rows
    } catch (e) {
      console.log(e)
    }
  }

  async getList() {
    try {
      const { result } = await this.$api.picture.getList({ album_id: this.ruleForm.album_id })
      this.list = result.rows
    } catch (e) {
      console.log(e)
    }
  }

  async geInfo(id: string) {
    try {
      const { result } = await this.$api.picture.info({ id })
      this.ruleForm = result
    } catch (e) {
      console.log(e)
    }
  }

  showDialog() {
    this.dialogVisible = true
    this.ruleForm.id = ''
    this.ruleForm.name = ''
    this.ruleForm.description = ''
    this.ruleForm.path = ''
  }

  async doSave() {
    try {
      this.ruleForm.origin_path = this.ruleForm.thumb_path.replace('thumb_', 'origin_')
      await this.$api.picture.create(this.ruleForm)
      this.$message.success('添加成功！')
      this.dialogVisible = false
      this.getList()
    } catch (e) {
      console.log(e)
    }
  }

  async editPicture(e: any) {
    this.dialogVisible = true
    this.geInfo(e.id)
  }

  async updatePicture() {
    await (this as any).$doUpdate(this.$api.picture.update, this.ruleForm);
    this.dialogVisible = false
    this.getList()
  }

  async delPicture(e: any) {
    await (this as any).$doDelete(this.$api.picture.del, {
      id: e.id,
      path: e.path,
      loading: true,
    });
    this.getList()
  }
}
</script>

<style scoped lang="scss">
  .Picture-list {
    margin-top: 20px;
    ul {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      li {
        width: 180px;
        text-align: center;
        margin-right: 10px;
        .al-cover {
          height: 100px;
          position: relative;
          border-radius: 3px;
          overflow: hidden;
          &:hover {
            .al-todo {
              display: flex;
            }
          }
          .al-todo {
            position: absolute;
            background: rgba(0,0,0,0.5);
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            display: none;
            justify-content: space-around;
            align-items: center;
            i {
              font-size: 26px;
              cursor: pointer;
              color: #ffffff;
              &:hover {
                opacity: 0.5;
              }
            }
          }
          img {
            display: block;
            object-fit: cover;
            width: 100%;
            height: 100%;
          }
        }
        span {
          display: block;
          font-size: 12px;
          color: #555555;
          margin-top: 10px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
  .Picture-img {
    width: 148px;
    height: 85px;
    position: relative;
    background: #eeeeee;
    border-radius: 3px;
    overflow: hidden;
    &:hover {
      i {
        display: flex;
      }
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    i {
      display: none;
      font-size: 24px;
      color: #ffffff;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(0,0,0, 0.5);
      cursor: pointer;
      text-align: center;
      align-items: center;
      justify-content: center;
    }
  }
</style>