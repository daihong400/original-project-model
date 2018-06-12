<template>
  <div class="activityAdministration-wrap">
    <!--标题-->
    <div class="createActivityTitle">
      <div class="createActivityTitle-line-wrap text-center">
        <p class="createActivityTitle-line"></p>
      </div>
      <h2>
        签到管理
      </h2>
    </div>

    <div class="activityAdministration-content-wrap">
      <div class="activityAdministration-content-box registerAdministration-box">
        <div class="activity-search-nav">
          <div class="activity-states-row">
            <span class="activity-states-row-title">活动主题：</span>
            <span class="event-theme">{{eventName}}</span>
            <a :href="downLoadQrcode" class="QRCode-download">
              <span>下载签到二维码</span>
            </a>
            <el-tooltip content="签到二维码用于活动现场客户扫码在线签到登记" placement="bottom" effect="light">
              <i class="el-icon-warning"></i>
            </el-tooltip>
            <div class="clear"></div>
          </div>
          <!--<div class="activity-releaseTime-row">-->

          <!--<el-form :inline="true" :model="search" class="demo-form-inline">-->
          <!--<el-form-item label="姓名">-->
          <!--<el-input v-model="search.userName" placeholder="请输入活动姓名"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="企业名称">-->
          <!--<el-input v-model="search. companyName" placeholder="请输入企业名称"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item>-->
          <!--<el-button class="serachBtn" icon="el-icon-search" type="success" plain @click=""></el-button>-->
          <!--</el-form-item>-->
          <!--</el-form>-->

          <!--</div>-->
        </div>

        <div class="activity-list-wrap">
          <el-row>
            <el-col :span="12">
              <div class="signIn-content signIn-list-left" style="background-color: #f9f9f9">
                <div class="title-wrap unSignIn-title">
                  <i class="el-icon-tickets"></i>
                  <span>未签到</span>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="signIn-content signIn-list-right" style="background-color: #f9f9f9">
                <div class="title-wrap SignIn-title">
                  <i class="el-icon-tickets"></i>
                  <span>已签到</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" style="border-right: 1px solid #cad3df;">
              <el-table :data="notSign" height="647" style="width: 100%;">
                <el-table-column prop="code" label="报名号" width="120">
                </el-table-column>
                <el-table-column prop="fullName" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="enterpriseName" label="企业名称" :show-overflow-tooltip="true">
                </el-table-column>
              </el-table>
            </el-col>
            <el-col :span="12">
              <el-table :data="signed" height="647" style="width: 100%;">
                <el-table-column prop="code" label="报名号" width="120">
                </el-table-column>
                <el-table-column prop="fullName" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="enterpriseName" label="企业名称" :show-overflow-tooltip="true">
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <!--todo 记得拿掉-->
          <!--<el-button @click="centerDialogVisible = true">签到成功弹窗</el-button>-->
          <!--<el-button-->
            <!--plain-->
            <!--@click="rightMessage(testdata)">-->
            <!--右下角-->
          <!--</el-button>-->
        </div>

      </div>
    </div>
    <el-dialog title="" :visible.sync="centerDialogVisible" width="30%">
      <div style="text-align: center;">
        <img src="../assets/Tick_NEG.svg" style="width:30px;height:30px;text-align: center;">
      </div>
      <p class="el-dialog-p1">姓名姓名签到成功！</p>
      <p class="el-dialog-p2">企业企业企业企业企业企业企业企业企业企业</p>
      <span slot="footer" class="dialog-footer">
    <!--<el-button @click="centerDialogVisible = false">取 消</el-button>-->
    <el-button class="el-btn" type="primary" @click="centerDialogVisible = false" style="">打印名牌</el-button>
  </span>
    </el-dialog>
    <div v-title="'活动管理数据分析平台 | RA内部业务中心'"></div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {Loading} from 'element-ui';
  import ElButton from "element-ui/packages/button/src/button";

  export default {
    components: {ElButton},
    name: "register-administration",
    data() {
      return {
        downLoadQrcode: '/event/export/qrcode/'+this.$route.query.eventId+'?type=sign',
        centerDialogVisible: false,
        timing: null,
        search: {
          userName: '',
          companyName: '',
        },
        eventName: "",
        signQrcode: "",
        notSign: [],
        signed: [],
        newsigned: [],//新签到成功的人员
        testdata: {code: "00001", fullName: "aaaa", enterpriseName: "test"},//测试数据
        testdata2: [
          {code: "00001", fullName: "test1", enterpriseName: "test1"},
          {code: "00002", fullName: "test2", enterpriseName: "test2"},
          // {code: "00003", fullName: "test3", enterpriseName: "test3"},
          // {code: "00004", fullName: "test4", enterpriseName: "test4"},
        ],//测试数据
        testdata1: [{code: "00001", fullName: "test1", enterpriseName: "test1"}],//测试数据
        rightMessageshow: false,
        isFirstLoad: true,//是否第一次加载
      };
    },
    methods: {
      //获取列表
      getdata(data) {
        var _self = this;
        // var loadingInstance = Loading.service();
        axios({
          method: 'get',
          url: '/event/sign/' + this.$route.query.eventId + '?t=' + Date.now(),
          params: {
            // eventId: this.$route.query.eventId,
            ...data,
          }
        }).then(function (response) {
          //第一次加载后，设置自动加载为false
          // loadingInstance.close();
          console.log(response.data);
          if (response.data.code === "0000") {

            if (_self.eventName != response.data.data.eventName) {
              _self.eventName = response.data.data.eventName;
            }
            if (_self.signQrcode != response.data.data.signQrcode) {
              _self.signQrcode = response.data.data.signQrcode;
            }
            if (_self.notSign != response.data.data.notSign) {
              _self.notSign = response.data.data.notSign;
            }
            if (_self.signed != response.data.data.signed) {//获取以签到的数据

              if (!_self.isFirstLoad) {//不是第一次加载
                _self.newsigned = _self.diffArry(_self.signed, response.data.data.signed);
                // _self.newsigned = _self.diffArry(_self.testdata1, _self.testdata2);
                if (_self.newsigned) {
                  for (var i = 0; i < _self.newsigned.length; i++) {
                    (function(a) {
                      setTimeout(function() {
                        console.log(a);
                        _self.rightMessage(_self.newsigned[a]);
                      }, a*300);
                    })(i)
                  }
                  // var j = setInterval(function () {//轮询消息
                  //   _self.rightMessage(_self.newsigned[i]);
                  //   i++;
                  //   if (i == _self.newsigned.length) {
                  //     window.clearInterval(j);
                  //   }
                  // }, 200);
                }

              };
              _self.signed = response.data.data.signed;
            }
            // _self.newsigned = _self.diffArry(_self.newsigned, _self.signed);
            setTimeout(function () {
              _self.isFirstLoad = false
            }, 1000);
          }
        });
      },
      sleep(numberMillis) {
        var now = new Date();
        var exitTime = now.getTime() + numberMillis;
        while (true) {
          now = new Date();
          if (now.getTime() > exitTime)
            return;
        }
      },
      //消息弹窗
      rightMessage(data) {
        // data.fullName="张三";
        if (!this.isFirstLoad && data) {
          this.$notify({
            title: data.fullName + '签到成功!',
            // message: '右下角弹出的消息',
            position: 'bottom-right'
          });
        } else {
          console.log("第一次加载");
        }
        //else {
        // this.$notify({
        //   title: 'HTML 片段',
        //   dangerouslyUseHTMLString: true,
        //   message: '<strong>这是 <i>HTML</i> 片段</strong>'
        // });
        // }

      }
      ,
      //获取两个数组的不同的值
      diffArry(array1, array2) {

        var result = [];
        for (var i = 0; i < array2.length; i++) {
          var num = array2[i].code;
          var isExist = false;
          for (var j = 0; j < array1.length; j++) {
            var n = array1[j].code;
            if (n === num) {
              isExist = true;
              break;
            }
          }
          if (!isExist) {
            result.push(array2[i]);
          }
        }
        return result;
      },
    },
    created() {
      //加载效果
      let loadingInstance = Loading.service();
      //关闭加载效果
      loadingInstance.close();
      const _self = this;
      _self.getdata();
      _self.timing = setInterval(function () {//轮询消息
        _self.getdata();
      }, 3000)

    },
    mounted: function () {

    },
    beforeRouteLeave (to, from, next) {
      next();
      clearInterval(this.timing);
    },

  }
</script>

<style>
  .title-wrap.unSignIn-title span {
    font-weight: bold;
  }
  .title-wrap.SignIn-title span {
    font-weight: bold;
  }
  .registerAdministration-box .el-table .cell {
    padding-left: 30px;
  }
  .registerAdministration-box .el-table th>.cell {
    padding-left: 30px;
    font-weight: bold;
    color: #000000;
  }
  .el-button--success.is-plain {
    background-color: white;
    border: 1px solid #43b02a;
  }

  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #e5fcef;
  }

  .el-table td {
    border-bottom: 0;
  }

  /*<!--弹窗效果-->*/
  .el-dialog--center .el-dialog__body {
    padding: 16px 25px 30px;
  }

  .el-dialog__body {
    padding: 17px 23px;
    padding-bottom: 32px;
  }

  .el-dialog__footer {
    padding: 0;
  }

  .el-dialog {
    border-radius: 5px;
  }

  .el-dialog-p1 {
    text-align: center;
    margin-top: 20px;
    font-size: 16px;
    color: #000000;
  }

  .el-dialog-p2 {
    text-align: center;
    font-size: 14px;
    color: #666666;
    margin-top: 13px;
  }

  .el-btn {
    width: 100%;
    border-radius: 0;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: #e5fcef;
    color: #03b02a;
    font-size: 16px;
    font-weight: bold;
    outline: none;
    border: 1px solid #e5fcef;
    border-top: 1px solid #cad3df;
    height: 55px;
  }

  .el-btn:hover {
    color: #03c930;
    background-color: #e5fcef;
    outline: none;
    border: 1px solid #e5fcef;
    border-top: 1px solid #cad3df;
  }

  .search-name-wrap .el-input {
    width: 400px;
    margin-left: 20px;
  }

  .search-name-wrap .el-button {
    margin-left: 10px;
  }

  .el-pager li.active {
    border: 1px solid #43b02a;
    border-radius: 20px;
    color: #43b02a;
    min-width: 28px;
  }

  .activityAdministration-content-wrap .el-radio__inner {
    display: none;
  }

  .activity-releaseTime-row .el-form-item__label {
    line-height: 40px;
  }

  .activity-releaseTime-row .el-input__inner {
    border-radius: 0;
    width: 362px;
  }

  .activity-releaseTime-row .el-form-item {
    margin-bottom: 0;
  }
</style>
<style lang="less" rel="stylesheet/less">
  .activityAdministration-content-wrap {
    width: 100%;
    padding-top: 26px;
    padding-bottom: 63px;
    background-color: #e8eae9;
    .activityAdministration-content-box {
      max-width: 1200px;
      border: 1px solid #dce0e2;
      box-sizing: border-box;
      margin: 0 auto;
      background-color: #ffffff;
      min-height: 763px;
      padding: 30px 42px;
      .activity-list-wrap {
        min-height: 500px;
        border: 1px solid #dce0e2;
        .signIn-content {
          .unSignIn-title {
            border-right: 1px solid #cad3df;
          }
          > div.title-wrap {
            width: 100%;
            border-bottom: 1px solid #cad3df;
            padding: 10px 30px;
          }
        }
      }

      .rowSelect {
        height: 26px;
        margin-left: 10px;
      }
      .pagination-wrap {
        margin-top: 25px;
      }
      .activity-search-nav {
        border: 1px solid #dce0e2;
        margin-bottom: 20px;
        .search-name-wrap {
          display: inline-block;
          width: 800px;
        }
        .activity-states-row {
          border-bottom: 1px solid #dce0e2;
          padding: 10px 30px;
          .activity-states-row-title {
            float: left;
            font-weight: bold;
          }
          .event-theme {
            display: inline-block;
            width: 700px;
            font-size: 14px;
            color: #53565a;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .el-icon-warning {
            float: right;
            color: #03b02a;
            cursor: pointer;
            padding-top: 3px;
            padding-right: 5px;
          }
          a.QRCode-download {
            float: right;
            color: #03b02a;
            &:hover {
              color: lighten(#03b02a, 5%);
            }
          }
          .activity-states-row-title {
            display: inline-block;
            margin-right: 20px;
          }
        }
        .activity-releaseTime-row {
          padding: 10px 30px;
          .activity-releaseTime-row-title {
            display: inline-block;
            margin-right: 20px;
          }
        }
      }
    }
  }
</style>
