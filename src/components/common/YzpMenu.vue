<template>
  <div :class="{'half-width': open}" class="admin-menu blur">
    <div class="admin-logo">
      <img src="@/assets/logo.png" />
    </div>
    <el-menu
      unique-opened
      :collapse="open"
      :default-active="currentName"
      background-color="transparent"
      text-color="#ffffff"
      class="menu-wrap"
    >
      <template v-for="(item, index) in routerMenu">
        <el-menu-item v-if="!item.children" :key="item.name" :index="item.name" @click="onSubMenuClick(item, null)">
          <i :class="item.meta.icon"></i>
          <span>{{ item.meta.title }}</span>
        </el-menu-item>
        <el-submenu v-else :key="index" :index="item.name">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{ item.meta.title }}</span>
          </template>
          <template v-if="item.children.length">
            <template v-for="(sub, idx) in item.children">
              <el-menu-item
                v-if="!sub.meta.noMenu"
                :key="idx"
                :index="sub.name"
                @click="onSubMenuClick(item, sub)"
              >
                <i :class="sub.meta.icon"></i>
                <span>{{ sub.meta.title }}</span>
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
  currentName: string = 'Home'

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

  onSubMenuClick(parent: any, child: any) {
    const path = parent.path || child.path
    if (!path) {
      return
    }
    const route: any = this.$route
    if (path !== route.path) {
      this.$emit('onMenuItemClick', { parent, child })
    }
  }

  setActiveItem(name: string) {
    this.currentName = name
  }

}
</script>

<style scoped lang="scss">
.admin-logo {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0;
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  img {
    max-width: 60%;
    height: 100%;
    object-fit: cover;
  }
}

.el-submenu .el-menu-item {
  display: flex;
  align-items: center;
  font-size: 13px;
  i {
    font-size: 13px;
  }
}
</style>
