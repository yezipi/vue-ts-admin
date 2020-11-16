<template>
  <div class="article-list">
    <el-form v-if="!filter.is_recommend" size="small" class="form-search" inline label-width="80px">

      <div class="fs-left">
        <el-form-item label="">
          <classification v-model="filter.sub_column_id" style="max-width: 500px;display: block"></classification>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="filter.keywords" placeholder="请输入内容" class="input-with-select" clearable>
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-form-item>
      </div>

      <div class="fs-right">
        <router-link :to="{path: '/ArticleEdit'}">
          <el-button type="primary" size="small" icon="el-icon-edit-outline">
            创建{{ $dict.ARTICLE.TYPE[type] }}
          </el-button>
        </router-link>
      </div>
    </el-form>

    <el-table
      :data="list"
      class="admin-table"
      style="width: 100%">
      <el-table-column v-if="filter.is_recommend === 1" prop="sort" label="序号" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.sort }}</span>
          <i
            slot="suffix"
            style="cursor: pointer"
            class="el-icon-edit el-input__icon"
            @click="doSort(scope.row)">
          </i>
        </template>
      </el-table-column>

      <el-table-column prop="title" width="300" label="标题"></el-table-column>

      <el-table-column label="分类" prop="sub_column.name">
        <template slot-scope="scope">{{ scope.row.sub_column && scope.row.sub_column.name || '-' }}</template>
      </el-table-column>

      <el-table-column prop="comment_count" label="评论数量"></el-table-column>

      <el-table-column prop="hit" label="访问量"></el-table-column>

      <el-table-column prop="zan" label="点赞量"></el-table-column>

      <el-table-column prop="time" label="发布时间">
        <template slot-scope="scope">
          <span>{{ scope.row.time | $formatTime }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="is_recommend" label="推荐">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_recommend"
            :active-value="1"
            :inactive-value="0"
            size="mini"
            inactive-color="#999"
            @change="update(scope.row, 'is_recommend')">
          </el-switch>
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
            api="article.update"
            @change="init">
          </yzp-update-btn>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini">
            <router-link :to="{path: '/ArticleEdit', query:{ id:scope.row.id }}">
              编辑
            </router-link>
          </el-button>
          <yzp-remove-btn :id="scope.row.id" api="article.remove" @change="pageRefs.getList()"></yzp-remove-btn>
        </template>
      </el-table-column>

    </el-table>
    <yzp-page :condition="filter" ref="page" api="article.getList" @load="load"></yzp-page>
  </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator'
import Classification from '@/components/features/Article/Classification.vue'

@Component({ components: { Classification } })
export default class extends Vue {
  @Prop({ default: 'article' }) type!: string

  total: number = 0
  filter: any = { }
  list: object[] = []
  category: object[] = []

  get pageRefs(): any {
    return this.$refs.page
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

  remove(id: string) {
    const me: any = this
    me.$doDelete('article.remove', id).then(() => {
      this.init()
    })
  }

  update(item: any, key: string) {
    const me: any = this
    const params: any = { id: item.id }
    params[key] = item[key]
    me.$doUpdate('article.update', params).then(() => {
      this.pageRefs.getList()
    })
  }
}
</script>


<style scoped lang="scss">

</style>