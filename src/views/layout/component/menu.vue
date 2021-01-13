<template>
  <div :class="{ wrapper: true, 'min-width': $store.state.collapsed }">
    <a-menu
      :default-selected-keys="[defaultSelectedKeys]"
      :default-open-keys="[defaultOpenKeys]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.collapsed"
    >
      <template v-for="route in $store.state.menuRoutes">
        <a-sub-menu :key="route.name" v-if="route.meta.show">
          <span slot="title"
            ><a-icon :type="route.meta.icon" />
            <span>{{ route.meta.title }}</span>
          </span>
          <template v-for="child in route.children">
            <a-menu-item v-if="child.meta.show" :key="child.name">
              <router-link class="router-link" :to="{ name: child.name }">
                <a-icon :type="child.meta.icon" />
                <span>{{ child.meta.title }}</span>
              </router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
export default {
  computed: {
    defaultSelectedKeys() {
      return this.$router.currentRoute.matched[1]
        ? this.$router.currentRoute.matched[1].name
        : "";
    },
    defaultOpenKeys() {
      return this.$router.currentRoute.matched[0].name;
    },
  },
  data() {
    return {};
  },
  created() {
  },
};
</script>

<style lang='less' scoped>
@import url("~@/styles/home/menu.less");
</style>