<template>
  <div class="main container-fluid d-flex">
    <LeftNavbarShields :shields="mapElist" />
    <div v-if="mapDataLoaded" class="shield-wrapper">
      <div class="shield-header">
        <div class="d-flex align-items-center">
          <h1>Шкаф управления {{ shield.name }}</h1>
        </div>
        <div class="control-panel">
          <div class="shield-item__status">
            <span v-if="shield.is_enabled == true" class="online">Online</span>
            <span v-else class="offline">Offline</span>
          </div>
          <el-switch v-model="enable" active-color="#123a73fc" />
        </div>
      </div>
      <div class="update-header">
        <span>Последнее обновление {{ shield.updated_at }}</span>
        <a class="refresh-button" href="">
          <i class="el-icon-refresh" />
        </a>
      </div>
      <div class="d-flex align-items-center mt-3">
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
      shield: [],
      enable: null
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
    const shield = await this.mapShield
    this.shield = shield
    this.enable = shield.is_enabled
    this.mapDataLoaded = true
  },
  methods: {
    ...mapActions({
      fetchEnum: 'enum/fetchEnum'
    })
  }
}
</script>
