<template>
  <div class="main">
    <div v-if="loading" class="container-fluid dashboard">
      <h1>Мониторинг</h1>
      <div class="d-flex align-items-center">
        <div class="status-block online d-flex">
          <div class="status-img">
            <div>
              <img src="/thunder.png">
            </div>
          </div>
          <div class="status-detail">
            <span>50</span> в сети
          </div>
        </div>
        <div class="status-block offline d-flex">
          <div class="status-img">
            <div>
              <img src="/offline.png">
            </div>
          </div>
          <div class="status-detail">
            <span>0</span> не в сети
          </div>
        </div>
      </div>
      <div class="shield-group">
        <b-row>
          <b-col
            v-for="shield in list"
            :key="shield.id"
            xl="4"
            lg="4"
            class="d-flex align-items-center shield-item"
          >
            <div class="shield-item__wrapper">
              <div class="shield-item__title">
                <nav-item
                  :link="{
                    name: shield.name,
                    multiply: true,
                    params: {
                      url: 'shield-path',
                      id: shield.id,
                      path: shield.name,
                    }
                  }"
                />
                <div class="shield-item__status">
                  <span v-if="shield.is_enabled == true" class="online">Online</span>
                  <span v-else class="offline">Offline</span>
                </div>
                <el-tooltip :content="shield.telemetry_current[0].controller.measurements[0].parameters.gsm_signal_strength_decibel_milliwatts[1].value + ' dB'" placement="top">
                  <img class="shield-item__image-signal" src="/signal-bars.png">
                </el-tooltip>
              </div>
              <div class="shield-item__detail">
                <div class="d-flex justify-content-between">
                  <span>Счетчик № {{ shield.meter_serial_number }}</span>
                  <span class="kvt">{{ shield.telemetry_current[0].meter.measurements[0].parameters.total_active_energy_for_whole_period_kilowatt_hours[1].value }} кВт*ч</span>
                </div>
              </div>
              <div class="shield-item__table">
                <div class="table-header">
                  <div />
                  <div>U(В)</div>
                  <div>I(А)</div>
                  <div>P(Вт)</div>
                  <div>Q(Вар)</div>
                </div>
                <div class="table-body">
                  <div>
                    <div>A</div>
                    <div>{{ shield.telemetry_current[0].meter.measurements[0].parameters.voltage_volts1[1].value }}</div>
                    <div>{{ shield.telemetry_current[0].meter.measurements[0].parameters.current_amperes1[1].value }}</div>
                    <div>{{ shield.telemetry_current[0].meter.measurements[0].parameters.active_power_watts1[1].value }}</div>
                    <div>{{ shield.telemetry_current[0].meter.measurements[0].parameters.reactive_power_volt_amperes1[1].value }}</div>
                  </div>
                  <div>
                    <div>B</div>
                    <div>{{ shield.telemetry_current[0].meter.measurements[0].parameters.voltage_volts2[1].value }}</div>
                    <div>{{ shield.telemetry_current[0].meter.measurements[0].parameters.current_amperes2[1].value }}</div>
                    <div>{{ shield.telemetry_current[0].meter.measurements[0].parameters.active_power_watts2[1].value }}</div>
                    <div>{{ shield.telemetry_current[0].meter.measurements[0].parameters.reactive_power_volt_amperes2[1].value }}</div>
                  </div>
                  <div>
                    <div>C</div>
                    <div>{{ shield.telemetry_current[0].meter.measurements[0].parameters.voltage_volts3[1].value }}</div>
                    <div>{{ shield.telemetry_current[0].meter.measurements[0].parameters.current_amperes3[1].value }}</div>
                    <div>{{ shield.telemetry_current[0].meter.measurements[0].parameters.active_power_watts3[1].value }}</div>
                    <div>{{ shield.telemetry_current[0].meter.measurements[0].parameters.reactive_power_volt_amperes3[1].value }}</div>
                  </div>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  layout: 'content',
  data () {
    return {
      error: null,
      list: [],
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      elist: 'elist/elist'
    })
  // Другие вычисляемые свойства
  },
  async mounted () {
    await this.$store.dispatch('elist/fetchSheilds')
    this.list = await this.elist
    this.loading = true
  }
}
</script>
