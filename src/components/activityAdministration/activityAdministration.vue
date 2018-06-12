<template>
  <div class="activityAdministration-wrap">
    <!--活动管理标题-->
    <div class="createActivityTitle">
      <div class="createActivityTitle-line-wrap text-center">
        <p class="createActivityTitle-line"></p>
      </div>
      <h2>
        活动管理
      </h2>
    </div>

    <div class="activityAdministration-content-wrap">
      <div class="activityAdministration-content-box">
        <div class="activity-search-nav">
          <div class="activity-states-row">
            <span class="activity-states-row-title">活动状态</span>
            <el-radio v-model="search.status" @change="changeStatus" label="0" border><span>未发布({{statusCount.draftStatus}})</span>
            </el-radio>
            <el-radio v-model="search.status" @change="changeStatus" label="1" border><span>已发布({{statusCount.publicStatus}})</span>
            </el-radio>
            <el-radio v-model="search.status" @change="changeStatus" label="2" border><span>进行中({{statusCount.doingStatus}})</span>
            </el-radio>
            <el-radio v-model="search.status" @change="changeStatus" label="3" border><span>已结束({{statusCount.overStatus}})</span>
            </el-radio>
          </div>
          <div class="activity-releaseTime-row">
            <span class="activity-states-row-title">活动主题</span>
            <div class="search-name-wrap">
              <el-input v-model="search.keyword" placeholder="请输入活动主题"></el-input>
              <el-button type="plain" icon="el-icon-search" @click="searchName"></el-button>
              <el-button type="plain" @click="searchNameReseat">重置</el-button>
            </div>

          </div>
        </div>

        <div class="activity-list-wrap">

          <div class="activity-unit-box" v-for="(item, index) in activityList" v-show="activityList.length !== 0">
            <div class="activity-unit-left">
              <div class="activity-unit-count">
                <span>{{item.enroll}}</span>
                <p>已报名</p>
              </div>
              <el-progress type="circle" :percentage="item.percentage" status="success"></el-progress>
            </div>
            <div class="activity-unit-middle">
              <p class="activity-unit-title">{{item.name}}</p>
              <p class="activity-unit-url">{{item.visitUrl}}</p>
              <router-link class="activity-unit-btn"
                           :to="{ path:'/public/templatePreview', query: { eventId:  item.eventId, name: item.name } }"
                           v-show="search.status === '0'">
                <i class="el-icon-view">
                </i>
                <span>预览</span>
              </router-link>
              <router-link class="activity-unit-btn"
                           :to="{ path:'/public/editActivity', query: { type: 'edit',eventId:  item.eventId} }"
                           v-show="search.status !== '3'">
                <i>
                  <svg class="icon" width="22px" height="22.00px" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg">
                    <path fill="#8d8d8d" d="M306.744 672L897.369 81.377l45.255 45.255-590.625 590.625z"/>
                    <path fill="#8d8d8d"
                          d="M329.377364 694.627778m-22.627417 22.627417a32 32 0 1 0 45.254834-45.254834 32 32 0 1 0-45.254834 45.254834Z"/>
                    <path fill="#8d8d8d"
                          d="M919.997192 103.991222m-22.627417 22.627417a32 32 0 1 0 45.254834-45.254834 32 32 0 1 0-45.254834 45.254834Z"/>
                    <path fill="#8d8d8d"
                          d="M896 288a32 32 0 0 0-32 32v576H160l-0.5-768.5 544.5 0.5a32 32 0 0 0 0-64H128a32 32 0 0 0-32 32v832a32 32 0 0 0 32 32h768a32 32 0 0 0 32-32V320a32 32 0 0 0-32-32z"/>
                    <path fill="#8d8d8d" d="M306.744 672L897.369 81.377l45.255 45.255-590.625 590.625z"/>
                    <path fill="#8d8d8d"
                          d="M329.377364 694.627778m-22.627417 22.627417a32 32 0 1 0 45.254834-45.254834 32 32 0 1 0-45.254834 45.254834Z"/>
                    <path fill="#8d8d8d"
                          d="M919.997192 103.991222m-22.627417 22.627417a32 32 0 1 0 45.254834-45.254834 32 32 0 1 0-45.254834 45.254834Z"/>
                    <path fill="#8d8d8d"
                          d="M896 288a32 32 0 0 0-32 32v576H160l-0.5-768.5 544.5 0.5a32 32 0 0 0 0-64H128a32 32 0 0 0-32 32v832a32 32 0 0 0 32 32h768a32 32 0 0 0 32-32V320a32 32 0 0 0-32-32z"/>
                  </svg>
                </i>
                <span>编辑</span>
              </router-link>
              <router-link class="activity-unit-btn"
                           :to="{ path:'/public/templateShare', query: { eventId:  item.eventId, name: item.name } }"
                           v-show="search.status === '1' || search.status === '2'">
                <i>
                  <svg class="icon" width="22px" height="22px" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg">
                    <path fill="#8d8d8d"
                          d="M736 64c-92.8 0-168 75.2-168 168 0 22.7 4.6 44.3 12.8 64L413.1 400.8C382.3 366.2 337.9 344 288 344c-92.8 0-168 75.2-168 168s75.2 168 168 168c49.9 0 94.3-22.2 125.1-56.8L580.8 728c-8.2 19.7-12.8 41.3-12.8 64 0 92.8 75.2 168 168 168s168-75.2 168-168-75.2-168-168-168c-49.9 0-94.3 22.2-125.1 56.8L443.2 576c8.2-19.7 12.8-41.3 12.8-64s-4.6-44.3-12.8-64l167.7-104.8C641.7 377.8 686.1 400 736 400c92.8 0 168-75.2 168-168S828.8 64 736 64z m0 280c-61.8 0-112-50.2-112-112s50.2-112 112-112 112 50.2 112 112-50.2 112-112 112zM288 624c-61.8 0-112-50.2-112-112s50.2-112 112-112 112 50.2 112 112-50.2 112-112 112z m448 280c-61.8 0-112-50.2-112-112s50.2-112 112-112 112 50.2 112 112-50.2 112-112 112z"/>
                  </svg>
                </i>
                <span>分享</span>
              </router-link>
              <router-link class="activity-unit-btn" :to="{ path:'/public/enroll', query: { eventId:  item.eventId} }"
                           v-show="search.status === '1' || search.status === '2'">
                <i>
                  <svg class="icon" width="22px" height="21.85px" viewBox="0 0 1031 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M994.649 283.249l-165.75 0 0 161.225c0 19.39-16.185 35.155-36.115 35.155-19.965 0-36.15-15.765-36.15-35.155L756.634 283.249l-165.71 0c-19.96 0-36.155-15.727-36.155-35.155 0-19.395 16.195-35.155 36.155-35.155l165.71 0L756.634 51.745c0-19.425 16.185-35.155 36.15-35.155 19.93 0 36.115 15.73 36.115 35.155L828.899 212.94l165.75 0c19.96 0 36.11 15.76 36.11 35.155C1030.759 267.522 1014.609 283.249 994.649 283.249zM468.23 161.912 127.706 161.912c-30.565 0-55.435 24.195-55.435 53.945l0 673.651c0 29.75 24.87 53.94 55.435 53.94l692.518 0c30.595 0 55.47-24.19 55.47-53.94L875.694 569.944c0-19.43 16.15-35.155 36.125-35.155 19.96 0 36.14 15.725 36.14 35.155l0 319.564c0 68.54-57.32 124.25-127.735 124.25L127.706 1013.758c-70.415 0-127.705-55.71-127.705-124.25L0.001 215.857c0-68.5 57.29-124.22 127.705-124.22L468.23 91.637c19.965 0 36.16 15.725 36.16 35.117C504.39 146.185 488.195 161.912 468.23 161.912z"
                      fill="#8d8d8d"/>
                  </svg>
                </i>
                <span>报名</span>
              </router-link>
              <router-link class="activity-unit-btn"
                           :to="{ path:'/public/statisticsAnalysis', query: { eventId:  item.eventId } }"
                           v-show="search.status !== '0'">
                <i>
                  <svg class="icon" width="22px" height="22.00px" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg">
                    <path fill="#8d8d8d"
                          d="M96 64a32 32 0 0 1 32 32v832a32 32 0 0 1-64 0v-832a32 32 0 0 1 32-32zM926.4 225.6a32 32 0 0 1 0 45.248l-271.488 271.488a32 32 0 0 1-45.248-45.248l271.488-271.488a32 32 0 0 1 45.248 0zM465.152 302.848a32 32 0 0 1 0 45.248L284.096 529.152a32 32 0 0 1-45.248-45.248L419.84 302.912a32 32 0 0 1 45.312-0.064z"/>
                    <path fill="#8d8d8d"
                          d="M426.304 297.28a33.472 33.472 0 0 0 0 47.296l189.12 189.12a33.472 33.472 0 0 0 47.296-47.296L473.6 297.28a33.28 33.28 0 0 0-47.296 0zM960 928a32 32 0 0 1-32 32h-832a32 32 0 0 1 0-64h832a32 32 0 0 1 32 32z"/>
                  </svg>
                </i>
                <span>数据分析</span>
              </router-link>
              <router-link class="activity-unit-btn"
                           :to="{ path:'/public/registerAdministration', query: { eventId:  item.eventId } }"
                           v-show="search.status === '1' || search.status === '2'">
                <i>
                  <svg class="icon" width="22px" height="21.07px" viewBox="0 0 1069 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg">
                    <path fill="#8d8d8d"
                          d="M725.01248 464.2304c-12.47232-14.68928-34.59072-16.4608-49.27488-3.93728l-211.16416 179.90656-67.06176-70.77888c-13.30176-14.02368-35.36384-14.57664-49.43872-1.32608a34.944 34.944 0 0 0-1.3312 49.4336l89.89696 94.88384a34.92864 34.92864 0 0 0 48.05632 2.54976l236.38528-201.40544c14.68416-12.57984 16.45568-34.64192 3.93216-49.32608zM294.31296 298.07104c6.53824 7.70048 16.23552 12.7488 27.15648 12.7488a35.86048 35.86048 0 0 0 25.27232-10.368 35.20512 35.20512 0 0 0 10.36288-25.05216V125.75744c0-7.31648-2.21696-14.1312-6.09792-19.78368a32.68608 32.68608 0 0 0-4.3776-5.26336 35.072 35.072 0 0 0-16.45568-9.14944 34.54464 34.54464 0 0 0-8.704-1.21856c-19.84 0-35.6352 15.85152-35.6352 35.41504v149.59104c0 8.69888 3.26656 16.512 8.47872 22.72256zM749.06624 310.65088a35.56864 35.56864 0 0 0 25.27744-10.36288 35.2256 35.2256 0 0 0 10.35776-25.05216V125.75744c0-2.43712-0.27648-4.82304-0.7168-7.14752a35.51744 35.51744 0 0 0-34.92352-28.2624c-19.84512 0-35.6352 15.85152-35.6352 35.41504v149.4784c0 9.7536 3.98848 18.62144 10.4192 25.05216a35.97824 35.97824 0 0 0 25.22112 10.35776zM996.70016 272.128c-1.60256-41.28768-21.8368-74.43456-56.97536-93.33248-21.7856-11.69408-42.73664-13.30176-60.35456-13.30176h-27.48928a34.9696 34.9696 0 1 0 0 69.94432c30.15168 0 73.2672-3.49184 74.9312 38.07744 0 168.43264 0.44544 336.86528 0.384 505.29792v45.94688c0 21.05856-16.23552 37.6832-35.80416 37.6832H179.08736c-20.34176 0-35.80416-17.95584-35.80416-37.6832V280.71936v-6.92736c0-26.77248 22.39488-40.45824 46.88896-40.45824h27.4944a34.9696 34.9696 0 0 0 34.9696-34.97472c0-19.34336-15.68256-34.91328-34.9696-34.91328h-27.4944c-50.048 0-100.98176 29.5424-113.9456 80.3072-2.44224 9.53344-4.15744 20.22912-4.15744 30.09536v550.912c0 38.912 21.39136 76.65664 55.92064 95.77472a105.02656 105.02656 0 0 0 51.15904 13.184h712.30464c59.19232 0 107.07968-50.37568 107.07968-108.95872l-1.83296-552.63232zM427.88864 235.55072h214.76352a34.9696 34.9696 0 1 0 0-69.94432H427.88864a34.97472 34.97472 0 1 0 0 69.94432z"/>
                  </svg>
                </i>
                <span>签到</span>
              </router-link>
              <a href="javascript:;" class="activity-unit-btn" @click="deleteRow(item)">
                <i>
                  <svg class="icon" width="22px" height="22.00px" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg">
                    <path fill="#8d8d8d"
                          d="M792 232v672H232V232h560m56-56H176v728c0 30.9 25.1 56 56 56h560c30.9 0 56-25.1 56-56V176zM932 176H92c-15.5 0-28 12.5-28 28s12.5 28 28 28h840c15.5 0 28-12.5 28-28s-12.5-28-28-28zM680 120v56H347.5v-56H680m0-56H347.5c-30.9 0-56 25.1-56 56v112H736V120c0-30.9-25.1-56-56-56zM372 344c-15.5 0-28 12.5-28 28v392c0 15.5 12.5 28 28 28s28-12.5 28-28V372c0-15.5-12.5-28-28-28zM512 344c-15.5 0-28 12.5-28 28v392c0 15.5 12.5 28 28 28s28-12.5 28-28V372c0-15.5-12.5-28-28-28zM652 344c-15.5 0-28 12.5-28 28v392c0 15.5 12.5 28 28 28s28-12.5 28-28V372c0-15.5-12.5-28-28-28z"/>
                  </svg>
                </i>
                <span>删除</span>
              </a>
            </div>
            <div class="activity-unit-right" v-if="item.status == 0">
              <el-button plain @click="publicRow(item)">发布活动</el-button>
            </div>
            <div class="clear"></div>
          </div>

          <div class="activity-list-empty text-center" v-show="activityList.length === 0">
            <img src="../../assets/activityList-empty.png" alt="">

            <div v-if="keywordSearchMode">
              <p>没有包含该关键字的活动</p>
            </div>

            <div v-if="! keywordSearchMode">
              <p>当前您没有<span v-show="search.status === '0'">未发布</span><span
                v-show="search.status === '1'">已发布</span><span v-show="search.status === '2'">进行中</span><span
                v-show="search.status === '3'">已结束</span>的活动</p>
              <router-link class="created-btn" :to="{ path:'/public/editActivity', query: { type: 'add'} }">
                创建活动
              </router-link>
            </div>
          </div>

        </div>

        <!--分页器-->
        <div class="block text-center pagination-wrap" v-show="activityList.length !== 0">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            :page-size="5"
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
  import { basicHttp } from "../../router/api.js"

  export default {
    name: "activity-administration",
    data() {
      return {
        keywordSearchMode: false,
        search: {
          status: '0',
          searchTime: [],
          keyword: ''
        },
        statusCount: { //搜索每个状态的活动数
          publicStatus: 0,
          draftStatus: 0,
          doingStatus: 0,
          overStatus: 0,
        },
        activityList: [],
        percentage: '',//保存计算后的报名进度
        pageSize: 10,
        totalList: 2,
        page: 1,
        autoload: true,
        tableData: []
      };
    },
    methods: {
      //选择状态
      changeStatus() {
        let _data = {
          status: this.search.status,
          keyword: this.search.keyword,
        };
        this.getdata(this.page, _data);
      },
      searchName() {
        let _data = {
          status: this.search.status,
          keyword: this.search.keyword,
        };
        this.getdata(this.page, _data);
      },
      //重置搜索内容
      searchNameReseat() {
        this.search.keyword = '';
        let _data = {
          status: this.search.status,
        };
        this.getdata(this.page, _data);
      },
      //发布当行活动
      publicRow(row) {
        var _self = this;
        var _id = row.eventId;

        this.$confirm('是否发布该活动, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          basicHttp({
            method: 'put',
            url: '/event/event/publish',
            data: {
              eventId: _id
            }
          }, function (response) {
            if (response.data.code === '0000') {
              //第一次加载后，设置自动加载为false
              let _data = {
                status: _self.search.status,
                keyword: _self.search.keyword,
              };
              _self.getdata(1, _data);
            }
            _self.$message({
              type: 'success',
              message: '发布成功！'
            });
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发布'
          });
        });

      },
      //删除本行活动
      deleteRow(row) {
        var _self = this;
        this.$confirm('此操作将删除该活动, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          basicHttp({
            method: 'delete',
            url: '/event/event/' + row.eventId,
          }, function (response) {
            //第一次加载后，设置自动加载为false
            let _data = {
              status: _self.search.status,
              keyword: _self.search.keyword,
            };
            _self.getdata(1, _data);
          });

          this.$message({
            type: 'success',
            message: '删除成功！'
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 分页
      init() {
        this.getdata(this.page, {status: this.search.status});
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.getdata(val, {status: this.search.status})
      },
      //获取列表
      getdata(current, data) {
        var _self = this;
        //用于
        if (!data.keyword || data.keyword.length == 0) {
          _self.keywordSearchMode = false;
        } else {
          _self.keywordSearchMode = true;
        }
        var loadingInstance = Loading.service();
        basicHttp({
          method: 'get',
          url: '/event/event',
          params: {
            'page': current,
            'pageSize': 5,
            ...data
          }
        }, function (response) {
          //第一次加载后，设置自动加载为false
          _self.autoload = false;
          _self.totalList = response.data.data.list.totalRecord;
          _self.statusCount.publicStatus = response.data.data.publish
          _self.statusCount.draftStatus = response.data.data.draft
          _self.statusCount.doingStatus = response.data.data.ongoing
          _self.statusCount.overStatus = response.data.data.finish
          _self.activityList = response.data.data.list.list;
          $.each(response.data.data.list.list, function (index, item) {
            item.percentage = item.enroll / item.enrolment * 100;
          });
          loadingInstance.close();
        });
      }
    },
    created() {
      //加载效果
      let loadingInstance = Loading.service();
      //关闭加载效果
      loadingInstance.close();
      if (Boolean(this.autoload)) {
        this.init();
      } else {
        return;
      }
    },
    mounted: function () {
      setTimeout(function () {
        $('.activity-unit-btn').hover(function () {
          $(this).find('path').css('fill', '#03b02a');
          $(this).find('i').css('color', '#03b02a');
          $(this).find('span').css('color', '#03b02a');

        }, function () {
          $(this).find('path').css('fill', '#8d8d8d');
          $(this).find('i').css('color', '#8d8d8d');
          $(this).find('span').css('color', '#8d8d8d');

        })
      }, 500)

    }

  }
</script>

<style>

  .activity-unit-left .el-progress--circle .el-progress__text {
    display: none;
  }

  /*<!--radio样式-->*/
  .el-radio.is-bordered.is-checked {
    border-color: #43b02a;
    color: #43b02a;
  }

  .el-radio__input.is-checked + .el-radio__label {
    color: #43b02a;
  }

  .el-radio.is-bordered {
    border-radius: 0;
  }

  /*活动主题input框颜色效果*/
  .el-input.is-active .el-input__inner, .el-input__inner:focus {
    border-color: #43b02a;
  }

  /*搜索与重置按钮效果*/
  .el-button:focus, .el-button:hover {
    border-color: #43b02a;
    color: white;
    background-color: #43b02a;
  }

  /*<!--radio样式END-->*/
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
        .activity-list-empty {
          p {
            color: #97999b;
            font-size: 24px;
            padding-top: 15px;
            padding-bottom: 25px;
          }
          .created-btn {
            font-size: 16px;
            font-weight: bold;
            display: inline-block;
            padding: 14px 47px;
            background-color: #43b02a;
            color: #ffffff;
            &:hover {
              background-color: lighten(#43b02a, 10%);
            }
          }
        }
        .activity-unit-box {
          border: 1px solid #dce0e2;
          display: table;
          width: 100%;
          margin-bottom: 20px;
          .activity-unit-left {
            display: table-cell;
            padding: 20px 30px;
            position: relative;
            width: 200px;
            .activity-unit-count {
              font-size: 16px;
              position: absolute;
              top: 55px;
              left: 47px;
              width: 92px;
              height: 50px;
              z-index: 99;
              text-align: center;
              background-color: #ffffff;
              span {
                font-size: 26px;
                color: #54657e;
              }
              p {
                font-size: 12px;
                color: #8493a8;
              }
            }
          }
          .activity-unit-middle {
            display: table-cell;
            padding: 20px 0;
            vertical-align: middle;
            .activity-unit-url {
              padding-top: 5px;
              padding-bottom: 15px;
            }
            .activity-unit-btn {
              color: #8d8d8d;
              margin-right: 20px;
              text-decoration: none;
              svg {
                vertical-align: bottom;
              }
             &:hover {
              text-decoration: none;
            }
            }
          }
          .activity-unit-right {
            display: table-cell;
            text-align: center;
            vertical-align: middle;
            border-left: 1px solid #dce0e2;
            width: 200px;
            .el-button {
              border-radius: 0;
              border-color: #03b02a;
              color: #03b02a;
              &:hover {
                background-color: #03b02a;
                color: #ffffff;
              }
            }
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
          label {
            margin-bottom: 0;
          }
          .activity-states-row-title {
            display: inline-block;
            margin-right: 20px;
            font-weight: bold;
          }
        }
        .activity-releaseTime-row {
          padding: 10px 30px;
          .activity-states-row-title {
            font-weight: bold;
          }
          .activity-releaseTime-row-title {
            display: inline-block;
            margin-right: 20px;
          }
        }
      }
    }
  }
</style>
