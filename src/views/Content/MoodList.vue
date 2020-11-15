<template>
  <div class="article-list">
    
    <el-form size="small" class="form-search" inline label-width="80px">
      <div class="fs-left"></div>
      <div class="fs-right">
        <router-link :to="{path: '/moodEdit'}">
          <el-button type="primary" size="small" icon="el-icon-edit-outline">
            创建微语
          </el-button>
        </router-link>
      </div>
    </el-form>

    <el-table
      :data="list"
      class="admin-table"
      style="width: 100%">
      <el-table-column prop="title" width="400" label="内容">
        <template slot-scope="scope">
          <div class="html-content">{{ formatContent(scope.row.content) }}</div>
        </template>
      </el-table-column>

      <el-table-column prop="comment_count" label="评论数量"></el-table-column>

      <el-table-column prop="time" label="发布时间">
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
            api="mood.update"
            @change="init">
          </yzp-update-btn>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini">
            <router-link :to="{path: '/MoodEdit', query:{ id: scope.row.id }}">
              编辑
            </router-link>
          </el-button>
          <yzp-remove-btn :id="scope.row.id" api="mood.remove" @change="pageRefs.getList()"></yzp-remove-btn>
        </template>
      </el-table-column>

    </el-table>
    <yzp-page :condition="filter" ref="page" api="mood.getList" @load="load"></yzp-page>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'MoodList' })
export default class extends Vue {

  filter: any = { }
  list: object[] = []

  get pageRefs(): any {
    return this.$refs.page
  }

  load(data: object[]) {
    this.list = data
  }

  init() {
   this.pageRefs.init()
  }

  formatContent(content: string) {
    return content.replace(/<[^<>]+>/g, '').substring(0, 15) + '...'
  }
}
</script>


<style scoped lang="scss">

</style>