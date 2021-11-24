import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { Input, Tooltip, Popover, Checkbox, Button, Link, Avatar } from 'element-ui'
import Vue from 'vue'
import BaseInput from '@/components/Inputs/BaseInput.vue'
import NavItem from '@/components/NavItem.vue'
import 'element-ui/lib/theme-chalk/index.css'

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