<template>
  <div class="wrapper">
    <!-- 搜索 -->
    <search
      class="search"
      @submit="searchSubmit"
      :categoryList="categoryList"
    />
    <!-- 表格 -->
    <product-table
      class="product-table"
      :data="tableData"
      :pagination="pagination"
      @pageChange="pageChange"
      @edit="editProduct"
      @delete="deleteProduct"
    />
  </div>
</template>

<script>
import categoryApi from "@/api/category.js";
import search from "@/components/search.vue";
import productTable from "@/components/productTable.vue";
import api from "@/api/product.js";
export default {
  components: {
    search,
    productTable,
  },
  data() {
    return {
      tableData: [],
      searchForm: null,
      categoryList: [],
      categoryObj: {},
      pagination: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1,
      },
    };
  },
  async created() {
    await categoryApi.list().then((result) => {
      this.categoryList = result.data;
      result.data.forEach((item) => {
        this.categoryObj[item.id] = item;
      });
    });
    this.getTableData();
  },
  methods: {
    searchSubmit(from) {
      this.searchForm = from;
      this.getTableData();
    },
    // 获取表格数据
    getTableData() {
      api
        .list({
          page: this.pagination.current,
          size: this.pagination.pageSize,
          ...this.searchForm,
        })
        .then(result => {
          this.pagination.total = result.total;
          this.tableData = result.data.map((item) => {
            return {
              ...item,
              categoryName: this.categoryObj[item.category].name,
              key: item.id,
            };
          });
        });
    },
    // 表格数据发生改变时的处理函数
    pageChange(page) {
      this.pagination.current = page.current;
      this.getTableData();
    },
    // 点击编辑按钮
    editProduct(record) {
      this.$router.push({
        name: "ProductEdit",
        params: {
          id: record.id,
        },
      });
    },
    // 点击删除按钮
    deleteProduct(record) {
      this.$confirm({
        title: "确认删除？",
        content: `确认删除产品标题为:"${record.title}"的商品吗?`,
        okText: "确认",
        okType: "danger",
        cancelText: "取消",
        onOk: () => {
          api.delete({
            id: record.id
          }).then(() => {
            this.getTableData();
          })
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
  },
};
</script>

<style lang='less' scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  .search {
    margin-top: 10px;
  }
  .product-table {
    margin-top: 30px;
    padding: 0 20px;
  }
}
</style>