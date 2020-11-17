import Request from '@/utils/request'

class Settings extends Request {
  constructor() {
    super()
  }

  /**
   * @name 保存广告设置
   * @param  { String } params 参数
   */
  updateAd(params: any) {
    const url = 'settings/base/update'
    return this.put(url, { loading: true, ...params })
  }

  /**
   * @name 获取广告设置
   */
  getAd() {
    const url = 'settings/base/info'
    return this.get(url, { loading: true })
  }

  /**
   * @name 保存邮件设置
   * @param  { String } params 参数
   */
  updateMail(params: any) {
    const url = 'settings/mail/update'
    return this.put(url, { loading: true, ...params })
  }

  /**
   * @name 获取邮件设置
   */
  getMail() {
    const url = 'settings/mail/info'
    return this.get(url, { loading: true })
  }

  /**
   * @name 保存个性化设置
   * @param  { String } params 参数
   */
  updateCustom(params: any) {
    const url = 'settings/custom/update'
    return this.put(url, { loading: true, ...params })
  }

  /**
   * @name 获取个性化设置
   */
  getCustom() {
    const url = 'settings/custom/info'
    return this.get(url, { loading: true })
  }

  /**
   * @name 保存基本设置
   * @param  { String } params 参数
   */
  updateBase(params: any) {
    const url = 'settings/base/update'
    return this.put(url, { loading: true, ...params })
  }

  /**
   * @name 获取基本设置
   */
  getBase() {
    const url = 'settings/base/info'
    return this.get(url, { loading: true })
  }

}

export default new Settings()
