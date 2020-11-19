import Request from '@/utils/request'

// 首页相关模块
class Home extends Request {
  constructor() {
    super()
  }

  /**
   * @name 获取首页数据统计
   */
  getAllCount() {
    const url = 'settings/adminCount'
    return this.get(url)
  }

  /**
   * @name 获取用户登录日志
   */
  getUserLogs() {
    const url = 'user/logs'
    return this.get(url)
  }

  /**
   * @name 获取浏览日志
   */
  getViewLogs() {
    const url = 'logs/clientCount'
    return this.get(url)
  }

}

export default new Home()
