<template>
    <div class="statisticsAnalysisList-wrap">
      <!--统计分析标题-->
      <div class="createActivityTitle">
        <div class="createActivityTitle-line-wrap text-center">
          <p class="createActivityTitle-line"></p>
        </div>
        <h2>
          统计分析
        </h2>
      </div>

      <div class="statisticsAnalysisList-content-wrap">
        <div class="statisticsAnalysisList-content-box">
            <div class="statisticsAnalysisList-table">

              <el-table
              v-loading="loading"
              :data="tableData"
              stripe
              border
              style="width: 100%">
              <el-table-column
                prop="name"
                label="活动主题">
              </el-table-column>
              <el-table-column
                prop="publishTime"
                label="活动发布时间"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="活动地址"
                width="260">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="80">
                <template slot-scope="scope">
                  <el-button @click="gotoView(scope.row)" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            </div>
          <!--分页器-->
          <div class="block text-center pagination-wrap">
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
    export default {
        name: "statistics-analysis-list",
        data () {
          return {
            loading: true,
            currentPage: 1,
            pageSize: 10,
            totalList: 2,
            tableData: [],
          };
        },
      methods:{
        // 分页
        init() {
          this.getdata(this.currentPage);
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.getdata(val)
        },
        gotoView(row) {
          this.$router.push({path:'/public/statisticsAnalysis',query:{eventId:row.eventId}});
        },
        //获取列表
        getdata(current,data) {
          var _self = this;
          this.$axios({
            method:'get',
            url:'/event/statistics/event',
            params: {
              'page': current,
              ...data
            }
          }).then(function(response) {
            //第一次加载后，设置自动加载为false
            console.log(response.data.data.list.list)
            _self.autoload = false;
            _self.totalList = response.data.data.totalRecord;
            // $.each(response.data.data.list.list, function(index, item) {
            //   if(item.status === 1){
            //     item.status = '已发布'
            //   }else if(item.status === 0) {
            //     item.status = '草稿'
            //   }
            // });
            _self.tableData = response.data.data.list;
            _self.loading = false;
          });
        }
      },
      created() {
        this.init()
      },
    }
</script>

<style>
  .statisticsAnalysisList-table .el-table th>.cell {
    color: #333333;
  }
  .statisticsAnalysisList-table .el-button--text {
    color: #03b02a;
  }
  .statisticsAnalysisList-table .el-button--text, .statisticsAnalysisList-table .el-button--text:hover {
    border: 0;
    background-color: transparent;
  }
</style>
<style scoped lang="less" rel="stylesheet/less">
  .statisticsAnalysisList-content-wrap {
    width: 100%;
    background-color: #e8eae9;
    padding-top: 26px;
    padding-bottom: 63px;
    .statisticsAnalysisList-content-box {
      width: 1200px;
      min-height: 720px;
      background-color: #ffffff;
      padding: 31px 85px;
      margin: 0 auto;
      .statisticsAnalysisList-table {
        min-height: 630px;
      }
    }
  }

</style>
