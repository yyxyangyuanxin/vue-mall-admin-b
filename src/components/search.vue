<template>
  <a-form-model
    layout="inline"
    :model="searchForm"
    @submit="handleSubmit"
    @submit.native.prevent
  >
    <a-form-model-item label="搜索关键字">
      <a-input v-model="searchForm.search" placeholder="请输入关键字" style="width: 180px;">
        <a-icon
          slot="prefix"
          type="search"
          style="color: rgba(0, 0, 0, 0.25)"
        />
      </a-input>
    </a-form-model-item>
    <a-form-model-item label="商品类目">
      <a-select
        show-search
        placeholder="请选择商品类目"
        style="width: 150px"
        @change="handleChange"
        allowClear
      >
        <a-select-option v-for="c in categoryList" :key="c.id" :value="c.id">{{ c.name }}</a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item>
      <a-button type="primary" html-type="submit"> 搜索 </a-button>
    </a-form-model-item>
    <a-button class="productAddBtn"><router-link :to="{name:'ProductAdd'}">添加商品</router-link></a-button>
  </a-form-model>
</template>
<script>
export default {
  data() {
    return {
      searchForm: {
        search: "",
        category: ""
      }
    };
  },
  props: ["categoryList"],
  methods: {
    handleSubmit(e) {
      this.$emit('submit', this.searchForm)
    },
    handleChange(value) {
      this.searchForm.category = value;
    },
  },
};
</script>
<style lang='less' scoped>
.ant-form {
  display: flex;
  align-content: center;
  .ant-form-item{
    padding-left: 30px;
  }
  .productAddBtn{
    position: absolute;
    right: 50px;
    height: 34px;
    margin-top: 3px;
  }
}
</style>