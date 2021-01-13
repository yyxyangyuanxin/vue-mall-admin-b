<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :pagination="pagination"
    @change="pageChange"
  >
    <div slot="operation" slot-scope="text, record">
      <a-button class="editBtn" @click="editProduct(record)">编辑</a-button>
      <a-button class="delBtn" @click="deleteProduct(record)">删除</a-button>
    </div>
  </a-table>
</template>
<script>
import api from '@/api/product.js'
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
    ellipsis: true,
  },
  {
    title: "描述",
    dataIndex: "desc",
    key: "desc",
    ellipsis: true,
  },
  {
    title: "类目",
    dataIndex: "categoryName",
    key: "category",
    ellipsis: true,
  },
  {
    title: "预售价格",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "折扣价格",
    dataIndex: "price_off",
    key: "price_off",
  },
  {
    title: "标签",
    dataIndex: "tags",
    key: "tags",
  },
  {
    title: "限制购买数量",
    dataIndex: "inventory",
    key: "inventory",
  },
  {
    title: "上架状态",
    dataIndex: "status",
    key: "status",
    customRender(text, record) {
      return record.status === 1 ? "上架" : "下架";
    },
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    scopedSlots: { customRender: "operation" },
  },
];
export default {
  data() {
    return {
      columns,
    };
  },
  props: ["data", "pagination"],
  methods: {
    pageChange(page) {
      this.$emit("pageChange", page);
    },
    editProduct(record) {
      this.$emit('edit', record);
    },
    deleteProduct(record) {
      this.$emit('delete', record);
    },
  },
};
</script>
<style lang="less" scoped>
  .delBtn{
    margin-left: 5px;
  }
</style>