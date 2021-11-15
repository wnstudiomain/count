<template>
  <div class="content">
    <Navbar />
    <LeftNavbar />
    <FadeTransition :duration="200" mode="out-in" />
    <nuxt />
  </div>
</template>
<script>
import { FadeTransition } from 'vue2-transitions'
import Navbar from '~/components/Navbar'
import LeftNavbar from '~/components/LeftNavbar'
export default {
  components: {
    FadeTransition,
    Navbar,
    LeftNavbar
  },
  middleware: 'auth'
}
</script>
<style></style>
