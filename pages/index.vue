<template>
  <div class="container-fluid main">
    <div v-if="error">
      {{ error }}
    </div>
    <ul v-else>
      <LeftNavbar :shields="shields" />
    </ul>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import LeftNavbar from '~/components/LeftNavbarShields'

export default {
  components: {
    LeftNavbar
  },
  layout: 'content',
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
