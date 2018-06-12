<template>
  <el-dialog title="系统图库" :visible.sync="dialogShow" width="705px" center class="post-wrap">
    <div class="gallery">
      <img v-for="(img,index) in systemGalleryList" :key="index" :src="img" @click="selectImage(img)"/>
    </div>
  </el-dialog>
</template>

<script>
  import { basicHttp } from "../../router/api.js"

  export default {
    name: "PosterSelector",
    props: {
      show: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        dialogShow: false,
        systemGalleryList: [],
      }
    },
    watch: {
      show(val) {
        this.dialogShow = val;
      },
      dialogShow(val) {
        if (!val) {
          this.$emit("close");
        }
      }
    },
    methods: {
      selectImage(img) {
        this.dialogShow = false;
        this.$emit("result", img);
      }
    },
    created() {
      var _self = this;
      //拉取系统图库
      basicHttp({
        method: 'get',
        url: '/event/gallery/system'
      }, function (response) {
        _self.systemGalleryList = response.data.data;
      });
    }
  }
</script>

<style>
  .post-wrap .el-dialog--center .el-dialog__body {
    padding-right: 0;
    height: 509px;
    overflow: hidden;
    overflow-y: auto;
    padding-top: 0;

  }
  .post-wrap .el-dialog__header {
    border-bottom: 1px solid #d0d0ce;
    margin-bottom: 20px;
  }
</style>
<style scoped lang="less">
  .gallery {
    width: 100%;

    img {
      width: 200px;
      margin-right: 20px;
      margin-bottom: 20px;
      height: 150px;
    }
  }
</style>
