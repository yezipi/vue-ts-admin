import { db } from '../utils/index'

const state: any = {
  token: db.get('token'),
  user: db.get('user') || '123',
  isLoading: false,
  loading: null,
}
export default state
