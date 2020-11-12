<template>
  <div class="article-list">
    <el-form v-if="!filter.is_recommend" size="small" class="form-search" inline label-width="80px">
      <div class="fs-left">
        <el-form-item label="">
          <el-select v-model="filter.sub_column_id" placeholder="请选择分类">
            <el-option v-for="(item,index) in category" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="filter.keywords" placeholder="请输入内容" class="input-with-select" clearable>
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-form-item>
      </div>
      <div class="fs-right">
        <el-button type="primary" size="small" icon="el-icon-edit-outline">创建文章</el-button>
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
      <el-table-column prop="title" width="400" label="标题"></el-table-column>
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
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            size="mini"
            inactive-color="#999"
            @change="update(scope.row, 'status')">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini">
            <router-link :to="{path: '/article/add', query:{ id:scope.row.id }}">
              编辑
            </router-link>
          </el-button>
          <el-button
            style="color: #ff0000"
            size="mini"
            type="text"
            @click="remove(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <yzp-page :condition="filter" ref="page" api="article.getList" @load="load"></yzp-page>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
  total: number = 0
  filter: any = { type: 'article', keywords: '' }
  list: object[] = []
  category: object[] = []

  get pageRefs(): any {
    return this.$refs.page
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
.item-cover {
  width: 80px;
  height: 60px;
  background-color: #eee;
  background-size: cover !important;
  background-position: center;
  margin-right: 5%;
  border-radius: 5px;
}
.item-cover.nopic {
  background-size: 110% !important;
  background-color: rgba(255, 255, 255, 0.5);
  background-image: url("~@/assets/img/nopic.png");
}
</style>