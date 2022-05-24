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
      <div class="status-block address-block">
        <div class="img">
          <img src="/maps-and-flags.png">
        </div>
        <div>{{ shield.administrative_area_name }}, {{ shield.locality_name }}, {{ shield.thoroughfare_name }}, {{ shield.thoroughfare_number }}</div>
      </div>
      <div class="enum-number">
        Счетчик № {{ shield.meter_serial_number }}
      </div>
      <div class="d-flex align-items-center mt-3">
        <span />
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
      <div class="shield-table__wrapper">
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
      <div class="schedule-block">
        <h3>
          Текущее расписание
        </h3>
        <el-slider
          v-model="value"
          disabled
          range
          :max="24"
          :format-tooltip="formatTooltip"
          :marks="marks"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import { integer } from 'vee-validate/dist/rules'
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
      enumID: null,
      startMin: 0,
      endMin: 0,
      value: [30, 60],
      marks: {
        0: '00:00',
        4: '04:00',
        8: '08:00',
        12: '12:00',
        16: '16:00',
        20: '20:00',
        24: '00:00'
      }
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
    this.getValueFromHour(this.shield.programs[0].subprograms[0].shifts[1].range[1])
  },
  methods: {
    ...mapActions({
      fetchEnum: 'enum/fetchEnum'
    }),
    async updateEnum () {
      await this.fetchEnum(this.enumID)
    },
    getValueFromHour (data) {
      const start = data.start.split(':')
      const end = data.end.split(':')
      this.startMin = start[0] * 60 + parseInt(start[1])
      this.endMin = end[0] * 60 + parseInt(end[1])
      let startCalc, endCalc
      if (this.startMin > this.endMin) {
        startCalc = this.calcValueForSchedule(this.startMin, 720)
        endCalc = this.calcValueForSchedule(this.endMin, 720)
        this.changeTimeInScale()
        this.value = [startCalc, endCalc]
      } else {
        startCalc = this.calcValueForSchedule(this.startMin, 0)
        endCalc = this.calcValueForSchedule(this.endMin, 0)
        this.value = [startCalc, endCalc]
      }
    },
    calcValueForSchedule (val, offset) {
      let newVal = val + offset
      if ((val % 60) === 0) {
        if (newVal > 1440) {
          newVal = (newVal - 1440) / 60
        } else {
          newVal = newVal / 60
        }
        return newVal
      } else {
        let remainder = newVal % 60
        if (newVal > 1440) {
          newVal = (newVal - remainder - 1440) / 60
          remainder = remainder / 60
          newVal = newVal + remainder
        } else {
          newVal = (newVal - remainder) / 60
          remainder = remainder / 60
          newVal = newVal + remainder
        }
        return newVal
      }
    },
    changeTimeInScale () {
      this.marks = {
        0: '12:00',
        4: '16:00',
        8: '20:00',
        12: '00:00',
        16: '04:00',
        20: '08:00',
        24: '12:00'
      }
    },
    formatTooltip (val) {
      console.log(this.value)
      let newVal
      if (this.startMin > this.endMin) {
        newVal = val * 60 + 720
      } else {
        newVal = val * 60
      }
      if ((newVal % 60) === 0) {
        if (newVal > 1440) {
          newVal = (newVal - 1440) / 60
        } else {
          newVal = newVal / 60
        }
        return newVal + ':00'
      } else {
        const remainder = newVal % 60
        if (newVal > 1440) {
          newVal = (newVal - remainder - 1440) / 60
        } else {
          newVal = (newVal - remainder) / 60
        }
        return newVal + ':' + remainder
      }
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
