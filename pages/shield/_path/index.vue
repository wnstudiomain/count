<template>
  <div class="main container-fluid d-flex">
    <LeftNavbarShields :shields="mapElist" />
    <div v-if="mapDataLoaded" class="shield-wrapper">
      <div class="shield-header">
        <h1>Шкаф управления {{ shield.name }}</h1>
        <div class="shield-item__status">
          <span v-if="shield.is_enabled == true" class="online">Online</span>
          <span v-else class="offline">Offline</span>
        </div>
      </div>
      <div class="update-header">
        Последнее обновление {{ shield.updated_at }}
      </div>
      <div class="d-flex align-items-center">
        <div class="status-block online d-flex">
          <div class="status-img">
            <div>
              <img src="/thunder.png">
            </div>
          </div>
          <div class="status-detail">
            Потребление кВт⋅ч<span>{{ shield.telemetry_current[0].meter.measurements[0].parameters.total_active_energy_for_whole_period_kilowatt_hours[1].value }}</span>
          </div>
        </div>
        <div class="status-block offline d-flex">
          <div class="status-img">
            <div>
              <img src="/offline.png">
            </div>
          </div>
          <div class="status-detail">
            Сигнал GSM dB<span>{{ shield.telemetry_current[0].controller.measurements[0].parameters.gsm_signal_strength_decibel_milliwatts[1].value }}</span>
          </div>
        </div>
      </div>
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
    this.mapDataLoaded = true
  },
  methods: {
    ...mapActions({
      fetchEnum: 'enum/fetchEnum'
    })
  }
}
</script>
