<template>
  <div class="qRCodeGenerate-wrap">
    <!--二维码管理标题-->
    <div class="createActivityTitle">
      <div class="createActivityTitle-line-wrap text-center">
        <p class="createActivityTitle-line"></p>
      </div>
      <h2>
        {{title}}
      </h2>
    </div>

    <div class="qRCodeGenerate-content-wrap">
      <div class="qRCodeGenerate-content-box">

        <div class="qRCodeGenerate-content-left">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
                   class="demo-ruleForm">
            <el-form-item prop="productName">
              <el-input type="text" v-model="ruleForm.productName" auto-complete="off" placeholder="请输入产品名称"></el-input>
            </el-form-item>
            <el-form-item prop="productUrl">
              <el-input type="text" v-model="ruleForm.productUrl" auto-complete="off" placeholder="请输入产品URL（链接请添加网络协议http://或https://）"></el-input>
            </el-form-item>
            <p class="explain-text">你可以将二维码放置于PPT、微信、微博等进行活动推广</p>
            <a class="generate-btn" href="javascript:;" @click="submitForm('ruleForm')">一键生成</a>
          </el-form>
        </div>
        <div class="qRCodeGenerate-content-right">
          <p v-show="!codeImgShow">左侧输入内容点击一键生成<br>即可获取您的产品专属二维码</p>
          <img id="codeImg" v-show="codeImgShow" src="" alt="二维码">
        </div>
        <div class="clear"></div>

      </div>
    </div>

  </div>
</template>

<script>
  import { basicHttp } from "../router/api.js"
  import { footerPosition } from '../utils/utils';
  export default {
    name: "q-r-code-generate",
    data() {
      return {
        title: '',
        codeImgShow: false,
        eventId: '',
        ruleForm: {
          productName: '',
          productUrl: '',
          qrcodeId: ''
        },
        rules: {
          productName: [
            {required: true, message: '请输入产品名称', trigger: 'blur'},
            {pattern: /^\S.*\S$/, message: '请填写正确的产品名称', trigger: 'blur'}
          ],
          productUrl: [
            {required: true, message: '请输入产品URL', trigger: 'blur'},
            {pattern: /http(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?/, message: '请填写正确的产品URL', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      successAlert() {
        var _self = this;
        this.$alert('恭喜你，二维码生成成功', '提示', {
          confirmButtonText: '前往二维码管理',
          type: 'success',
          customClass: 'qrCode-success',
          callback: action => {
            _self.$router.push({path:'/public/qRCodeAdministration'});
          }
        })

        //   .then(() => {
        //   _self.$router.push({path:'/public/qRCodeAdministration'});
        // }).catch(() => {
        //
        // });
        // this.confirm({
        //   message: '恭喜你，二维码生成成功',
        //   type: 'success',
        //   confirmButtonText: '前往二维码管理',
        //   cancelButtonText: '留在当前页',
        //   showClose: true,
        // }).then(() => {
        //   _self.$router.push({path:'/public/qRCodeAdministration'});
        // }).catch(() => {
        //
        // });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          var _self = this;
          let _qrcodeId = this.$route.query.qrcodeId;
          if (valid) {
            if(_qrcodeId) {  //如果是编辑过来的，就有eventId，新建的话没有eventId
              this.ruleForm.qrcodeId = _qrcodeId;
            }
            basicHttp({
              method: 'post',
              url: '/event/qrcode/',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
              },
              params: this.ruleForm

            }, function (response) {
              _self.codeImgShow = true;
              $('#codeImg').prop('src',response.data.data.url);
              _self.ruleForm.qrcodeId = response.data.data.id;
              _self.successAlert();
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //从二维码管理页面过来获取数据
      getInfo () {
        let _self = this;
        let _qrcodeId = this.$route.query.qrcodeId;
          if(_qrcodeId) {  //如果是编辑过来的，eventId，新建的话没有eventId
            this.ruleForm.qrcodeId = _qrcodeId;
            basicHttp({
              method: 'get',
              url: '/event/qrcode/'+ _qrcodeId,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
              },
            }, function (response) {
              _self.codeImgShow = true;
              $('#codeImg').prop('src',response.data.data.url);
              _self.ruleForm = response.data.data;
            });

          }
      },
      //根据url值是否有type=edit判断页面标题是否为编辑
      isEdit() {
        console.log(this.$route.query.pageType === 'edit')
        if(this.$route.query.pageType === 'edit') {
          this.title = '二维码编辑';
        }else {
          this.title = '二维码生成';
        }
      }
    },
    created() {
      this.isEdit();
    },
    mounted(){
      footerPosition();
      $(window).resize(footerPosition());
      this.getInfo();
    },
  }
</script>

<style>
  .qrCode-success .el-message-box__close.el-icon-close{
    display: none;
  }
  .qrCode-success .el-button.el-button--default.el-button--small.el-button--primary {
    background-color: #03b02a;
    border: 0;
  }
</style>
<style scoped lang="less" rel="stylesheet/less">
  .successAlert {
    top: 200px;
  }
  .qRCodeGenerate-content-wrap {
    width: 100%;
    height: 100%;
    background-color: #e8eae9;
    padding-top: 26px;
    padding-bottom: 63px;
    .qRCodeGenerate-content-box {
      width: 1200px;
      min-height: 400px;
      background-color: #ffffff;
      padding: 31px 85px;
      margin: 0 auto;
      .qRCodeGenerate-content-left {
        float: left;
        width: 620px;
        .explain-text {
          font-size: 14px;
          padding-bottom: 10px;
        }
        .generate-btn {
          display: inline-block;
          padding: 12px 46px;
          background-color: #03b02a;
          color: #ffffff;
          font-size: 16px;
          &:hover {
            background-color: lighten(#03b02a,10%);
          }
        }
      }
      .qRCodeGenerate-content-right {
        display: table;
        box-sizing: border-box;
        margin-left: 23px;
        float: left;
        min-width: 240px;
        min-height: 240px;
        padding: 5px;
        border: 1px solid #dce0e2;
        text-align: center;
        >p {
          display: table-cell;
          color: #999999;
          font-size: 12px;
          text-align: center;
          vertical-align: middle;
          line-height: 22px;
        }
        >img {
          display: inline-block;
          vertical-align: middle;
          width: 230px;
          height: 230px;
        }
      }
    }
  }
</style>
