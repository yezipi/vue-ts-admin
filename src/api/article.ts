import Request from '@/utils/request'
interface IdValue {
  id: string,
}
class Article extends Request {
  constructor() {
    super()
  }

  /**
   * @name 获取文章列表
   * @param  { String } query.page 页码
   * @param  { String } query.page_size 页数
   * @param  { String } query.type 文章类型 article, case
   */
  getList(query: object) {
    const url = 'article/list'
    return this.get(url, query)
  }

  /**
   * @name 删除单个文章
   * @param  { String } id 文章id
   */
  remove(id: IdValue) {
    const url = 'article/delete'
    return this.delete(url, { id, loading: true })
  }

  /**
   * @name 更新单个文章
   * @param  { String } params.id 文章id
   * @param  { Object } params 要更新的参数
   */
  update(params: object) {
    const url = 'article/update'
    return this.put(url, { ...params, loading: true })
  }

  /**
   * @name 获取详情
   * @param  { String } params.id 文章id
   */
  info(id: string) {
    const url = 'article/info'
    return this.get(url, { id, loading: true })
  }

  /**
   * @name 创建文章
   * @param  { String } params.id 文章id
   * @param  { Object } params 参数
   */
  create(params: object) {
    const url = 'article/add'
    return this.post(url, { ...params, loading: true })
  }

  /**
   * @name 获取文章分类
   * @param  { String } type 文章类型 article case
   */
  getClassification(type: string) {
    const url = 'col/listSub'
    return this.get(url, { type, page_size: 100, page: 1 })
  }

  /**
   * @name 获取文章标签
   * @param  { String } type 文章类型 article case
   */
  getTags(type: string) {
    const url = 'tags/list'
    return this.get(url, { type, page_size: 100, page: 1 })
  }
}

export default new Article()
