import Request from '@/utils/request'
interface IdValue {
  id: string,
}
class Log extends Request {
  constructor() {
    super()
  }

  /**
   * @name 获取列表
   * @param  { String } query.page 页码
   * @param  { String } query.page_size 页数
   */
  getList(query: object) {
    const url = 'logs/list'
    return this.get(url, query)
  }

  /**
   * @name 删除单个
   * @param  { String } id id
   */
  remove(id: IdValue) {
    const url = 'logs/delete'
    return this.delete(url, { id, loading: true })
  }

  /**
   * @name 创建
   * @param  { String } params.id id
   * @param  { Object } params 参数
   */
  create(params: object) {
    const url = 'logs/add'
    return this.post(url, { ...params, loading: true })
  }

}

export default new Log()
