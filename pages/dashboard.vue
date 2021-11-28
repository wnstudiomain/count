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
      <ul class="list-group">
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
      </ul>
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
    console.log(this.$store.state.elist)
  }
}
</script>
