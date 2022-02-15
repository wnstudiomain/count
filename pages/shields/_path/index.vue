<template>
  <div class="main container-fluid d-flex">
    <LeftNavbarShields :shields="mapElist" />
    <div v-if="loading" class="shield-wrapper">
      <div class="shield-header">
        <div class="d-flex align-items-center">
          <h1>Шкаф управления {{ shield.name }}</h1>
        </div>
        <div class="control-panel">
          <div class="shield-item__status">
            <span v-if="enable == true" class="online">Online</span>
            <span v-else class="offline">Offline</span>
          </div>
          <el-switch v-model="enable" active-color="#123a73fc" />
        </div>
      </div>
      <div class="update-header">
        <span>Последнее обновление {{ shield.updated_at }}</span>
        <a class="refresh-button" href="" @click.prevent="updateEnum">
          <i class="el-icon-refresh" />
        </a>
      </div>
      <div class="d-flex align-items-center mt-3">
        <span></span>
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
      loading: false,
      shield: [],
      enable: null,
      enumID: null
    }
  },
  computed: {
    ...mapGetters({
      mapElist: 'elist/getElist',
      mapShield: 'enum/getEnum'
    })
  },
  async mounted () {
    // this.scrollIntoViewWithOffset(this.$route.params.path, 20)
    this.$nextTick(function () {
      this.scrollToElement(this.$route.params.path ? this.$route.params.path : localStorage.getItem('enum_path'))
    })
    this.enumID = this.$route.params.id ? this.$route.params.id : localStorage.getItem('enum_id')
    await this.fetchEnum(this.enumID)
    if (this.mapElist === null) {
      await this.$store.dispatch('elist/fetchSheilds')
    }
    this.shield = await this.mapShield
    this.enable = this.shield.is_enabled
    this.loading = true
  },
  methods: {
    ...mapActions({
      fetchEnum: 'enum/fetchEnum'
    }),
    async updateEnum () {
      await this.fetchEnum(this.enumID)
    },
    scrollToElement (selector) {
      const el = document.getElementById(selector)
      if (el) {
        // Use el.scrollIntoView() to instantly scroll to the element
        el.scrollIntoView({ block: 'center' })
      }
    }
  }
}
</script>
