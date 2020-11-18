<template>
  <div class="column-list">
    <el-table :data="list" style="width: 100%">
      <el-table-column width="80" label="子栏目" type="expand">
        <template slot-scope="scope" v-if="scope.row.sub_column.length">
          <el-table
            :data="scope.row.sub_column"
            size="mini"
            class="sub-table"
            style="width: 100%"
            type="index"
          >
            <el-table-column prop="name" label="标题"> </el-table-column>
            <el-table-column prop="is_new_window" label="新窗口">
            </el-table-column>
            <el-table-column prop="status" label="是否显示">
              <template slot-scope="sub">
                <yzp-update-btn
                :value="scope.row.status"
                :id="scope.row.id"
                fields="status"
                api="column.update"
                @change="init">
              </yzp-update-btn>
              </template>
            </el-table-column>
            <el-table-column prop="sort" label="排序"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="sub">
                <el-button type="text">
                  <router-link
                    :to="{ path: '/column/add_sub', query: { id: sub.row.id } }"
                  >
                    编辑
                  </router-link>
                </el-button>
                <el-button type="text" @click="delSub(scope.row)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="type" label="类型"> </el-table-column>
      <el-table-column prop="is_new_window" label="新窗口">
        <template slot-scope="scope">
          <span v-if="scope.row.is_new_window">
            新窗口
          </span>
          <span v-else>
            原窗口
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="col_show" label="状态">
        <template slot-scope="scope">
          <yzp-update-btn
            value="scope.row.status"
            :id="scope.row.id"
            fields="status"
            api="column.update"
            @change="init">
          </yzp-update-btn>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.type === 'article' || scope.row.type === 'case'"
            size="mini"
            icon="el-icon-plus"
            type="text"
          >
            <router-link
              :to="{
                path: '/column/add_sub',
                query: { column_id: scope.row.id, type: scope.row.type },
              }"
            >
              子栏目
            </router-link>
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="openEdit(scope.row.id)"
          >
            编辑
          </el-button>
          <yzp-remove-btn v-if="scope.row.col_type === 'single'" :id="scope.row.id" api="column.remove" @change="pageRefs.getList()"></yzp-remove-btn>
        </template>
      </el-table-column>
    </el-table>
    <column-edit v-model="editVisible" :id="currId" @success="init"></column-edit>
    <yzp-page :condition="filter" ref="page" api="column.getList" @load="load"></yzp-page>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ColumnEdit from '@/components/features/Column/ColumnEdit.vue'

@Component({ name: 'ColumnList', components: { ColumnEdit }})
export default class extends Vue {

  list: any = []
  filter: any = {}
  currId: string = ''
  editVisible: boolean = false

  get pageRefs(): any {
    return this.$refs.page
  }

  openEdit(id: string) {
    this.currId = id
    this.editVisible = true
  }

  load(data: object[]) {
    this.list = data
  }

  init() {
   this.pageRefs.init()
  }

}
</script>
