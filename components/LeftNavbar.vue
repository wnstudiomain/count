<template>
  <div class="left-navbar">
    <ul class="list-group">
      <li class="list-group-item">
        <nav-item
          :link="{
            onlyIcon: true,
            name: 'Мониторинг',
            path: '/dashboard',
            icon: 'el-icon-monitor'
          }"
        />
      </li>
      <li class="list-group-item">
        <nav-item
          :link="{
            name: 'Шкафы управления',
            onlyIcon: true,
            multiply: true,
            icon: 'el-icon-cpu',
            params: {
              url: 'shield-path',
              id: '1',
              path: 'TP-01',
            }
          }"
        />
      </li>
      <li class="list-group-item">
        <nav-item
          :link="{
            onlyIcon: true,
            name: 'Карта',
            path: '/map',
            icon: 'el-icon-map-location'
          }"
        />
      </li>
      <li class="list-group-item">
        <nav-item
          :link="{
            onlyIcon: true,
            name: 'Настройки',
            path: '/settings',
            icon: 'el-icon-setting'
          }"
        />
      </li>
    </ul>
  </div>
</template>

<script>

export default {
}

</script>
