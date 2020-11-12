<template>
  <div :class="{'half-width': open}" class="admin-menu">
    <div class="admin-logo">
      <img src="@/assets/logo.png" />
    </div>
    <el-menu
      unique-opened
      :collapse="open"
      :default-active="currentPath"
      background-color="transparent"
      text-color="#ffffff"
      class="menu-wrap"
    >
      <template v-for="(item, index) in routerMenu">
        <el-menu-item v-if="!item.children" :key="item.name" @click="onMenuItemClick(item, null)">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{ item.meta.title }}</span>
        </el-menu-item>
        <el-submenu v-else :key="index" :index="item.name">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{ item.meta.title }}</span>
          </template>
        <template v-if="item.children.length">
          <template v-for="(sub, idx) in item.children">
            <el-menu-item
              v-if="!sub.meta.noMenu"
              :key="idx"
              :index="sub.path"
              @click="onMenuItemClick(item, sub)"
            >
              {{ sub.meta.title }}
            </el-menu-item>
          </template>
        </template>
      </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  show: boolean = false
  currentPath: string = '/'

  @Prop({ default: false }) open!: boolean
  @Watch('open')
  WatchOpen(newVal: any) {
    this.show = newVal
  }

  get routerMenu() {
    const router: any = this.$router
    const options = router.options
    const menus = options.routes.filter((e: any) => !e.meta.noMenu)
    console.log(menus)
    return menus
  }

  onMenuItemClick(parent: any, child: any) {
    const path = parent.path || child.path
    const route: any = this.$route
    if (path !== route.path) {
      this.$emit('onMenuItemClick', { parent, child })
    }
  }

  setActiveMenu(path: string) {
    this.currentPath = path
  }

}
</script>

<style scoped lang="scss">
.admin-logo {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  img {
    max-width: 60%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
