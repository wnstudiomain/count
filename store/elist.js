
export const state = () => ({
  list: null
})
export const mutations = {
  setElist (state, payload) {
    state.list = payload
  }
}
export const getters = {
  elist (state) {
    return state.list
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
