import request from '@/utils/request'

/*
 *@name 公共方法模块
 */
class Common extends request {
  constructor() {
    super()
  }

  /**
   * @name 上传到阿里云
   * @param { String } file 文件路径
   * @param { String } dir 文件夹名称
   */
  async aliyunUpload(file: any, dir: any) {
    const url = 'client/aliyunUpload/file'
    const formData = new FormData()
    const isLoading: any = true
    formData.append('file', file)
    formData.append('dir', dir)
    formData.append('loading', isLoading)
    try {
      const res: any = await this.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data'} })
      const result: any = res.result
      return result.url
    } catch (e) {
      console.log(e)
      return null
    }
  }

  /**
   * @name nodejs上传到服务器
   * @param { FormData } formData
   * @param { Object } headers
   */
  upload(formData: any, headers: object) {
    const url = '/upload/img'
    return this.post(url, formData, headers)
  }

  /**
   * @name 删除node图片
   * @param { FormData } formData
   * @param { Object } headers
   */
  deleteImg(path: any) {
    const url = '/upload/delete'
    return this.delete(url, { path, loading: true })
  }

}

export default new Common()
