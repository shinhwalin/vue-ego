<template>
  <div>
    <!--
      :props="props"  Tree的数据
      :load="loadNode"
      lazy  --懒加载 自动调用 :load="loadNode" 制定方法
      show-checkbox --选择框
      @check-change="handleCheckChange"   
      accordion 是否每次只打开一个同级树节点展开
    -->
    <el-tree
      :props="props"
      :load="loadNode"
      lazy
      @check-change="handleCheckChange"
      accordion
      @node-click="nodeClick"
    >
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: "name",
        children: "zones",
      },
      count: 1,
    };
  },
  methods: {
    /**
     * 点击tree获取数据
     * @param {} data
     * @param {*} checked
     * @param {*} indeterminate
     */
    nodeClick(data, node) {
      //传递数据至父组件
      this.$emit("sendTreeData", data);
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    loadNode(node, resolve) {
      //resolve 成功返回数据结果，是个方法，方法返回的对象
      console.log("load-自动执行", node);
      if (node.level === 0) {
        //进入页面获取第一层的tree数据
        this.$api.selectCategory().then((res) => {
          //console.log(res.data);
          return resolve(res.data.result);
        });
      }
      if (node.level >= 1) {
        //请求当前点击tree节点下面的数据
        //node.data.cid
        this.$api
          .selectCategory({
            id: node.data.cid,
          })
          .then((res) => {
            //if()
            console.log(res.data);
            if (res.data.status === 200) {
              return resolve(res.data.result);
            } else {
              return resolve([]);
            }
          });
      }
    },
  },
};
</script>

<style></style>
