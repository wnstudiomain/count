<template>
  <div class="main container-fluid d-flex">
    <LeftNavbarShields :shields="mapElist" />
    <div class="shield-wrapper">
      <p>ID: {{ shield.id }}</p>
      <p>NAME: {{ shield.name }}</p>
      <p>DESCRIPTION: {{ $route.params.path }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LeftNavbarShields from '~/components/LeftNavbarShields'

export default {
  components: {
    LeftNavbarShields
  },
  layout: 'content',
  data () {
    return {
      mapDataLoaded: false,
      shield: []
    }
  },
  computed: {
    ...mapGetters({
      mapElist: 'elist/elist',
      mapShield: 'enum/enum'
    })
  },
  async mounted () {
    await this.fetchEnum(this.$route.params.id)
    this.shield = await this.mapShield
  },
  methods: {
    ...mapActions({
      fetchEnum: 'enum/fetchEnum'
    })
  }
}
</script>
