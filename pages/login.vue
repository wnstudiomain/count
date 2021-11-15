<template>
  <div class="login-page bg-default">
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <img class="logo" src="/swsunew.svg">
            </b-col>
          </b-row>
        </div>
      </b-container>
      <Notification v-if="error" :message="error" />
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon class="fill-default" points="2560 0 2560 100 0 100" />
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <b-container class="mt--12 d-flex align-items-center justify-content-center">
      <b-row class="login-wrapper justify-content-center">
        <b-col>
          <b-card no-body class="login-form border-0 mb-0">
            <b-card-header class="bg-transparent pb-3 pt-4">
              <div class="title text-center mt-2 mb-3">
                Личный кабинет
              </div>
              <p class="text-center">
                Введите ниже свой логин и пароль
              </p>
            </b-card-header>
            <b-card-body class="px-lg-5 py-lg-5">
              <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input
                    v-model="model.email"
                    name="Email"
                    :rules="{required: true, email: true}"
                    prepend-icon="el-icon-user"
                    placeholder="Введите email"
                  />
                  <base-input
                    v-model="model.password"
                    name="Пароль"
                    type="password"
                    :rules="{required: true, min: 6}"
                    prepend-icon="el-icon-lock"
                    placeholder="Введите пароль"
                  />
                  <el-checkbox v-model="model.rememberMe">
                    Запомнить меня
                  </el-checkbox>
                  <div class="text-center">
                    <el-button type="primary" class="my-4" native-type="submit">
                      Войти
                    </el-button>
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import { messages } from 'vee-validate/dist/locale/ru.json'
import Notification from '~/components/Notification'

Object.keys(rules).forEach((rule) => {
  extend(rule, {
    // eslint-disable-next-line import/namespace
    ...rules[rule], // copies rule configuration
    message: messages[rule] // assign message
  })
})

export default {
  components: {
    Notification
  },

  data () {
    return {
      model: {
        email: '',
        password: '',
        rememberMe: false
      },
      error: null
    }
  },
  mounted () {
    if (this.$auth.loggedIn) {
      this.$router.push({ name: '/dashboard', params: { title: 'Мониторинг' } })
    }
  },
  methods: {
    async onSubmit () {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.model.email,
            password: this.model.password
          }
        })
        /* eslint-disable no-console */
        this.$router.push({ name: 'dashboard', params: { title: 'Мониторинг' } })
      } catch (e) {
        console.log(e)
        this.error = e.response.data.message
      }
    }
  }
}
</script>
