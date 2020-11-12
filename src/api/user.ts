import request from '../utils/request'

class User extends request {
  constructor() {
    super()
  }
  // 登录
  login(data: any) {
    const url = 'admin/user/login'
    return this.post(url, data)
  }
}

export default new User()
