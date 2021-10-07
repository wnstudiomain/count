<template>
  <div class="container">
    <div v-if="error">
      {{ error }}
    </div>
    <ul v-else>
      <li v-for="shield in shields" :key="restaurant.id">
        {{ shield.title }}
      </li>
    </ul>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'App',
  middleware: 'auth',
  data () {
    return {
      shields: [],
      error: null
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  async mounted () {
    try {
      const response = await this.$axios.$get('/api/electroshields')
      console.log(response)
      this.shields = response.data
    } catch (error) {
      this.error = error
    }
  }
}
</script>
