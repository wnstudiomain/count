
export const state = () => ({
  data: null
})
export const mutations = {
  setEnum (state, payload) {
    state.data = payload
  }
}
export const getters = {
  enum (state) {
    return state.data
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
