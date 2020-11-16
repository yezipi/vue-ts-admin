<template>
  <div class="article-list">
    <el-form size="small" class="form-search" inline label-width="80px">

      <div class="fs-left">
        <el-form-item label="">
          <el-input v-model="filter.keywords" placeholder="请输入内容" class="input-with-select" clearable>
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-form-item>
      </div>

      <div class="fs-right">
        <el-button type="primary" size="small" icon="el-icon-edit-outline" @click="openEdit">
          创建友链
        </el-button>
      </div>

    </el-form>

    <el-table
      :data="list"
      size="small"
      class="admin-table"
      style="width: 100%">

      <el-table-column prop="content" width="300" label="内容"></el-table-column>

      <el-table-column label="昵称" prop="nickname"></el-table-column>

      <el-table-column label="是否回复" prop="article.title">
        <template slot-scope="scope">
          <span v-if="scope.row.recontent" style="color: #18ACFF">已回复</span>
          <span v-else style="color: #ff6666">未回复</span>
        </template>
      </el-table-column>

      <el-table-column prop="ip" label="ip" width="120">
        <template slot-scope="scope">{{ scope.row.ip || '-' }}</template>
      </el-table-column>

      <el-table-column prop="address" label="位置" width="140">
        <template slot-scope="scope">{{ scope.row.address || '-' }}</template>
      </el-table-column>

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
          <yzp-update-btn
            :value="scope.row.status"
            :id="scope.row.id"
            fields="status"
            api="blogroll.update"
            @change="init">
          </yzp-update-btn>
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
          <yzp-remove-btn :id="scope.row.id" api="blogroll.remove" @change="pageRefs.getList()"></yzp-remove-btn>
        </template>
      </el-table-column>

    </el-table>

    <blogroll-edit v-model="editVisible" :id="currId" @success="init"></blogroll-edit>

    <yzp-page :condition="filter" ref="page" api="blogroll.getList" @load="load"></yzp-page>

  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import { dictToArray } from '@/utils/index'

import BlogrollEdit from '@/components/features/Blogroll/BlogrollEdit.vue'

@Component({ name: 'BlogrollList', components: { BlogrollEdit } })
export default class extends Vue {

  total: number = 0
  filter: any = { }
  list: object[] = []
  editVisible: boolean = false
  currId: string = ''

  get pageRefs(): any {
    return this.$refs.page
  }

  openEdit(id: string) {
    this.currId = id
    this.editVisible = true
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

}
</script>


<style scoped lang="scss">

</style>