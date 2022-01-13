
export const state = () => ({
  enumList: null
})
export const mutations = {
  setElist (state, payload) {
    state.enumList = payload
  }
}
export const getters = {
  getElist (state) {
    return state.enumList
  }
}
export const actions = {
  async fetchSheilds ({ commit }) {
    try {
      const response = await this.$axios.$get('/api/electroshields/')
      commit('setElist', response.data)
    } catch (error) {
      console.log(error)
    }
  }
}
