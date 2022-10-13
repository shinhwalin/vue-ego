<template>
  <div>
    <!-- ref 获取DOM参数
    点击已上传的文件时的钩子 :on-preview="handlePreview" function(file) 
    on-remove="handleRemove"删除文件::
    on-remove	文件列表移除文件时的钩子
    auto-upload 自动上传
    on-success	文件上传成功时的钩子
    on-error	文件上传失败时的钩子
    on-progress	文件上传时的钩子
    file-list	上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
    -->
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="url"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="successUpload"
      :file-list="fileList"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
    </el-upload>
  </div>
</template>

<script>
import base from "../../api/base";
export default {
  data() {
    return {
      url: base.uploadUrl, //图片服务器的地址
      fileList: [],
    };
  },
  methods: {
    //上传成功后调用
    successUpload(response, file, fileList) {
      console.log("上传成功", response, file, fileList);
      this.$message({
        showClose: true,
        message: "上传成功",
        type: "success",
      });
      this.fileList = [];
      //将成功结果返回父组件
      let imgUrl = response.name; //response.url.replace("\\","/");
      let url = response.url.replace("\\", "/");
      this.$emit("sendImg", { url, imgUrl });
    },
    //点击上传按钮调用的
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>

<style></style>
