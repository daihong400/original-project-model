<template>
  <div class="activityAdministration-wrap">
    <!--标题-->
    <div class="createActivityTitle">

      <!--<h2>-->
      <!--报名管理-->
      <!--</h2>-->
      <!--<div style="">-->
        <!--<span style="border-bottom: #86bc25 1px solid;font-size: 30px;-->
	<!--font-weight: normal;-->
	<!--font-stretch: normal;-->
	<!--line-height: 160px;-->
	<!--letter-spacing: 1px;-->
	<!--color: #000000;padding-bottom: 10px;">报名管理</span>-->
      <!--</div>-->
      <div class="createActivityTitle">
        <div class="createActivityTitle-line-wrap text-center">
          <p class="createActivityTitle-line"></p>
        </div>
        <h2>
          报名管理
        </h2>
      </div>

    </div>

    <div class="activityAdministration-content-wrap">
      <div class="activityAdministration-content-box">
        <div class="activity-search-nav">
          <div class="activity-states-row">
            <span class="activity-states-row-title">活动主题：</span>
            <span class="event-theme">{{eventName}}</span>
            <!--<a class="QRCode-download" href="javascript:;">-->
            <!--<i class="el-icon-warning"></i>-->
            <!--<span>下载签到二维码</span>-->
            <!--</a>-->
            <span class="activity-states-row-right ">
              <span class="activity-states-row-title">报名人数：</span>
              <span class="yellow-font">{{enrolment}}</span>
              <span>人</span>
            </span>


            <div class="clear"></div>
          </div>
          <div class="activity-releaseTime-row">

            <el-form :inline="true" :model="search" class="demo-form-inline">
              <el-form-item label="姓名">
                <el-input v-model="search.userName" placeholder="请输入活动姓名"></el-input>
              </el-form-item>
              <el-form-item label="企业名称">
                <el-input v-model="search.companyName" placeholder="请输入企业名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="btnHover" icon="el-icon-search" @click="searchFn" ></el-button>
              </el-form-item>
            </el-form>

          </div>
        </div>

        <div class="activity-list-wrap">
          <el-row>
            <el-col :span="24" style="background: #f9f9f9;">
              <div class="signIn-content">
                <div class="title-wrap SignIn-title text-right">
                  <!--<el-tooltip content="提示：您可在此提前打印名牌，或在“签到管理”界面现场打印名牌。" placement="top" effect="light">-->
                  <!--<i class="el-icon-warning" style="color: #03b02a"></i>-->
                  <!--</el-tooltip>-->
                  <!--<button class="green-btn" type="button">-->
                  <!--打印名牌-->
                  <!--</button>-->
                  <a class="green-btn-right" :href="exportUrl">
                    导出清单
                  </a>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-table :data="tableData" :empty-text="searchResultTip" style="width: 100%;">
              <el-table-column prop="code" label="报名号">
              </el-table-column>
              <el-table-column prop="fullName" label="姓名">
              </el-table-column>
              <el-table-column prop="enterpriseName" label="企业名称" width="250" :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column prop="email" label="邮箱" width="200" :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column prop="job" label="职位">
              </el-table-column>
              <el-table-column prop="phone" label="联系电话" width="150">
              </el-table-column>
            </el-table>
          </el-row>
        </div>

        <!--分页器-->
        <div class="block text-center pagination-wrap">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            :page-size="10"
            layout="prev, pager, next"
            :total="totalList">
          </el-pagination>
        </div>

      </div>
    </div>
    <div v-title="'活动管理数据分析平台 | RA内部业务中心'"></div>
  </div>
</template>

<script>
  import { basicHttp } from "../router/api.js"
  import {Loading} from 'element-ui';

  export default {
    name: "register-administration",
    data() {
      return {
        searchResultTip: '暂无数据',
        exportUrl: document.location.protocol + '//' + location.host + '/event/export/feedback/' + this.$route.query.eventId,
        search: {
          userName: '',
          companyName: '',
        },
        eventName: '',
        enrolment: '',
        tableData: [
          // {
          //   date: '2016-05-02',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1518 弄',
          //   job: '职位',
          //   industry: '互联网金融',
          //   phone: '86-1239 8743 458',
          // },
          // {
          //   date: '2016-05-02',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1518 弄',
          //   job: '职位',
          //   industry: '互联网金融',
          //   phone: '86-1239 8743 458',
          // },
        ],
        autoload: true,
        pageSize: 10,//每页几条，插件中也要改成一样的
        totalList: 3,
        page: 1,
      };
    },
    methods: {
      searchFn() {
        this.searchResultTip = '搜索结果为空';
        this.getFeedBack(1, {fullName:this.search.userName,enterpriseName: this.search.companyName})
      },
      // 分页
      init() {
        this.getFeedBack(this.page, {fullName:this.search.userName,enterpriseName: this.search.companyName})
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.getFeedBack(val, {fullName:this.search.userName,enterpriseName: this.search.companyName})
      },
      getFeedBack: function (current,data) {
        var _self = this;
        basicHttp({
          method: 'get',
          url: '/event/feedback',
          params: {
            eventId: this.$route.query.eventId,
            ...data,
            // fullName:_self.search.userName,
            // enterpriseName:_self.search.companyName,
            page: current,
            pageSize:_self.pageSize,
          }
        }, function (response) {
          _self.autoload = false;
          // _self.totalList = response.data.data.pagination.totalRecord;
          _self.totalList = response.data.data.pageResponse.totalRecord;
          console.log(response.data.data.pageResponse.totalRecord)
          _self.eventName = response.data.data.eventName;
          _self.enrolment = response.data.data.enrolment;
          _self.tableData = response.data.data.pageResponse.list;

        });
      }
      //获取列表
      // getdata(current, data) {
      //   var _self = this;
      //   var loadingInstance = Loading.service();
      //   this.$axios({
      //     method: 'get',
      //     url: '/event/event',
      //     params: {
      //       'page': current,
      //       'pageSize': 5,
      //       ...data
      //     }
      //   }).then(function (response) {
      //     //第一次加载后，设置自动加载为false
      //     loadingInstance.close();
      //   });
      // }
    },
    created() {

      //加载效果
      let loadingInstance = Loading.service();
      //关闭加载效果
      loadingInstance.close();
      // this.getFeedBack();
      if(Boolean(this.autoload)) {
        this.init();
      } else {
        return;
      }
    },
    mounted: function () {

    }

  }
</script>

<style>
  .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
    padding-left: 30px;
  }
  .activity-search-nav .el-form-item__label {
    line-height: 40px;
    color: #000000;
  }
  .activity-list-wrap .el-table th>.cell {
    color: #000000;
  }
  .el-pager li.active {
    border: 1px solid #43b02a;
    border-radius: 20px;
    color: #43b02a;
    min-width: 28px;
  }
</style>
<style scoped lang="less" rel="stylesheet/less">
  /*btnhover*/
  .btnHover{
    color: #03b02a;
    border: 1px solid #03b02a;
  }
  .el-button:focus, .el-button:hover{
    border-color: white;
    color: white;
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

  .yellow-font {
    color: #f39000;
  }

  .green-btn {
    font-family: MicrosoftYaHei-Bold;
    width: 110px;
    height: 30px;
    color: #ffffff;
    font-size: 16px;
    font-weight: bold;
    background-color: #03b02a;
    border: solid 2px #03b02a;
    margin-right: 10px;
    border-radius: 2px;
  }

  .green-btn:hover {
    color: #03b02a;
    background-color: #f9f9f9;
    border: solid 2px #03b02a;
  }

  .green-btn-right {
    font-family: MicrosoftYaHei-Bold;
    padding: 4px 20px;
    font-size: 16px;
    font-weight: bold;
    width: 110px;
    height: 30px;
    color: #03b02a;
    border-radius: 2px;
    background-color: #f9f9f9;
    border: solid 2px #03b02a;
    text-decoration: none;
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


  .green-btn-right:hover {
    color: #ffffff;
    background-color: #03b02a;
    border: solid 2px #03b02a;
  }

  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #e5fcef;
  }

  .el-table td {
    border-bottom: 0;
  }

</style>
<style scoped lang="less" rel="stylesheet/less">
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
            padding: 10px 20px;
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
            float: left;
          }
          .activity-states-row-right {
            float: right;
            display: inline-block;
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
