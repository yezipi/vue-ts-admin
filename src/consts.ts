const IS_DEV = process.env.NODE_ENV === 'development'
const REQ_PREFIX = IS_DEV ? 'http://192.168.1.103:3000/' : 'http://bbl.yezipi.net/'

export default {
  REQ_PREFIX,
}
