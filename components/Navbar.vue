<template>
  <div>
    <nav class="uk-navbar-container uk-navbar" uk-navbar>
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
                  <nuxt-link class="navbar-item" to="/users/profile">
                    My Profile
                  </nuxt-link>
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
    </nav>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

export default {
  methods: {
    async logout () {
      await this.$auth.logout()
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  }
}

</script>
