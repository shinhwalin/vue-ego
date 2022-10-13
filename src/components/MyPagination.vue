<template>
  <div class="pagedef">
    <el-pagination
      background
      layout="total,prev, pager, next, jumper"
      :total="total"
      :page-size="pageSize"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    changePage(page) {
      this.$emit("changePage", page);
    },
  },
};
</script>

<style lang="less" scoped>
.pagedef {
  text-align: center;
  margin: 20px;
}
</style>
