<template>
  <div>
  <div class="block">
    <span class="demonstration">默认</span>
    <el-date-picker
      v-model="value1"
      type="monthrange"
      range-separator="至"
      start-placeholder="开始月份"
      end-placeholder="结束月份"
      value-format="yyyy-MM">
    </el-date-picker>
  </div>
  <el-button type="primary" @click="queding">确 定</el-button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      value1:"",
    }
  },
  methods:{
    queding(){
      console.log(this.value1[0]);
      console.log(this.value1[1]);
    }
  }
};
</script>

<style lang="less" scoped>
  .el-row {
    margin-left: 60px;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
