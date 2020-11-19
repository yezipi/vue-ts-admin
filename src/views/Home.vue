<template>
  <div class="home-page">
    <div class="home-card">
      <el-card class="top-card" shadow="hover">
        <span>文章</span>
        <h2>{{ homeCount.articleCount }}</h2>
      </el-card>
      <el-card class="top-card" shadow="hover">
        <span>案例</span>
        <h2>{{ homeCount.caseCount }}</h2>
      </el-card>
      <el-card class="top-card" shadow="hover">
        <span>微语</span>
        <h2>{{ homeCount.moodCount }}</h2>
      </el-card>
      <el-card class="top-card" shadow="hover">
        <span>今日访问</span>
        <h2>{{ homeCount.dayViewCount }}</h2>
      </el-card>
    </div>
    <div class="home-chart">
      <div id="myChart" style="width: 33%; height: 300px;"></div>
      <div id="pieChart_1" style="width: 33%; height: 300px;"></div>
      <div id="pieChart_2" style="width: 33%; height: 300px;"></div>
    </div>
    <div class="badge-con">
      <el-badge v-if="homeCount.feedbackCount" :value="homeCount.feedbackCount" class="badge-item">
        <el-button size="small">未审核留言</el-button>
      </el-badge>
      <el-badge v-if="homeCount.commentArticleCount" :value="homeCount.commentArticleCount" class="badge-item">
        <el-button size="small">未审核文章评论</el-button>
      </el-badge>
      <el-badge v-if="homeCount.commentMoodCount" :value="homeCount.commentMoodCount" class="badge-item">
        <el-button size="small">未审核微语评论</el-button>
      </el-badge>
      <el-badge v-if="homeCount.commentCaseCount" :value="homeCount.commentCaseCount" class="badge-item">
        <el-button size="small">未审核案例评论</el-button>
      </el-badge>
      <el-badge v-if="homeCount.commentAlbumCount" :value="homeCount.commentAlbumCount" class="badge-item">
        <el-button size="small">未审核相册评论</el-button>
      </el-badge>
      <el-badge v-if="homeCount.blogrollCount" :value="homeCount.blogrollCount" class="badge-item">
        <el-button size="small">未审核友情链接</el-button>
      </el-badge>
    </div>

  <div class="ech-wrap">
    <div class="ech-item">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <span>未审核评论</span>
        </div>
        <el-table
          :data="homeCount.allUnauditedComment"
          size="mini"
          type="index"
          style="width: 100%">
          <el-table-column
            prop="time"
            label="日期">
            <template slot-scope="scope">
              <span>{{ scope.row.time | $formatTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="昵称">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.type" :color="commentType[scope.row.type].color" size="mini" effect="dark">
                {{ commentType[scope.row.type].name }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="content"
            label="ip">
            <template slot-scope="scope">
              <p v-html="scope.row.content"></p>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="地点">
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <div class="ech-item">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <span>登陆日志</span>
          <el-button style="float: right; padding: 3px 0" type="text">
            查看详细
          </el-button>
        </div>
        <el-table
          :data="logList"
          size="mini"
          type="index"
          style="width: 100%">
          <el-table-column
            prop="time"
            label="日期">
            <template slot-scope="scope">
              <span>{{ scope.row.time | $formatTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="昵称">
          </el-table-column>
          <el-table-column
            prop="ip"
            label="ip">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地点">
          </el-table-column>
        </el-table>
      </el-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { State } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'

import echarts from 'echarts'
import 'echarts/map/js/china'

@Component
export default class extends Vue {
  logList: any = []
  charOpt: any = []
  commentType: object =
    {
      article: {
      name: '文章',
      color: '#ff6666',
    },
    case: {
      name: '案例',
      color: '#05ff7e',
    },
    mood: {
      name: '微语',
      color: '#00a4da',
    },
    album: {
      name: '相册',
      color: '#b25fff',
    },
    feedback: {
      name: '留言',
      color: '#007885',
    },
    blogroll: {
      name: '友链',
      color: '#ff7603',
    },
  }
  homeCount: any = {}

  @State('token') token: any

  mounted() {
    if (!this.token) {
      return
    }
    this.getCount()
    this.getLoginList();
    this.getWebLog()
  }

  async getCount() {
    if (!this.token) {
      return
    }
    try {
      const { result } = await this.$api.home.getAllCount()
      result.allMessageCount = result.commentArticleCount
      + result.commentCaseCount
      + result.feedbackCount
      + result.commentMoodCount
      + result.commentAlbumCount
      + result.blogrollCount
      this.homeCount = result
      // this.$store.commit('setWebCount', result)
    } catch (e) {
      console.log(e)
    }
  }

  async getLoginList() {
    try {
      const { result } = await this.$api.home.getUserLogs()
      this.logList = result
    } catch (e) {
      console.log(e)
    }
  }

  async getWebLog() {
    try {
      const { result } = await this.$api.home.getViewLogs()
      const dayArr = result.sevenDayCount.map((item: any) => item.day)
      const valueArr = result.sevenDayCount.map((item: any) => item.count)
      this.drawLine(dayArr, valueArr)
      this.drawPie(result.mostProvince)
      this.drawPie2(result.mostView)
    } catch (e) {
      console.log(e)
    }
  }

  drawLine(day: any, count: any) {
    const dom: any = document
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(dom.getElementById('myChart'))
    // 绘制图表
    const opt: any = {
      title: {
        text: '7天访问统计',
        x: 'center',
      },
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: day,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '访问量',
          type: 'line',
          label: {
            normal: {
              show: true,
              position: 'top',
            },
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(255,66,109,0.8)' },
                { offset: 1, color: 'rgba(255,66,109,0)' },
              ],
            },
          },
          data: count,
        },
      ],
    }
    myChart.setOption(opt);
  }

  drawPie(data: any) {
    const val = data.map((e: any) => e.value)
    const name = data.map((e: any) => e.name)
    const dom: any = document
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(dom.getElementById('pieChart_1'))
    const opt: any = {
      grid: {
        left: '2%',
        right: '2%',
        bottom: '2%',
        top: '2%',
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'none',
        },
        formatter: (params: any) => {
          return params[0].name  + ' : ' + params[0].value
        },
      },
      xAxis: {
        show: false,
        type: 'value',
      },
      yAxis: [{
        type: 'category',
        inverse: true,
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff',
          },
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        data: name,
      },
      {
        type: 'category',
        inverse: true,
        axisTick: 'none',
        axisLine: 'none',
        show: true,
        axisLabel: {
          textStyle: {
            color: '#ffffff',
            fontSize: '12',
          },
        },
        data: val,
      }],
      series: [{
        name: '值',
        type: 'bar',
        zlevel: 1,
        itemStyle: {
          normal: {
            barBorderRadius: 30,
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: 'rgb(57,89,255,1)',
            }, {
                offset: 1,
                color: 'rgb(46,200,207,1)',
            }]),
          },
        },
        barWidth: 20,
        data: val,
      },
      {
        name: '背景',
        type: 'bar',
        barWidth: 20,
        barGap: '-100%',
        data: name,
        itemStyle: {
          normal: {
            color: 'rgba(24,31,68,1)',
            barBorderRadius: 30,
          },
        },
      },
    ],
  };
    // 绘制图表
    myChart.setOption(opt);
  }

  drawPie2(data: any) {
    const dom: any = document
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(dom.getElementById('pieChart_2'))
    // 绘制图表
    const opt: any = {
      title: {
        text: '页面统计',
        x: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      series: [
        {
          name: '访问路径',
          type: 'pie',
          radius: '70%',
          center: ['50%', '60%'],
          data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }
    myChart.setOption(opt);
  }

}
</script>

<style scoped lang="scss">
.home-chart {
  display: flex;
  justify-content: space-between;
  div {
    flex: 1;
  }
}
.home-card {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .top-card {
    flex: 1;
    margin: 10px;
    span {
      color: #999999;
    }
    h2 {
      font-size: 40px;
    }
  }
}
.badge-con {
  display: flex;
  .badge-item {
    margin: 10px;
  }
}
.ech-wrap {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  .ech-item {
    flex: 1;
    margin: 0 10px;
    overflow-y:auto;
  }
  .ech-item .el-card__header {
    font-size: 14px;
    padding: 10px 20px;
  }
  .ech-item thead {
    display: none;
  }
}
.el-card {
  background-color: rgba(255,255,255,0.5);
}
</style>

