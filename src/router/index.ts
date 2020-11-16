import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue'),
    meta: { title: '首页', icon: 'el-icon-s-home' },
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
    meta: { title: '404', noMenu: true },
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/Login.vue'),
    meta: { noAuth: true, title: '登录', noMenu: true },
  },
  {
    path: '',
    name: 'Content',
    meta: { title: '内容管理', noLink: true, role: [1, 2], icon: 'el-icon-edit' },
    component: () => import(/* webpackChunkName: "ArticleIndex" */ '@/views/Content/Index.vue'),
    children: [
      {
        path: '/ArticleEdit',
        name: 'ArticleEdit',
        meta: { title: '发布文章', noMenu: true },
        component: () => import(/* webpackChunkName: "ArticleEdit" */ '@/views/Content/ArticleEdit.vue'),
      },
      {
        path: '/CaseEdit',
        name: 'CaseEdit',
        meta: { title: '案例发布', noMenu: true },
        component: () => import(/* webpackChunkName: "CaseEdit" */ '@/views/Content/CaseEdit.vue'),
      },
      {
        path: '/MoodEdit',
        name: 'MoodEdit',
        meta: { title: '微语发布', noMenu: true },
        component: () => import(/* webpackChunkName: "MoodEdit" */ '@/views/Content/MoodEdit.vue'),
      },
      {
        path: '/ArticleList',
        name: 'ArticleList',
        meta: { title: '文章管理', icon: 'el-icon-notebook-1' },
        component: () => import(/* webpackChunkName: "ArticleList" */ '@/views/Content/ArticleList.vue'),
      },
      {
        path: '/CaseList',
        name: 'CaseList',
        meta: { title: '案例管理', icon: 'el-icon-ice-cream-round' },
        component: () => import(/* webpackChunkName: "CaseList" */ '@/views/Content/CaseList.vue'),
      },
      {
        path: '/MoodList',
        name: 'MoodList',
        meta: { title: '微语管理', icon: 'el-icon-chat-dot-round' },
        component: () => import(/* webpackChunkName: "MoodList" */ '@/views/Content/MoodList.vue'),
      },
      {
        path: '/LogList',
        name: 'LogList',
        meta: { title: '日志管理', icon: 'el-icon-notebook-2' },
        component: () => import(/* webpackChunkName: "LogList" */ '@/views/Content/LogList.vue'),
      },
      {
        path: '/TagList',
        name: 'TagList',
        meta: { title: '标签管理', icon: 'el-icon-collection-tag' },
        component: () => import(/* webpackChunkName: "TagList" */ '@/views/Content/TagList.vue'),
      },
    ],
  },
  {
    path: '',
    name: 'Interact',
    meta: { title: '互动管理', noLink: true, role: [1, 2], icon: 'el-icon-s-comment' },
    component: () => import(/* webpackChunkName: "InteractIndex" */ '@/views/Interact/Index.vue'),
    children: [
      {
        path: '/CommentList',
        name: 'CommentList',
        meta: { title: '评论管理', role: [1, 2], icon: 'el-icon-chat-line-round' },
        component: () => import(/* webpackChunkName: "CommentList" */ '@/views/Interact/CommentList.vue'),
      },
      {
        path: '/FeedbackList',
        name: 'FeedbackList',
        meta: { title: '留言管理', role: [1, 2], icon: 'el-icon-chat-dot-square' },
        component: () => import(/* webpackChunkName: "CommentIndex" */ '@/views/Interact/FeedbackList.vue'),
      },
    ],
  },
  {
    path: '',
    name: 'BlogrollIndex',
    meta: { title: '友链管理', noLink: true, role: [1, 2], icon: 'el-icon-link' },
    component: () => import(/* webpackChunkName: "BlogrollIndex" */ '@/views/Blogroll/Index.vue'),
    children: [
      {
        path: '/BlogrollList',
        name: 'BlogrollList',
        meta: { title: '友链列表', role: [1, 2], icon: 'el-icon-paperclip' },
        component: () => import(/* webpackChunkName: "BlogrollList" */ '@/views/Blogroll/BlogrollList.vue'),
      },
    ],
  },
  {
    path: '',
    name: 'AlbumIndex',
    meta: { title: '相册管理', noLink: true, role: [1, 2], icon: 'el-icon-picture-outline' },
    component: () => import(/* webpackChunkName: "AlbumIndex" */ '@/views/Album/Index.vue'),
    children: [],
  },
  {
    path: '',
    name: 'ColumnIndex',
    meta: { title: '栏目管理', noLink: true, role: [1, 2], icon: 'el-icon-menu' },
    component: () => import(/* webpackChunkName: "ColumnIndex" */ '@/views/Column/Index.vue'),
    children: [],
  },
  {
    path: '',
    name: 'UserIndex',
    meta: { title: '用户管理', noLink: true, role: [1, 2], icon: 'el-icon-user' },
    component: () => import(/* webpackChunkName: "UserIndex" */ '@/views/User/Index.vue'),
    children: [],
  },
  {
    path: '',
    name: 'SettingsIndex',
    meta: { title: '系统设置', noLink: true, role: [1, 2], icon: 'el-icon-setting' },
    component: () => import(/* webpackChunkName: "SettingsIndex" */ '@/views/Settings/Index.vue'),
    children: [],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
