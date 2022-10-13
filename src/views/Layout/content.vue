<template>
  <div>
    <div class="header">
      <i
        v-if="!isCollapse"
        @click="changeMenu"
        class="iconfont icon-right-indent"
      ></i>
      <i v-else @click="changeMenu" class="iconfont icon-left-indent"></i>
      <div class="header-right">
        <div>下拉菜单</div>
        <div class="user">
          欢迎xxx
          <span>退出登录</span>
        </div>
      </div>
    </div>
    <!--内容区域--路由出口-->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  props: ["isCollapse"],
  methods: {
    changeMenu() {
      //修改父亲组件的数据 isCollapse
      this.$emit("chengeCollapse");
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  height: 50px;
  line-height: 50px;
  color: #fff;
  background: skyblue;
  .iconfont {
    font-size: 24px;
  }
  .header-right {
    float: right;
    margin-right: 20px;
    display: flex;
    .user {
      margin-left: 20px;
    }
  }
}
</style>
