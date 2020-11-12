<template>
  <div id="app">
    <!-- start左侧菜单部分 -->
    <yzp-menu v-if="!isLoginPage" :open="showMenu" ref="menu" @onMenuItemClick="onMenuItemClick"></yzp-menu>
    <!-- end左侧菜单部分 -->

    <!-- start顶部信息栏 -->
    <div v-if="!isLoginPage"  :class="{'more-left-space': showMenu}" class="top-menu">
      <div class="tm-main">
        <!--菜单按钮-->
        <div class="tm-left">
          <i class="tm-btns el-icon-s-fold" @click="showMenu = !showMenu"></i>
          <el-breadcrumb class="tm-bread" separator="/">
            <el-breadcrumb-item v-for="(el, i) in breadcrumbList" :key="i">{{ el.title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!--用户信息-->
        <div class="tm-user">
          <el-dropdown @command="logOut">
            <div class="tm-drop">
              <el-avatar :src="user.avatar"></el-avatar>
              <span class="el-dropdown-link">
                {{ user ? user.nickname : '-' }}
              </span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <!-- end顶部信息栏 -->

    <!-- start主要内容部分 -->
    <div :class="{'more-left-space': showMenu, 'login-content': isLoginPage, 'admin-content': !isLoginPage}" class="halfWhite">
      <div class="admin-main">
        <el-tabs
          v-if="activeRoutes.length && !isLoginPage"
          v-model="currentRoute"
          closable
          @tab-click="clickTab"
          @tab-remove="removeTab"
        >
          <el-tab-pane
            v-for="item in activeRoutes"
            :key="item.path"
            :label="item.meta.title"
            :name="item.path"
          >
          </el-tab-pane>
        </el-tabs>
        <router-view />
      </div>
    </div>
    <!-- end主要内容部分 -->
    <div class="admin-bg"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import YzpMenu from '@/components/common/YzpMenu.vue'

@Component({
  components: {
    YzpMenu,
  },
})

export default class App extends Vue {
  $refs!: {
    menu: HTMLFormElement,
  }
  showMenu: boolean = false
  breadcrumbList: object[] = []
  activeRoutes: object[] = []
  currentRoute: string = ''
  isLoginPage: boolean = true

  @State('token') token: any
  @State('user') user: any
  @Action('resetUser') resetUser: any
  @Watch('$route')
  WatchRoute(newVal: any) {
    this.setTtitle(newVal)
    this.isLoginPage = newVal.path === '/login'
    console.log(this.isLoginPage)
    if (!this.isLoginPage) {
      this.$refs.menu.setActiveMenu(newVal.path)
      this.initBreadcrumb(newVal.path)
    }
  }

  mounted() {
    console.log('vuex: ', this.$router)
    this.activeRoutes = []
    this.currentRoute = ''
    this.setTtitle(this.$route)
    this.isLoginPage = this.$route.path === '/login'
  }

  setTtitle(route: any) {
    document.title = route.meta.title || ''
  }

  initBreadcrumb(path: string) {
    this.$refs.menu.routerMenu.forEach((e: any) => {
      if (!e.children) {
        return
      }
      e.children.forEach((c: any) => {
        if (c.path === path) {
          this.breadcrumbList = [{ title: e.meta.title }, { title: c.meta.title }]
        }
      })
    })
  }

  onMenuItemClick({ parent, child }: any) {
    this.breadcrumbList = []
    this.breadcrumbList.push(parent)
    let sub = child
    if (parent.path) {
      // this.$router.push(parent.path)
      sub = parent
    }
    if (sub) {
      if (!sub.path) {
        this.$router.replace('/404')
        return false
      }
      this.breadcrumbList.push(sub)
      this.$router.push(sub.path)
      this.currentRoute = sub.path
      const routeTabPath = this.activeRoutes.map((e: any) => e.path).join()
      if (routeTabPath.indexOf(this.currentRoute) < 0) {
        this.activeRoutes.push(sub)
      }
    }
    console.log('this.activeRoutes', parent)
  }

  removeTab(path: string) {
    this.activeRoutes.forEach((e: any, i) => {
      if (path === e.path) {
        this.activeRoutes.splice(i, 1)
      }
    })
  }

  clickTab({ name }: any) {
    this.$router.replace(name)
  }

  logOut() {
    this.activeRoutes = []
    this.currentRoute = ''
    this.resetUser()
    this.$router.replace('/login')
  }
}
</script>

<style lang="scss">
@mixin halfWhite {
  background-color: rgba(255,255,255,0.5)!important;
}
@mixin halfBlack {
  background-color: rgba(0,0,0,0.2)!important;
}
@mixin blurBg {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  background-image: url('~@/assets/img/bg.jpg');
  position: fixed;
  left: 0;
  top: 0;
  z-index: 0;
  background-attachment: fixed;
  background-size: cover;
  background-position: center center;
  position: absolute;
  filter: blur(10px);
}
@mixin halfWhitebg {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255,0.5)!important;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
@mixin scrolBarStyle {
  &::-webkit-scrollbar {
    width: 5px;
    height: 1px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    box-shadow: inset 0 0 5px rgba(0,0,0,0.05);
    @include halfBlack;
  }
}
.halfWhite {
  @include halfWhite;
}
.blur {
  overflow: hidden;
  &:before {
    @include halfWhitebg;
  }
  &:after {
    @include blurBg;
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
* {
  padding: 0;
  margin: 0;
}
html, body {
  height: 100%;
}
body {
  background-color: #f5f5f5;
  background-image: url('~@/assets/img/blueprint.png');
  font-family: 'Microsoft YaHei';
  font-size: 14px;
  background-attachment: fixed;
  color: #333333;
}
.form-search {
  display: flex;
  justify-content: space-between;
}
.admin-bg {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  &:before {
    @include halfWhitebg;
    position: fixed;
  }
  &:after {
    @include blurBg;
    position: fixed;
  }
}
.admin-content {
  position: absolute;
  left: 270px;
  right: 20px;
  top: 80px;
  transition: left 0.5s;
  bottom: 20px;
  border-radius: 5px;
  overflow-y: auto;
  @include scrolBarStyle;
  &.more-left-space {
    left: 84px;
  }
  .admin-main {
    padding: 20px;
    position: relative;
    z-index: 1;
    
  }
}
.login-content {
  overflow: hidden;
  left: 270px;
  right: 0;
  top: 0;
  bottom: 0;
  background: none;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: none;
  margin-bottom: 0;
  .admin-main {
    padding: 0;
  }
}
.top-menu {
  position: fixed;
  right: 0;
  top: 0;
  left: 250px;
  z-index: 5;
  background: rgba(255,255,255,0.8);
  height: 60px;
  transition: all 0.5s;
  &.more-left-space {
    left: 64px;
  }
  .tm-main {
    height: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 1;
  }
  .tm-left {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .tm-bread {
    margin-left: 15px;
  }
  .tm-user {
    height: 100%;
    display: flex;
    align-items: center;
    .tm-drop {
      display: flex;
      align-items: center;
    }
    .el-dropdown-link {
      margin-left: 10px;
    }
  }
  .tm-btns {
    display: inline-block;
    font-size: 26px;
    color: #999999;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
}
.el-table td .el-button i[class*="el-"]{
  margin-right: 0;
  vertical-align: baseline;
}
.el-table__fixed, .el-table__fixed-right { @include halfWhitebg; }
.el-table__body-wrapper.is-scrolling-none ~ .el-table__fixed, .el-table__body-wrapper.is-scrolling-none ~ .el-table__fixed-right {
  background: none;
}
.el-table th {
  font-weight: bold;
}
.el-table,
.el-table__expanded-cell,
.el-table th,
.el-table tr,
{
  background: transparent!important
}
.el-table--scrollable-x .el-table__body-wrapper {
  @include scrolBarStyle;
  &::-webkit-scrollbar {
    width: 1px;
    height: 5px;
  }
}
.tox .tox-edit-area__iframe {
  @include halfWhitebg;
}
@import '~@/assets/css/yzp-default.scss'
</style>
