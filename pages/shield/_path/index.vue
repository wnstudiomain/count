<template>
  <div class="main container-fluid d-flex">
    <LeftNavbarShields :shields="shields" />
    <div class="shield-wrapper">
      <p>ID: {{ shield.id }}</p>
      <p>NAME: {{ shield.name }}</p>
      <p>DESCRIPTION: {{ $route.params.path }}</p>
    </div>
  </div>
</template>

<script>
import LeftNavbarShields from '~/components/LeftNavbarShields'

export default {
  components: {
    LeftNavbarShields
  },
  layout: 'content',
  data () {
    return {
      shield: [],
      shields: [],
      error: null
    }
  },
  async mounted () {
    try {
      const response = await this.$axios.$get('/api/electroshields/' + this.$route.params.id)
      console.log(response)
      this.shield = response.data
    } catch (error) {
      this.error = error
    }
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
