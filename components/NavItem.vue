<template>
  <nuxt-link
    :is="baseComponent"
    :to="link.multiply ? { name: link.params.url, params: {id: link.params.id, path: link.params.path, title: link.params.path}} : link.path"
    class="nav-item"
    :class="{ active: isActive }"
    @click.prevent="collapseMenu"
  >
    <span v-if="link.onlyIcon">
      <i :class="link.icon" />
    </span>
    <span v-else>
      <i v-if="link.icon" :class="link.icon" /> {{ link.name }}
    </span>

    <collapse-transition>
      <div
        v-if="$slots.default || isMenu"
        v-show="!collapsed"
        class="collapse show"
      >
        <ul class="nav nav-sm flex-column">
          <slot />
        </ul>
      </div>
    </collapse-transition>
  </nuxt-link>
</template>
<script>
import { CollapseTransition } from 'vue2-transitions'

export default {
  name: 'NavItem',
  components: {
    CollapseTransition
  },
  props: {
    menu: {
      type: Boolean,
      default: false,
      description:
        "Whether the item is a menu. Most of the item it's not used and should be used only if you want to override the default behavior."
    },
    link: {
      type: Object,
      default: () => {
        return {
          name: '',
          path: '',
          multiply: false,
          onlyIcon: false,
          params: Object,
          children: []
        }
      },
      description:
        'Sidebar link. Can contain name, path, icon and other attributes. See examples for more info'
    }
  },
  data () {
    return {
      children: [],
      collapsed: true
    }
  },
  computed: {
    baseComponent () {
      return this.isMenu || this.link.isRoute ? 'li' : 'router-link'
    },
    isMenu () {
      return this.children.length > 0 || this.menu === true
    },
    isActive () {
      if (this.$route && this.$route.path) {
        const matchingRoute = this.children.find(c =>
          this.$route.path.startsWith(c.link.path)
        )
        if (this.$route.path.startsWith(this.link.path)) {
          return true
        }
        if (matchingRoute !== undefined) {
          return true
        }
      }
      return false
    }
  },
  mounted () {
    if (this.link.collapsed !== undefined) {
      this.collapsed = this.link.collapsed
    }
    if (this.isActive && this.isMenu) {
      this.collapsed = false
    }
  },
  destroyed () {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
    if (this.removeLink) {
      this.removeLink(this)
    }
  },
  methods: {
    addChild (item) {
      const index = this.$slots.default.indexOf(item.$vnode)
      this.children.splice(index, 0, item)
    },
    removeChild (item) {
      const tabs = this.children
      const index = tabs.indexOf(item)
      tabs.splice(index, 1)
    },
    linkAbbreviation (name) {
      const matches = name.match(/\b(\w)/g)
      return matches.join('')
    },
    collapseMenu () {
      this.collapsed = !this.collapsed
    },
    collapseSubMenu (link) {
      link.collapsed = !link.collapsed
    }
  }
}
</script>
<style>
.sidebar-menu-item {
  cursor: pointer;
}
</style>
