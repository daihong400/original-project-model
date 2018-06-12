<template>
  <div class="add-sponsor-wrap">
    <el-dialog title="主办方信息" :visible.sync="addSponsorDialog" width="50%" center>

      <el-form label-width="100px" ref="sponsorForm" :model="sponsorForm" :rules="rules" >
        <el-form-item label="主办方名称"  prop="name">
          <el-input v-model="sponsorForm.name" placeholder="请输入主办方名称"></el-input>
        </el-form-item>

        <!--<el-form-item label="主办方logo" class="sponsor-info-modal-logo">-->
          <!--<div class="logo-wrap">-->
            <!--<div class="logo-box">-->
              <!--<img src="" alt="">-->
            <!--</div>-->
            <!--<p>默认logo</p>-->
          <!--</div>-->
        <!--</el-form-item>-->


        <el-form-item label="官方网址" prop="url" class="clear-require">
          <el-input v-model="sponsorForm.url" placeholder="请输入官方网址（链接请添加网络协议http://或https://）"></el-input>
        </el-form-item>

        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="sponsorForm.phone" prefix-icon="el-icon-phone" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item label="" prop="email">
          <el-input v-model="sponsorForm.email" prefix-icon="el-icon-message" placeholder="邮箱"></el-input>
        </el-form-item>

        <el-form-item label="主办方简介" class="clear-require">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 10}"
            placeholder="请输入简介"
            v-model="sponsorForm.summary">
          </el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <button type="button"class="model-green-btn" @click="addSponsor()">保存</button>
        <button type="button"class="model-green-btn-right" @click="addSponsorDialog = false">取消</button>
          <!--<el-button type="primary" @click="addSponsor()">保存</el-button>-->
          <!--<el-button @click="addSponsorDialog = false">取消</el-button>-->
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import { basicHttp } from "../../router/api.js"

  export default {
    name: "AddSponsor",
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        addSponsorDialog: false,
        sponsorForm: {
          name: '',
          logo: '',
          url: '',
          phone: '',
          email: '',
          summary: ''
        },
        rules: {
          name: [
            {required: true, message: '主办方名称不能为空', trigger: 'blur'},
            {max: 50, message: "您输入的主办方名称太长", trigger: 'blur'}
          ],
          url: [
            // {required: false, message: '官方网址不能为空', trigger: 'blur'},
            {pattern: /http(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?/, message: '请填写正确的官方网址', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '联系电话不能为空', trigger: 'blur'},
            {min: 10, max: 12, message: '请填写正确的联系电话', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '邮箱不能为空', trigger: 'blur'},
            {type: 'email', message: '请填写正确的邮箱地址', trigger: 'blur'}
          ],
        },
      }
    },
    watch: {
      show(val) {
        this.addSponsorDialog = val;
      },
      addSponsorDialog(val) {
        if (!val) {
          this.$refs['sponsorForm'].resetFields();
          this.sponsorForm.summary = '';
          this.$emit("update:show", this.addSponsorDialog);
        }
      }
    },
    methods: {
      /**
       * 添加主办方
       */
      addSponsor() {
        var self = this;
        this.$refs['sponsorForm'].validate((valid) => {
          if(valid) {
            basicHttp({
              method: 'post',
              url: '/event/sponsor',
              data: self.sponsorForm
            }, function (response) {
              self.addSponsorDialog = false;
              self.$emit("new", response.data.data);
            }, function(response) {
              self.$alert(response.data.message, '操作失败', {confirmButtonText: '确定',});
            });
          }else {
            return false;
          }
        });
      }
    }
  }
</script>

<style>
  .el-form-item.sponsor-info-modal-logo label:after {
    content: '*';
    color: #f56c6c;
  }
  .add-sponsor-wrap .el-icon-phone:before, .el-icon-tickets:before,.el-icon-message:before {
    color: #03b02a;
  }
  .add-sponsor-wrap .el-dialog__header {
    border-bottom: 1px solid #d0d0ce ;
  }
  .add-sponsor-wrap .el-dialog__title {
    font-size: 18px;
    font-weight: bold;
  }
  .el-dialog__headerbtn .el-dialog__close {
    border: 1px solid #97999b;
    border-radius: 10px;
  }
  .el-dialog__headerbtn .el-icon-close:before {
    color: #97999b;
  }
  .el-dialog__headerbtn .el-icon-close:hover {
    color: #da291c;
    background-color: #ffffff;
    border: 1px solid #da291c;
  }
  .add-sponsor-wrap .el-button {
    padding: 18px 63px;
  }
  .add-sponsor-wrap label {
    position: absolute;
  }
  .add-sponsor-wrap .el-dialog--center .el-dialog__body {
    padding: 30px 80px 0;
  }
  .el-textarea__inner {
    background-color: #f6f6f6;
  }
  .el-dialog__footer {
    padding: 0 0 30px 0;
    box-sizing: border-box;
  }
  .el-form-item.clear-require .el-form-item__label:after {
    content: '';
  }
</style>
<style scoped lang="less" rel="stylesheet/less">
  .logo-wrap {
    display: inline-block;
    text-align: center;
    .logo-box {
      width: 150px;
      height: 150px;
      border: 1px dashed #dce0e2;
      vertical-align: middle;
      img {
        height: 24px;
      }
    }
  }
  .model-green-btn {
    width: 160px;
    height: 50px;
    color: #ffffff;
    font-size: 16px;
    font-weight: bold;
    background-color: #43b02a;
    border: solid 2px #43b02a;
    margin-right: 20px;
    border-radius: 2px;
  }

  .model-green-btn:hover {
    color: #43b02a;
    background-color: #f9f9f9;
    border: solid 2px #43b02a;
  }

  .model-green-btn-right {
    font-size: 16px;
    font-weight: bold;
    width: 160px;
    height: 50px;
    color: #43b02a;
    border-radius: 2px;
    background-color: #f9f9f9;
    border: solid 2px #43b02a;
    text-decoration: none;
  }


  .model-green-btn-right:hover {
    color: #ffffff;
    background-color: #43b02a;
    border: solid 2px #43b02a;
  }


</style>
