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
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/Login.vue'),
    meta: { noAuth: true, title: '登录', noMenu: true },
  },
  {
    path: '',
    name: 'Edit',
    meta: { title: '文章管理', noLink: true, role: [1, 2], icon: 'el-icon-edit' },
    component: () => import(/* webpackChunkName: "ArticleIndex" */ '@/views/Article/Index.vue'),
    children: [
      {
        path: '/ArticleEdit',
        name: 'ArticleEdit',
        meta: { title: '发布文章' },
        component: () => import(/* webpackChunkName: "ArticleEdit" */ '@/views/Article/Edit.vue'),
      },
      {
        path: '/ArticleList',
        name: 'ArticleList',
        meta: { title: '文章列表' },
        component: () => import(/* webpackChunkName: "ArticleList" */ '@/views/Article/List.vue'),
      },
    ],
  },
  {
    path: '',
    name: 'Contents',
    meta: { title: '内容管理', noLink: true, role: [1, 2], icon: 'el-icon-document' },
    component: () => import(/* webpackChunkName: "BabyIndex" */ '@/views/Article/List.vue'),
    children: [
      {
        path: '/a',
        name: 'a',
        meta: { title: '文章管理' },
        component: () => import(/* webpackChunkName: "BabyUsers" */ '@/views/Article/List.vue'),
      },
      {
        path: '/MoodList',
        name: 'MoodList',
        meta: { title: '添加文章' },
        component: () => import(/* webpackChunkName: "BabyUsers" */ '@/views/Article/List.vue'),
      },
    ],
  },
  {
    path: '',
    name: 'Comments',
    meta: { title: '评论管理', noLink: true, role: [1, 2], icon: 'el-icon-chat-dot-square' },
    component: () => import(/* webpackChunkName: "BabyIndex" */ '@/views/Article/List.vue'),
    children: [
      {
        path: '/baby-users',
        name: 'BabyUsers',
        meta: { title: '发表文章' },
        component: () => import(/* webpackChunkName: "BabyUsers" */ '@/views/Article/List.vue'),
      },
      {
        path: '/baby-users',
        name: 'BabyUsers',
        meta: { title: '发表微语' },
        component: () => import(/* webpackChunkName: "BabyUsers" */ '@/views/Article/List.vue'),
      },
    ],
  },
  {
    path: '',
    name: 'Albums',
    meta: { title: '相册管理', noLink: true, role: [1, 2], icon: 'el-icon-picture-outline' },
    component: () => import(/* webpackChunkName: "BabyIndex" */ '@/views/Article/List.vue'),
    children: [
      {
        path: '/baby-users',
        name: 'BabyUsers',
        meta: { title: '发表文章' },
        component: () => import(/* webpackChunkName: "BabyUsers" */ '@/views/Article/List.vue'),
      },
      {
        path: '/baby-users',
        name: 'BabyUsers',
        meta: { title: '发表微语' },
        component: () => import(/* webpackChunkName: "BabyUsers" */ '@/views/Article/List.vue'),
      },
    ],
  },
  {
    path: '',
    name: 'Links',
    meta: { title: '友链管理', noLink: true, role: [1, 2], icon: 'el-icon-link' },
    component: () => import(/* webpackChunkName: "BabyIndex" */ '@/views/Article/List.vue'),
    children: [
      {
        path: '/baby-users',
        name: 'BabyUsers',
        meta: { title: '发表文章' },
        component: () => import(/* webpackChunkName: "BabyUsers" */ '@/views/Article/List.vue'),
      },
      {
        path: '/baby-users',
        name: 'BabyUsers',
        meta: { title: '发表微语' },
        component: () => import(/* webpackChunkName: "BabyUsers" */ '@/views/Article/List.vue'),
      },
    ],
  },
  {
    path: '',
    name: 'Menus',
    meta: { title: '栏目管理', noLink: true, role: [1, 2], icon: 'el-icon-menu' },
    component: () => import(/* webpackChunkName: "BabyIndex" */ '@/views/Article/List.vue'),
    children: [
      {
        path: '/baby-users',
        name: 'BabyUsers',
        meta: { title: '发表文章' },
        component: () => import(/* webpackChunkName: "BabyUsers" */ '@/views/Article/List.vue'),
      },
      {
        path: '/baby-users',
        name: 'BabyUsers',
        meta: { title: '发表微语' },
        component: () => import(/* webpackChunkName: "BabyUsers" */ '@/views/Article/List.vue'),
      },
    ],
  },
  {
    path: '/mail',
    name: 'Mail',
    meta: { title: '邮件设置', role: [1, 2], icon: 'el-icon-message' },
    component: () => import(/* webpackChunkName: "BabyIndex" */ '@/views/Article/List.vue'),
  },
  {
    path: '',
    name: 'Settings',
    meta: { title: '系统设置', noLink: true, role: [1, 2], icon: 'el-icon-setting' },
    component: () => import(/* webpackChunkName: "BabyIndex" */ '@/views/Article/List.vue'),
    children: [
      {
        path: '/baby-users',
        name: 'BabyUsers',
        meta: { title: '发表文章' },
        component: () => import(/* webpackChunkName: "BabyUsers" */ '@/views/Article/List.vue'),
      },
      {
        path: '/baby-users',
        name: 'BabyUsers',
        meta: { title: '发表微语' },
        component: () => import(/* webpackChunkName: "BabyUsers" */ '@/views/Article/List.vue'),
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
