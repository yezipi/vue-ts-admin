<template>
  <div id="app">
    <!-- start左侧菜单部分 -->
    <yzp-menu v-if="!isLogin" :open="showMenu" ref="menu" @onMenuItemClick="onMenuItemClick"></yzp-menu>
    <!-- end左侧菜单部分 -->

    <div class="admin-box">
      <!-- start顶部信息栏 -->
      <div v-if="!isLogin" class="top-menu blur">
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
      <div :class="{'login-content': isLogin}" class="admin-content blur">
        <div class="admin-main">
          <!-- <el-tabs
            v-if="activeRoutes.length && !isLogin"
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
          </el-tabs> -->
          <transition name="slide-fade">
            <router-view />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { State, Action, Mutation } from 'vuex-class'
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
  isLogin: boolean = true

  @State('token') token: any
  @State('user') user: any
  @Action('resetUser') resetUser: any
  @Watch('$route')
  WatchRoute(newVal: any) {
    this.setTtitle(newVal)
    this.setLoginState(newVal)
    if (!this.isLogin) {
      this.$nextTick(function() {
        this.$refs.menu.setActiveItem(newVal.name)
        this.initBreadcrumb(newVal.path)
      })
    }
  }

  beforeCreate() {
    this.isLogin = this.$route.name === 'Login'
  }

  mounted() {
    console.log(this)
    this.activeRoutes = []
    this.currentRoute = ''
    this.setTtitle(this.$route)
  }

  setTtitle(route: any) {
    document.title = route.meta.title || '未命名'
  }

  setLoginState(route: any) {
    this.isLogin = route.name === 'Login'
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
    this.isLogin = true
    this.$router.replace(`/Login?referrer=${this.$route.path}`)
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
  background-image: url('/api/static/upload/webbg/webbg_4.jpg');
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;
  background-attachment: fixed;
  background-size: cover;
  background-position: center center;
  position: absolute;
  filter: blur(15px);
}
@mixin halfWhitebg {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255,0.5)!important;
  background-image: url('~@/assets/img/overlay.png');
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
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

* {
  padding: 0;
  margin: 0;
  outline: none;
}
html, body {
  height: 100%;
}
body {
  background-color: #f5f5f5;
  // background-image: url('~@/assets/img/blueprint.png');
  font-family: 'Microsoft YaHei';
  font-size: 14px;
  background-attachment: fixed;
  color: #333333;
}
.halfWhite {
  @include halfWhite;
}
.blur {
  position: relative;
  overflow: hidden;
  &:before {
    @include halfWhitebg;
    background-color: rgba(255,255,255,0.5)!important;
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
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  &:before {
    @include halfWhitebg;
    background-color: rgba(255,255,255,0.3)!important;
    position: fixed;
  }
  &:after {
    @include blurBg;
    position: fixed;
    filter: blur(0);
  }
  .admin-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    overflow: hidden;
    .top-menu {
      position: relative;
      z-index: 5;
      height: 60px;
      transition: all 0.5s;
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
    .admin-content {
      margin: 20px;
      transition: left 0.5s;
      border-radius: 5px;
      flex: 1;
      position: relative;
      z-index: 5;
      overflow: hidden;
      &.login-content {
        margin: 0;
        .admin-main {
          padding: 0;
        }
      }
      .admin-main {
        position: relative;
        z-index: 1;
        padding: 20px;
        height: calc(100% - 40px);
        overflow-y: auto;
        @include scrolBarStyle;
      }
    }
  }
}
.form-search {
  display: flex;
  justify-content: space-between;
}
.el-table td .el-button i[class*="el-"]{
  margin-right: 0;
  vertical-align: baseline;
}
.el-table__fixed, .el-table__fixed-right { @include halfWhite; }
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
.el-table--striped .el-table__body tr.el-table__row--striped td {
  background: rgba(255,255,255,0.3)!important
}
.tox .tox-edit-area__iframe {
  @include halfWhite;
}
.el-message{ top:30%!important; left: 50%; }
.el-drawer__header { margin-bottom: 0 }
.el-drawer {
  background: none!important;
}
.el-drawer__body, .dialogMainModal, .el-dialog, .el-select-dropdown__list {
  .demo-drawer__content {
    position: relative;
  }
  &:before {
    @include halfWhitebg;
  }
  &:after {
    @include blurBg;
  }
}
.el-dialog {
  background: none;
}
.i-dialog-footer, .el-dialog__footer {
  position: relative;
}
.dialogBoxModal {
  position: fixed!important;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  div.dialogMainModal {
    background: none;
    overflow: hidden;
    line-height: initial;
    top: initial;
    left: initial;
    transform: translateX(0);
    border: 0;
    margin: auto;
  }
  .toolMain {
    position: relative;
  }
}
@import '~@/assets/css/yzp-default.scss'
</style>
