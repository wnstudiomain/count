<template>
  <div class="navbar-shields">
    <ul class="list-group shield-list">
      <li
        v-for="shield in shields"
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
        <span>г. Курск, ул. Уфимцева 1</span>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: {
    shields: Array
  },
  data () {
    return {
      error: null,
      title: ''
    }
  }
}

</script>
