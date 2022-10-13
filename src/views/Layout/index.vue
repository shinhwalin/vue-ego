<template>
  <div class="layout">
    <!--左侧导航区域-->
    <Mymenu class="menu" :isCollapse="isCollapse" />
    <!--右侧内容区域-->
    <Content
      class="content"
      :class="{ isActive: isCollapse }"
      @chengeCollapse="chengeCollapse"
      :isCollapse="isCollapse"
    />
  </div>
</template>

<script>
import Content from "./content";
import Mymenu from "./Mymenu";
export default {
  components: {
    Mymenu,
    Content,
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    chengeCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>
<style lang="less" scoped>
.layout {
  .menu {
    //width: 200px;
    //min-height: 500px;
    background: #1b3554;
    position: fixed;
    top: 0;
    bottom: 0;
  }
  .content {
    margin-left: 200px;
  }
  .isActive {
    margin-left: 64px;
  }
}
</style>
