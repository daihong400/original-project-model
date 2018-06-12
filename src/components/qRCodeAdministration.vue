<template>
  <div class="qRCodeAdministration-wrap">
    <!--二维码管理标题-->
    <div class="createActivityTitle">
      <div class="createActivityTitle-line-wrap text-center">
        <p class="createActivityTitle-line"></p>
      </div>
      <h2>
        二维码管理
      </h2>
    </div>


    <div class="qRCodeAdministration-content-wrap">
      <div class="qRCodeAdministration-content-box">

        <div class="qRCodeAdministration-search-wrap">
          <el-form label-width="80px">
          <el-form-item label="产品名称" class="search-input-wrap">
            <el-input placeholder="请输入产品名称" v-model="name" class="input-with-select"></el-input>
            <el-button plain icon="el-icon-search" @click="searchName"></el-button>
          </el-form-item>
          </el-form>
        </div>

        <div class="statisticsAnalysisList-table">
          <el-table
            v-loading="loading"
            :data="tableData"
            stripe
            border
            style="width: 100%">
            <el-table-column
              prop="productName"
              label="产品名称"
              width="800">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <a class="download-qrcode-btn" :href="'/event/qrcode/download/' + scope.row.id">下载</a>
                <el-button @click="gotoEdit(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="clickDetete(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!--分页器-->
        <div class="block text-center pagination-wrap" v-show="tableData.length !== 0">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
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
  import { Loading } from 'element-ui';
  import { basicHttp } from "../router/api.js"
  import {footerPosition} from '../utils/utils';

  export default {
    name: "q-r-code-administration",
    data () {
      return {
        name: '',
        currentPage: 1,
        pageSize: 10,  //每页几条，插件中也要改成一样的
        totalList: 2,
        tableData: [],
        loading: true,
      };
    },
    methods: {
      //查询主题
      searchName() {
        this.getdata(1, {name: this.name})
      },
      // 分页
      init() {
        this.getdata(1);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getdata(val, {name: this.name})
      },
      gotoEdit(row) {
        this.$router.push({path:'/public/qRCodeEdit',query:{qrcodeId: row.id, pageType: 'edit'}});
      },
      //点击删除按钮
      clickDetete(row) {
        var _self = this;
        this.$confirm('此操作将删除该二维码, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _self.deleteRow(row);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //删除一条
      deleteRow(row) {
        var _self = this;
        //加载效果
        var loadingInstance = Loading.service();
        basicHttp({
          method: 'delete',
          url: '/event/qrcode/' + row.id,
        }, function (response) {
          _self.$message({
            message: '删除成功',
            type: 'success'
          });
          //关闭加载效果
          loadingInstance.close();
          _self.getdata(_self.currentPage,{name: _self.name})
        });
      },
      downloadQrcode(row) {

      },
      //获取列表
      getdata(current,data) {
        var _self = this;
        basicHttp({
          method: 'get',
          url: '/event/qrcode',
          params: {
            ...data,
            page: current,
            pageSize:  _self.pageSize,
          }
        }, function (response) {
          //第一次加载后，设置自动加载为false
          _self.autoload = false;
          _self.totalList = response.data.data.totalRecord;
          $.each(response.data.data.list, function(index, item) {
            if(item.status === 1){
              item.status = '已发布'
            }else if(item.status === 0) {
              item.status = '草稿'
            }
          });
          _self.tableData = response.data.data.list;
          _self.loading = false;
        });
      }
    },
    created() {
      this.init()
    },
    mounted() {
      footerPosition();
      $(window).resize(footerPosition());
    },
  }
</script>

<style>
  /*<!--tab hover颜色样式-->*/
  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #e5fcef!important;
  }

  .search-input-wrap .el-button.is-plain:focus, .el-button.is-plain:hover {
    border-color: #03b02a;
    color: #03b02a;
  }
  .search-input-wrap .el-button.is-active, .el-button.is-plain:active {
    border-color: #03b02a;
    color: #03b02a;
  }
  .el-button--text {
    color: #03b02a;
  }
  .statisticsAnalysisList-table .el-button--text {
    background-color: transparent;
    color: #03b02a;
    border: 0;
  }
  .statisticsAnalysisList-table .el-button--text:hover {
    background-color: transparent;
    color: #03b02a;
    border: 0;
    text-decoration: underline;
  }
  .el-table--border th .cell {
    color: #606266;
  }
  .el-table--border th:first-child .cell,.el-table--border td:first-child .cell {
    padding-left: 34px;
  }
  .search-input-wrap .el-button {
    border-radius: 2px;
    margin-left: 10px;
    padding: 10px 21px;
    vertical-align: bottom;
  }
  .el-form-item__label {
    text-align: left;
  }
  .search-input-wrap .el-button i {
    font-size: 18px;
  }
  .search-input-wrap .el-button:hover {
    background-color: #03b02a;
    color: #ffffff;
    border-color: #03b02a;
  }
  .search-input-wrap input {
    width: 362px;
    border-radius: 0;
    display: inline-block;
  }
  .input-with-select.el-input {
    display: inline-block;
    width: 362px;
  }
  label.el-form-item__label {
    height: 40px;
    line-height: 40px;
  }
  .el-pager li.active {
    border: 1px solid #43b02a;
    border-radius: 20px;
    color: #43b02a;
    min-width: 28px;
  }
</style>
<style scoped lang="less" rel="stylesheet/less">
  .qRCodeAdministration-content-wrap {
    width: 100%;
    height: 100%;
    background-color: #e8eae9;
    padding-top: 26px;
    padding-bottom: 63px;
    .qRCodeAdministration-content-box {
      width: 1200px;
      min-height: 400px;
      background-color: #ffffff;
      padding: 31px 85px;
      margin: 0 auto;
      a.download-qrcode-btn {
        color: #03b02a;
        font-size: 12px;
        margin-right: 10px;

      }
      .qRCodeAdministration-search-wrap {
        border: 1px solid #dce0e2;
        padding: 18px 34px;
        margin-bottom: 20px;
      }
      .statisticsAnalysisList-table {
        min-height: 630px;
      }
    }
  }
</style>
