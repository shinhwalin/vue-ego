<template>
  <div class="goods">
    <!--1，搜索区域-->
    <div class="header">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="primary" @click="btnSearchGoods">查询</el-button>
      <el-button type="primary" @click="gotoAddGoods">
        <router-link class="addBtn" to="/add-goods">页面添加</router-link>
      </el-button>
      <el-button type="primary" @click="addGoodsDialog">弹框添加</el-button>
    </div>
    <!--2，表格区域展示视图数据-->
    <div class="wrapper">
      <el-table class="goodsTable" :data="tableData" style="width: 100%" border>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          prop="id"
          label="商品ID"
          width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="title"
          label="商品名称"
          width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="price"
          label="商品价格"
          width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          v-if="true"
          prop="num"
          label="商品数量"
          width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="category"
          label="规格类目"
          width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="image" label="商品图片" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="sellPoint"
          label="商品卖点"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="descs" label="商品描述" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" width="145">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
              编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >
              删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--3，分页-->
    <MyPagination
      :total="total"
      :pageSize="pageSize"
      @changePage="changePage"
    />

    <!--4，弹框组件,操作子组件方式：1-传参prop，2-ref获取子组件对象，3-children-->
    <!--<goodsDialog :dialogVisible="dialogVisible" @changeDialog="changeDialog" />-->
    <goodsDialog ref="dialog" :title="title" :rowData="rowData" />
  </div>
</template>

<script>
import MyPagination from "../../components/MyPagination.vue";
import goodsDialog from "./goodsDialog.vue";
export default {
  components: {
    MyPagination,
    goodsDialog,
  },
  data() {
    return {
      input: "",
      tableData: [],
      total: 10,
      pageSize: 1,
      dialogVisible: false,
      title: "添加商品",
      rowData: {}, //当前行数据，为对象
    };
  },
  methods: {
    btnSearchGoods() {
      this.pageTableInit(1, this.input);
    },
    //接受弹框接受函数
    changeDialog() {
      //this.dialogVisible = false;
    },
    //弹框添加商品
    addGoodsDialog() {
      this.$refs.dialog.dialogVisible = true;
      this.title = "添加商品";
      //this.dialogVisible = true;
    },
    //跳转页面条件
    gotoAddGoods() {
      //指定跳转地址
      this.$router.replace("/add-goods");
    },
    //编辑列表信息
    handleEdit(index, row) {
      //通信获取,将当前行数据赋值到弹框上
      this.$refs.dialog.dialogVisible = true;
      this.title = "编辑商品";
      this.rowData = { ...row };
    },
    //删除选中列表信息
    handleDelete(index, row) {
      //console.log('删除数据', index,row);
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //通信删除
          let id = row.id;
          this.$api.deleteGoods({ id }).then((res) => {
            if (res.data.status === 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              //更新列表数据
              this.pageTableInit(1, this.input);
            } else {
              this.$message({
                type: "success",
                message: "删除失败!",
              });
            }
          });
        })
        .catch(() => {
          //取消删除
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //页码更新操作
    changePage(num) {
      this.pageTableInit(num);
    },
    //商品列表获取
    pageTableInit(page, name) {
      this.$api
        .getGoodsList({
          page,
          name,
        })
        .then((res) => {
          console.log(res.data);
          console.log(res.data.status);
          console.log(res.data.data);
          if (res.data.status === 200) {
            this.tableData = res.data.data; //数据列表
            this.total = res.data.total;
            this.pageSize = res.data.pageSize;
          }
        });
    },
  },
  //生命周期函数
  mounted() {
    this.pageTableInit(1, "");
  },
};
</script>

<style lang="less" scoped>
.goods {
  margin: 20px;
}
.header {
  display: flex;
  button {
    margin-left: 20px;
  }
}
.wrapper {
  margin: 20px 0;
}
.addBtn {
  color: white;
}
</style>
