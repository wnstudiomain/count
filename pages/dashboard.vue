<template>
  <div class="main dashboard">
    <p>DESCRIPTION: {{ $route.name }}</p>
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
    console.log(this.$store.state.elist)
    this.$store.dispatch('elist/fetchSheilds')
  }
}
</script>
