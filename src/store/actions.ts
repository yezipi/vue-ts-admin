const actions: any = {
  resetUser({ commit }: any) {
    commit('setToken', '')
    commit('setUser', '')
  },
}

export default actions
