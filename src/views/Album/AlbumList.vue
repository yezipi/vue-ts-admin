<template>
  <div class="album-manage">
    <el-button type="primary" @click="showDialog">新建相册</el-button>

    <div class="album-list">
      <ul>
        <li v-for="(item, k) in list" :key="k" class="al-item">
          <div class="al-cover">
            <img :src="'/api'+item.path" alt=""/>
            <div class="al-todo">
              <i class="el-icon-view" @click="$router.push(`/PictureList?album_id=${item.id}`)"></i>
              <i class="el-icon-edit" @click="editAlbum(item)"></i>
              <i class="el-icon-delete" @click="delAlbum(item)"></i>
            </div>
          </div>
          <div class="al-text">
            <span style="color: #999999"> {{ item.picture_count }} 张 </span>
            <span>{{ item.name }}</span>
          </div>
        </li>
      </ul>
    </div>

    <el-dialog
      :title="this.ruleForm.id ? '编辑相册' : '新建相册'"
      :append-to-body="true"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="30%">
      <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="name">
          <el-input v-model="ruleForm.name" placeholder="填写相册标题" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="path">
          <yzp-upload
            v-model="ruleForm.path"
            :thumb="false"
            style="width: 150px;height: 100px"
            dir="album"
            >
          </yzp-upload>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" rows="3" v-model="ruleForm.description" placeholder="填写相册描述" maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-checkbox v-model="ruleForm.comment_open" :true-label="1" :false-label="0">开启评论</el-checkbox>
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
    path: '',
    name: '',
    description: '',
    id: '',
    comment_open: 1,
  }
  rules: object = {
    name: [{ required: true, message: '名称必填', trigger: 'blur' }],
    path: [{ required: true, message: '请上传图片', trigger: 'change' }],
  }
  list: any = []

  mounted() {
    this.getList()
  }

  submit() {
    const ruleForm: any = this.$refs.ruleForm
    ruleForm.validate((valid: any) => {
      if (!valid) {
        return
      }
      if (this.ruleForm.id) {
        this.updateAlbum()
      } else {
        this.doSave()
      }
    })
  }

  async getList() {
    try {
      const { result } = await this.$api.album.getList()
      this.list = result.rows
    } catch (e) {
      console.log(e)
    }
  }

  async geInfo(id: string) {
    try {
      const { result } = await this.$api.album.info({ id })
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
      await this.$api.album.create(this.ruleForm)
      this.$message.success('添加成功！')
      this.dialogVisible = false
      this.getList()
    } catch (e) {
      console.log(e)
    }
  }

  async editAlbum(e: any) {
    this.dialogVisible = true
    this.geInfo(e.id)
  }

  async updateAlbum() {
    await (this as any).$doUpdate(this.$api.album.update, this.ruleForm);
    this.dialogVisible = false
    this.getList()
  }

  async delAlbum(e: any) {
    await (this as any).$doDelete(this.$api.album.del, {
      id: e.id,
      path: e.path,
      loading: true,
    });
    this.getList()
  }
}
</script>

<style scoped lang="scss">
  .album-list {
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
        .al-text {
          line-height: 12px;
          span {
            display: block;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
    }
  }
.album-img {
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