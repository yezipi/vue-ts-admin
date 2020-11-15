
import { Message, MessageBox } from 'element-ui'
import api from '../api'

const mixins =  {
  methods: {
    /**
     * @name 更新
     * @param { String } apiPath api
     * @param { Object } params 参数
     */
    async $doUpdate(apiPath: string, params: object) {
      const path = apiPath.split('.')
      try {
        await api[path[0]][path[1]](params)
        Message.success('更新成功')
      } catch (e) {
        console.log(e)
      }
    },

    /**
     * @name 删除
     * @param { String } apiPath api
     * @param { Object } params 要删除的参数
     * @param { String } title 参数
     */
    $doDelete(apiPath: string, params: any, title = '确定删除吗') {
      return new Promise((resolve, reject) => {
        const path = apiPath.split('.')
        MessageBox.confirm(title, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(async () => {
          try {
            await api[path[0]][path[1]](params)
            Message.success('操作成功')
            resolve()
          } catch (e) {
            reject(e)
            console.log(e)
          }
        })
      })
    },
  },
}

export default mixins
