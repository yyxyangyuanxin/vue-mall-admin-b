<template>
  <div class="wrapper">
    <div class="left-menu">
      <left-menu :key="key" />
    </div>
    <div class="right-container">
      <sider-nav />
      <div :class="{'router-view': true, 'max-width': $store.state.collapsed}">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import leftMenu from "./component/menu.vue";
import siderNav from "./component/siderNav.vue";
export default {
  components: {
    leftMenu,
    siderNav,
  },
  data() {
    return {
      key: new Date().getTime()
    }
  },
  watch: {
    $route(){
      this.key = new Date().getTime();
    }
  }
};
</script>

<style lang='less' scoped>
@import url("~@/styles/home/index.less");
</style>