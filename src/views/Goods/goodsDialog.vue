<template>
  <div class="dialog">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="closeDialog"
    >
      <el-form
        :model="goodsForm"
        :rules="rules"
        ref="goodsForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="类目选择" prop="category">
          <el-button type="primary" @click="innerVisible = true"
            >类目选择</el-button
          >
          <span>{{ goodsForm.category }}</span>
        </el-form-item>
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="goodsForm.title"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="goodsForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="num">
          <el-input v-model="goodsForm.num"></el-input>
        </el-form-item>
        <el-form-item label="商品卖点" prop="sellPoint">
          <el-input v-model="goodsForm.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="image">
          <el-button type="primary" @click="innerVisibleImg = true"
            >上传图片</el-button
          >
          <span>{{ goodsForm.image }}</span>
          <!-- <img :src="goodsForm.image" alt="">-->
        </el-form-item>
        <el-form-item label="商品描述" prop="descs">
          <WangEditor ref="wangeditor" @sendEditor="sendEditor" />
        </el-form-item>
        <!--
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确定</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        -->
      </el-form>
      <!--底部信息-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="submitForm">提交表单</el-button>
      </span>
      <!--1，内弹框，类目选择-->
      <el-dialog
        width="40%"
        title="类目选择"
        :visible.sync="innerVisible"
        append-to-body
      >
        <TreeGoods @sendTreeData="sendTreeData" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="showTreeData">确 定</el-button>
        </span>
      </el-dialog>
      <!--2，内弹框，上传图框-->
      <el-dialog
        width="40%"
        title="上传图片"
        :visible.sync="innerVisibleImg"
        append-to-body
      >
        <uplogImg @sendImg="sendImg" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisibleImg = false">取 消</el-button>
          <el-button type="primary" @click="showImg">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import TreeGoods from "./TreeGoods.vue";
import uplogImg from "./uplogImg.vue";
import wangEditor from "./wangEditor.vue";
import WangEditor from "./wangEditor.vue";
//dialogVisible = false
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    rowData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  components: {
    TreeGoods,
    uplogImg,
    wangEditor,
    WangEditor,
  },
  data() {
    return {
      dialogVisible: false, //外弹框
      innerVisible: false, //内弹框
      innerVisibleImg: false, //图片内弹框
      imgUrl: "",
      url: "",
      treeData: {}, //子组件数据
      goodsForm: {
        id: "",
        //表单大容器，是个对象
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        image: "",
        descs: "",
        category: "",
        date1: "",
        date2: "",
        cid: "",
      },
      rules: {
        //校验规则
        title: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        num: [{ required: true, message: "请输入数量", trigger: "blur" }],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
      },
    };
  },
  watch: {
    rowData(val) {
      this.goodsForm = val;
      //异步添加
      this.$nextTick(() => {
        this.$refs.wangeditor.html = this.goodsForm.descs;
      });
    },
  },
  methods: {
    /**
     * 接受富文本编辑器数据
     */
    sendEditor(val) {
      this.goodsForm.descs = val;
      console.log("接收到的数据", this.goodsForm.descs);
    },
    /**
     * 显示图片
     */
    showImg() {
      this.goodsForm.image = this.imgUrl;

      this.innerVisibleImg = false;
    },
    /**
     * 显示文件地址
     */
    sendImg(val) {
      console.log("转换后的地址", val);
      this.imgUrl = val.imgUrl;
      this.url = val.url;
    },
    /**
     * 内层弹框点击确认展示对应数据
     */
    showTreeData() {
      //resetForm('goodsForm');
      this.innerVisible = false;
      //显示tree数据
      this.goodsForm.category = this.treeData.name;
      this.goodsForm.cid = this.treeData.cid;
    },
    /**
     * 接受子组件数据
     */
    sendTreeData(data) {
      console.log("fuzujian", data);
      this.treeData = data;
    },
    closeDialog() {
      this.resetForm();
    },
    submitForm() {
      this.$refs.goodsForm.validate((valid) => {
        if (valid) {
          console.log("获取所有数据", this.goodsForm);
          let { title, price, num, sellPoint, descs, category, cid } =
            this.goodsForm;
          let image = this.url;
          let id = this.goodsForm.id;
          if (this.title === "添加商品") {
            console.log("添加商品");
            this.$api
              .addGoods({
                title,
                price,
                num,
                sellPoint,
                image,
                descs,
                category,
                cid,
              })
              .then((res) => {
                console.log("通讯结束后的数据", res);
                if (res.data.status === 200) {
                  //添加成功
                  //2.更新父组件列表数据
                  this.$parent.pageTableInit(1, "");
                  //3.提示框展示
                  this.$message({
                    showClose: true,
                    message: "添加成功",
                    type: "success",
                  });
                  //清空表单， 4.1elemetUi里面充值表单，  4.2  自己手动初始化goodsFrom
                  this.resetForm();
                } else {
                  //添加失败
                  this.$message({
                    showClose: true,
                    message: "添加失败",
                    type: "success",
                  });
                }
              });
          } else {
            console.log("修改商品");
            this.$api
              .updateGoods({
                id,
                title,
                price,
                num,
                sellPoint,
                image,
                descs,
                category,
                cid,
              })
              .then((res) => {
                console.log("通讯结束后的数据", res);
                if (res.data.status === 200) {
                  //添加成功
                  //2.更新父组件列表数据
                  this.$parent.pageTableInit(1, "");
                  //3.提示框展示
                  this.$message({
                    showClose: true,
                    message: "修改商品成功",
                    type: "success",
                  });
                  //清空表单， 4.1elemetUi里面充值表单，  4.2  自己手动初始化goodsFrom
                  this.resetForm();
                } else {
                  //添加失败
                  this.$message({
                    showClose: true,
                    message: "修改失败",
                    type: "success",
                  });
                }
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * 清空表单数据
     */
    resetForm() {
      //this.$refs['goodsForm'].resetFields();
      //this.$refs.goodsForm.resetFields();
      this.goodsForm = {
        id: "",
        //表单大容器，是个对象
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        image: "",
        descs: "",
        category: "",
        date1: "",
        date2: "",
        cid: "",
      };
      //4.2清空富编辑器
      this.$refs.wangeditor.html = "";
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.dialog {
  margin-left: 300px;
}
</style>
