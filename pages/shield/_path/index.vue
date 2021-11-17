<template>
  <div class="main container-fluid d-flex">
    <LeftNavbarShields :shields="elist" />
    <div class="shield-wrapper">
      <p>ID: {{ shield.id }}</p>
      <p>NAME: {{ shield.name }}</p>
      <p>DESCRIPTION: {{ $route.params.path }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters({
      elist: 'elist/elist'
    })
  // Другие вычисляемые свойства
  },
  async mounted () {
    try {
      const response = await this.$axios.$get('/api/electroshields/' + this.$route.params.id)
      console.log(response)
      this.shield = response.data
    } catch (error) {
      this.error = error
    }
  }
}
</script>
