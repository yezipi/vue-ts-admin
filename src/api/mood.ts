import Request from '@/utils/request'
interface IdValue {
  id: string,
}
class Mood extends Request {
  constructor() {
    super()
  }

  /**
   * @name 获取列表
   * @param  { String } query.page 页码
   * @param  { String } query.page_size 页数
   */
  getList(query: object) {
    const url = 'mood/list'
    return this.get(url, query)
  }

  /**
   * @name 删除单个
   * @param  { String } id id
   */
  remove(id: IdValue) {
    const url = 'mood/delete'
    return this.delete(url, { id, loading: true })
  }

  /**
   * @name 更新文章
   * @param  { String } params.id id
   * @param  { Object } params 要更新的参数
   */
  update(params: object) {
    const url = 'mood/update'
    return this.put(url, { ...params, loading: true })
  }

  /**
   * @name 获取详情
   * @param  { String } params.id id
   */
  info(id: string) {
    const url = 'mood/info'
    return this.get(url, { id, loading: true })
  }

  /**
   * @name 创建
   * @param  { String } params.id id
   * @param  { Object } params 参数
   */
  create(params: object) {
    const url = 'mood/add'
    return this.post(url, { ...params, loading: true })
  }

}

export default new Mood()
