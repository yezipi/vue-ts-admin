import Vue from 'vue'
import Api from './api'
import Dict from './dict'

declare module 'vue/types/vue' {
  interface Vue {
    $api: any,
    $dict: any,
  }
}
