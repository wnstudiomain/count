
export const state = () => ({
  enumData: null
})
export const mutations = {
  setEnum (state, payload) {
    state.enumData = payload
  }
}
export const getters = {
  getEnum (state) {
    return state.enumData
  }
}
export const actions = {
  async fetchEnum ({ commit }, id) {
    try {
      const response = await this.$axios.$get('/api/electroshields/' + id)
      commit('setEnum', response.data)
    } catch (error) {
      console.log(error)
    }
  }
}
