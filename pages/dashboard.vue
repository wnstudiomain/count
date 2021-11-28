<template>
  <div class="main">
    <div class="container-fluid dashboard">
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
            v-for="shield in elist"
            :key="shield.id"
            xl="3"
            class="d-flex align-items-center shield-item"
          >
            <div class="shield-item__wrapper">
              <div class="shield-item__title">
                <h5>{{ shield.name }}</h5>
                <div class="shield-item__status">
                  <span v-if="shield.is_enabled == true" class="online">Online</span>
                  <span v-else class="offline">Offline</span>
                </div>
                <el-tooltip :content="shield.telemetry_current[0].controller.measurements[0].parameters.gsm_signal_strength_decibel_milliwatts[1].value + ' dB'" placement="top">
                  <img class="shield-item__image-signal" src="/signal-bars.png">
                </el-tooltip>
              </div>
              <div class="shield-item__detail">
                <span>Счетчик № {{ shield.meter_serial_number }}</span>
              </div>
              <div class=""></div>
            </div>
          </b-col>
        </b-row>
      </div>
      <!-- <ul class="list-group">
        <li
          v-for="shield in elist"
          :key="shield.id"
          class="list-group-item"
        >
          <nav-item
            :link="{
              name: 'Шкаф ' + shield.name,
              multiply: true,
              icon: 'el-icon-s-grid',
              params: {
                url: 'shield-path',
                id: shield.id,
                path: shield.name,
              }
            }"
          />
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  layout: 'content',
  data () {
    return {
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
  mounted () {
    this.$store.dispatch('elist/fetchSheilds')
  }
}
</script>
