import Request from '@/utils/request'

// 栏目模块
class Column extends Request {
  constructor() {
    super()
  }

  /**
   * @name 获取列表
   * @param  { String } query.page 页码
   * @param  { String } query.page_size 页数
   */
  getList(query: object) {
    const url = 'col/list'
    return this.get(url, query)
  }

  /**
   * @name 删除单个
   * @param  { String } params.id id
   */
  remove(params: any) {
    const str = typeof params === 'string'
    const obj: any = str ? { id: params } : params
    const url = 'col/delete'
    return this.delete(url, { ...params, loading: true })
  }

  /**
   * @name 创建
   * @param  { String } params.id id
   * @param  { Object } params 参数
   */
  create(params: object) {
    const url = 'col/add'
    return this.post(url, { ...params, loading: true })
  }

  /**
   * @name 更新
   * @param  { String } params.id id
   * @param  { Object } params 参数
   */
  update(params: object) {
    const url = 'col/update'
    return this.put(url, { ...params, loading: true })
  }

  /**
   * @name 详细
   * @param  { String } params.id id
   */
  info(params: object) {
    const url = 'col/info'
    return this.get(url, { ...params, loading: true })
  }

}

export default new Column()
