<template>
  <div :class="{ wrapper: true, 'max-width': $store.state.collapsed }">
    <!-- 菜单栏显示隐藏按钮 -->
    <a-button type="primary" class="show-btn" @click="toggleCollapsedActions()">
      <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <!-- 面包屑 -->
    <a-breadcrumb>
      <a-breadcrumb-item href="">
        <a-icon :type="currentRoute[0].meta.icon" />
        <span> {{ currentRoute[0].meta.title }}</span>
      </a-breadcrumb-item>
      <a-breadcrumb-item href="">
        <a-icon :type="currentRoute[1].meta.icon" />
        {{ currentRoute[1].meta.title }}
      </a-breadcrumb-item>
    </a-breadcrumb>
    <!-- 用户信息 -->
    <div class="user-info">
      <div class="user-info-item">
        {{ $store.state.user.username }}
        <div class="exit-btn" @click="exitLoginActions()">退出</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentRoute: this.$router.currentRoute.matched
    };
  },
  methods: {
    toggleCollapsedActions() {
      this.$store.dispatch("toggleCollapsed");
    },
    exitLoginActions() {
      this.$store.dispatch("exitLogin");
      this.$router.push("/login");
    },
  },
  watch: {
    $route() {
      this.currentRoute = this.$router.currentRoute.matched;
    }
  }
};
</script>

<style lang='less' scoped>
@import url("~@/styles/home/siderNav.less");
</style>