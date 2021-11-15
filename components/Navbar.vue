<template>
  <div class="header-nav">
    <b-container fluid>
      <b-row>
        <b-col class="d-flex align-items-center">
          <b-img class="logo" fluid src="/swsunew.png" />
        </b-col>
        <b-col class="d-flex justify-content-end">
          <div v-if="isAuthenticated" class="d-inline-flex align-items-center mx-left-auto">
            <div class="d-flex align-items-center">
              <div class="login-info d-flex flex-column text-right mr-3">
                <span>{{ loggedInUser.fam }} {{ loggedInUser.name }}</span>
                <span>{{ loggedInUser.role_name }}</span>
              </div>
              <el-avatar :size="40" :src="circleUrl" />
            </div>
            <div class="ml-5 d-flex align-items-center">
              <span class="mr-2 f-bold">Выход</span>
              <el-button type="text" class="sign_out" icon="el-icon-switch-button" @click="logout" />
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <!-- <nav class="uk-navbar-container uk-navbar" uk-navbar>
      <div class="uk-navbar-left">
        <ul class="uk-navbar-nav">
          <li><a hef="#modal-full" uk-toggle><span uk-icon="icon: table" /></a></li>
          <li>
            <nuxt-link to="/">
              Strapi Blog
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="uk-navbar-right">
        <ul v-if="isAuthenticated" class="uk-navbar-nav">
          <li>
            <a>
              {{ loggedInUser.name }}
            </a>
            <div class="uk-navbar-dropdown">
              <ul class="uk-nav uk-navbar-dropdown-nav">
                <li>
                  <nav-item
                    :link="{
                      name: 'Мониторинг',
                      path: 'dashboard',
                    }"
                  />
                </li>
                <li>
                  <a class="navbar-item" @click="logout">Logout</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <ul v-else class="uk-navbar-nav">
          <li>
            <nuxt-link class="navbar-item" to="/register">
              Register
            </nuxt-link>
          </li>
          <li>
            <nuxt-link class="navbar-item" to="/login">
              Log In
            </nuxt-link>
          </li>
        </ul>
      </div>
    </nav> -->
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

export default {
  data () {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      squareUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
    }
  },
  methods: {
    async logout () {
      await this.$auth.logout()
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  }
}

</script>
