import createPersistedState from 'vuex-persistedstate'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { Input, Tooltip, Popover, Checkbox, Button, Link, Avatar, Table, Switch, Slider } from 'element-ui'
import Vue from 'vue'
import VueLayers from 'vuelayers'
import 'vuelayers/dist/vuelayers.css' // needs css-loader
import { loadingBBox } from 'vuelayers/dist/ol-ext'
import BaseInput from '@/components/Inputs/BaseInput.vue'
import NavItem from '@/components/NavItem.vue'
import 'element-ui/lib/theme-chalk/index.css'

export default ({ store }) => {
  createPersistedState({
    key: 'enumData',
    paths: ['enumData']
  })(store)
}

/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

Vue.component(BaseInput.name, BaseInput)
Vue.component(NavItem.name, NavItem)
Vue.component(Input.name, Input)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.use(Tooltip)
Vue.use(Popover)
Vue.use(Checkbox)
Vue.use(Button)
Vue.use(Link)
Vue.use(Avatar)
Vue.use(Table)
Vue.use(Slider)
Vue.use(Switch)
Vue.use(VueLayers, {
  dataProjection: 'EPSG:4326'
})
Vue.use(loadingBBox)

Vue.prototype.$loadingBBox = () => {
  return loadingBBox
}
