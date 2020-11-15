<template>
  <div class="article-list">
    <el-form size="small" class="form-search" inline label-width="80px">

      <div class="fs-left">
        <el-form-item v-if="type === 'article'">
          <el-select v-model="filter.type" placeholder="请选择类型" clearable @change="pageRefs.getList()">
            <el-option
              v-for="(item, index) in commentType"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="filter.keywords" placeholder="请输入内容" class="input-with-select" clearable>
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-form-item>
      </div>

    </el-form>

    <el-table
      :data="list"
      size="small"
      class="admin-table"
      style="width: 100%">

      <el-table-column prop="content" width="300" label="内容"></el-table-column>

      <el-table-column label="昵称" prop="nickname"></el-table-column>

      <el-table-column v-if="type === 'article'" label="类型" prop="sub_column">
        <template slot-scope="scope">{{ $dict.COMMENT.TYPE[ scope.row.type ] }}</template>
      </el-table-column>
      
      <el-table-column v-if="type === 'article'" label="所属内容" prop="article.title" width="200">
        <template slot-scope="scope">《{{ scope.row.article ? scope.row.article.title : '-' }}》</template>
      </el-table-column>

      <el-table-column label="是否回复" prop="article.title">
        <template slot-scope="scope">
          <span v-if="scope.row.recontent" style="color: #18ACFF">已回复</span>
          <span v-else style="color: #ff6666">未回复</span>
        </template>
      </el-table-column>

      <el-table-column prop="ip" label="ip" width="120"></el-table-column>

      <el-table-column prop="address" label="位置" width="140"></el-table-column>

      <el-table-column prop="site" label="站点" width="150">
        <template slot-scope="scope">{{ scope.row.site || '-' }}</template>
      </el-table-column>

      <el-table-column prop="ua" label="设备"></el-table-column>

      <el-table-column prop="time" label="时间" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.time | $formatTime }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="status"
        label="是否显示">
        <template slot-scope="scope">
         <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            size="mini"
            inactive-color="#999"
            @change="update(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="openEdit(scope.row.id)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="remove(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <interact-edit v-model="editVisible" :id="currId" :type="type" @success="init"></interact-edit>

    <yzp-page :condition="filter" ref="page" :api="apiDict[type].list" @load="load"></yzp-page>

  </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator'
import { dictToArray } from '@/utils/index'

import InteractEdit from '@/components/features/Interact/InteractEdit.vue'

@Component({ name: 'CommentTable', components: { InteractEdit } })
export default class extends Vue {
  @Prop({ default: 'article' }) type!: string

  total: number = 0
  filter: any = { }
  list: object[] = []
  category: object[] = []
  apiDict: any = {
    article: {
      update: 'comment.update',
      remove: 'comment.remove',
      list: 'comment.getList',
    },
    feedback: {
      update: 'comment.update',
      remove: 'comment.remove',
      list: 'comment.getList',
    },
  }

  editVisible: boolean = false
  currId: string = ''

  get pageRefs(): any {
    return this.$refs.page
  }

  get commentType() {
    return dictToArray(this.$dict.COMMENT.TYPE)
  }

  openEdit(id: string) {
    if (!id) {
      return this.$message('id不存在')
    }
    this.currId = id
    this.editVisible = true
  }

  created() {
    this.filter.type = this.type
  }

  search() {
    this.init()
  }

  load(data: object[]) {
    this.list = data
  }

  init() {
   this.pageRefs.init()
  }

  remove({ id, type }: any) {
    const me: any = this
    me.$doDelete(this.apiDict[type].remove, { id, type }).then(() => {
      me.init()
    })
  }

  update({ id, type, status }: any) {
    const me: any = this
    me.$doUpdate(this.apiDict[type].update, { id, type, status }).then(() => {
      me.pageRefs.getList()
    })
  }
}
</script>


<style scoped lang="scss">

</style>