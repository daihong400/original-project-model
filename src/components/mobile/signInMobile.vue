<template>
  <div class="signInMobile-wrap">
    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="80px" class="demo-dynamic">
      <el-form-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        :label="domain.label"
        :key="domain.key"
        :prop="'domains.' + index + '.value'"
        :rules="rules[domain.key]"
      >
        <el-input v-model="domain.value"></el-input>
      </el-form-item>
      <el-form-item>
        <p class="form-remarks">注：每个微信ID仅能报名一次</p>
      </el-form-item>
      <a class="sunbmit-btn" href="javascript:;" @click="submitForm('dynamicValidateForm')"  id="feedback_btn">报名</a>
      <router-link class="back-to-detaile-link" :to="{ path: '/s', query: { activity:  $route.query.eventId,name: info.name } }">&lt;&lt;返回活动详情页</router-link>
    </el-form>
    <div v-title="'活动管理数据分析平台 | RA内部业务中心'"></div>
  </div>
</template>

<script>
  import { Loading } from 'element-ui';
  import { basicHttp } from "../../router/api.js"

  export default {
    name: "sign-in-mobile",
    data() {
      return {
        labelPosition: 'right',
        rules: [],
        info: {},
        dynamicValidateForm: {
          domains: []
          // domains: [{
          //   label: '姓名',
          //   key: 'fullName',
          //   value: '',
          //   message1: '域名不能为空',
          //   require: true
          // },{
          //   label: '职位',
          //   key: 'job',
          //   value: '',
          //   message1: '域名不能为空2',
          //   require: false
          // }],
        },
        submitdata: {
          eventId: this.$route.query.eventId,
          data: {}
        }
      }
    },
    methods: {
      //同一微信重复报名弹窗提示
      open() {
        this.$alert('你已经报过名啦', '提示', {
          confirmButtonText: '确定',
          customClass: 'duplicate-registration-modal',
          callback: action => {
            //已报名的话跳转到报名浏览页
            this.$router.push({path: '/s', query: {activity: this.$route.query.eventId,name: this.info.name }});
          }
        });
      },
      //拉取页面主要内容
      getInfo () {
        var _self = this;
        var loadingInstance = Loading.service();
        this.$axios({
          method:'get',
          url:'/event/event/'+ this.$route.query.eventId + '?t=' + new Date().getTime(),
        }).then(function(response) {
          _self.info = response.data.data;
          loadingInstance.close();
        });
      },
      //表单提交的接口
      submitData() {
        var dataMap = this.dynamicValidateForm.domains;
        for (let i = 0; i < dataMap.length; i++) {
          this.submitdata.data[dataMap[i].key] = dataMap[i].value;
        }
        var _self = this;
        basicHttp({
          method: 'POST',
          url: '/event/feedback',
          data: _self.submitdata
        }, function (response) {
          _self.$alert('报名成功', '提示', {
            customClass: 'signInMobile-success-modal',
            confirmButtonText: '查看我的票券',
            type: 'success',
            callback: action => {
              _self.$router.push({path: '/t', query: {eventId: _self.$route.query.eventId}});
            }
          });
        }, function (error) {
          _self.$alert(error.data.message, '提示', {
            confirmButtonText: '确定',
            customClass: 'mobileWarning',
            type: 'warning',
          });
        });
      },
      //表单提交
      submitForm(formName) {
        if($('#feedback_btn').html() !== '报名'){
          return false;
        }

        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit!');
            this.submitData();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //加载表单
      loadEventData() {
        var _self = this;
        var eventId = this.$route.query.eventId;
        if (eventId) {
          basicHttp({
            method: 'get',
            url: '/event/event/' + eventId
          }, function (response) {
            var forms = response.data.data.formInfo.forms;
            for (let i = 0; i < forms.length; i++) {
              var form = forms[i];
              _self.dynamicValidateForm.domains[i] = {};
              _self.dynamicValidateForm.domains[i].label = form.displayName;
              _self.dynamicValidateForm.domains[i].key = form.name;

              _self.rules[form.name] = [];
              if(form.rules.indexOf("not_empty") != -1){
                _self.rules[form.name].push({
                  required: true, message: form.displayName+ '不能为空', trigger: 'blur'
                });
              }

              if(form.rules.indexOf("is_email") != -1){
                _self.rules[form.name].push({
                  type: 'email', message: '请填写正确的邮箱地址', trigger: 'blur'
                });
              }

              if(form.rules.indexOf("is_phone_number") != -1){
                _self.rules[form.name].push({
                  min: 10, max: 12, message: '请填写正确的联系电话', trigger: 'blur'
                });
              }
            }

            _self.dynamicValidateForm.domains.push({});
            _self.dynamicValidateForm.domains.splice(-1, 1);
          });
        }
      },
      //检查微信是否登陆
      checkWeiChart() {
        var _self = this;
        var eventId = this.$route.query.eventId;
        if (eventId) {
          this.$axios({
            method: 'get',
            url: '/event/feedback/check/' + eventId
          }).then(function (response) {
            var _result = response.data.code;
            if (_result === '0000') {  //已经登陆

            } else if (_result === '0004') { //没有登陆
              window.location.href = '/event/weixin/oauth?redirect='+ window.location.href;
            } else if (_result === '1101') {  //已经报名，弹窗提醒
               _self.open();  //重复报名弹窗提示（不可关闭）
            } else if(_result === '1103'){
              //close
              $("#feedback_btn").html("活动已截止报名");
              $('#feedback_btn').css({'background-color': '#dddddd'});
            } else if(_result === '1104'){
              //limit
              $("#feedback_btn").html("活动报名人数已上限");
              $('#feedback_btn').css({'background-color': '#dddddd'});
            }
          });
        }
      },
    },
    created() {
      this.loadEventData();
      this.checkWeiChart();
      this.getInfo();
    },
    mounted() {

    },
  }
</script>
<style>
  .duplicate-registration-modal .el-button--primary:focus, .duplicate-registration-modal .el-button--primary:hover {
    background-color: #03b02a;
    border: 0;
  }
  .duplicate-registration-modal .el-button--primary.is-active, .el-button--primary:active {
    background-color: #03b02a;
    border: 0;
  }
  .duplicate-registration-modal .el-button--primary {
    background-color: #03b02a;
    border: 0;
  }
  .duplicate-registration-modal.el-message-box {
    width: 80%;
  }
  .duplicate-registration-modal .el-message-box__headerbtn {
    display: none;
  }
  .signInMobile-success-modal {
    width: 80%;
  }

  .signInMobile-signInRepeat-modal .el-dialog {
    border-radius: 8px;
  }

  .signInMobile-signInRepeat-modal .el-dialog__footer {
    text-align: center;
    background-color: #e5fcef;
    border-top: 1px solid #cad3df;
    border-radius: 0 0 8px 8px;
  }

  .signInMobile-signInRepeat-modal .el-dialog__footer a {
    color: #43b02a;
    display: block;
  }

  .signInMobile-signInRepeat-modal .el-dialog__body {
    text-align: center;
  }

  .signInMobile-signInRepeat-modal .el-dialog__headerbtn .el-dialog__close {
    display: none;
  }

  .mobileWarning.el-message-box {
    width: 80%;
  }

  .signInMobile-wrap .el-input__inner {
    border-radius: 0;
    border: 1px solid #dce0e2;
  }

  .signInMobile-wrap .el-form-item.is-success .el-input__inner {
    border: 1px solid #dce0e2;
    background-color: #f6f6f6;
  }

  .signInMobile-wrap .el-form-item.is-success .el-input__inner:focus {
    border: 1px solid #43b02a;
  }

  .signInMobile-wrap .el-form-item__label {
    font-weight: normal;
    color: #97999b;
    line-height: 40px;
  }
</style>
<style scoped lang="less" rel="stylesheet/less">
  .signInMobile-wrap {
    padding: 30px 15px;
    height: 100%;
    background-color: #ffffff;
    .form-remarks {
      color: #ed8b00;
      font-size: 12px;
      line-height: 12px;
    }
    .sunbmit-btn {
      width: 100%;
      display: inline-block;
      padding: 16px 0;
      color: #ffffff;
      font-weight: bold;
      background-color: #43b02a;
      text-align: center;
    }
    .back-to-detaile-link {
      color: #03b02a;
      display: inline-block;
      margin-top: 30px;
    }
    .sunbmit-btn {
      &:link {
        text-decoration: none;
      }
      &:visited {
        text-decoration: none;
      }
      &:hover {
        text-decoration: none;
      }
      &:active {
        text-decoration: none;
      }
    }
  }
</style>
