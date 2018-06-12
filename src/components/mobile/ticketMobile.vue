<template>
  <div class="tacket-wrap">
    <div class="tacket-unit">
      <div class="tacket-name">
        {{ticketInfo.eventName}}
      </div>
      <div class="tacket-name-line"></div>
      <div class="detail">
        <div class="time">
          <div class="time-left">
            <div class="timing">{{ticketInfo.startTime | setYear}}</div>
            <div class="date">{{ticketInfo.startTime | setTime}}</div>
          </div>
          <div class="time-middle">
            <img src="../../assets/tacket-time-arrow.png" alt="">
          </div>
          <div class="time-right">
            <div class="timing">{{ticketInfo.endTime | setYear}}</div>
            <div class="date">{{ticketInfo.endTime | setTime}}</div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="address">
          <i class="el-icon-location"></i>
          <span>{{ticketInfo.address}}</span>
        </div>
      </div>
      <div class="info">
        <div class="info-wrap">
          <div class="info-unit">
            <div class="title">参会者</div>
            <div class="content">{{ticketInfo.user}}</div>
          </div>
          <div class="signUp-code-wrap">
            <div class="signUp-code-title">报名号</div>
            <div class="signUp-code-box">
              {{ticketInfo.code}}
            </div>
          </div>
        </div>
      </div>
      <div class="tacket-footer">
        <router-link :to="{ path: '/s', query: { activity:  this.$route.query.eventId, name: ticketInfo.eventName}}">活动详情 <span>&gt;</span></router-link>
        <!--<span>&nbsp; | &nbsp;</span>-->
        <!--<a href="">添加到日历 <span>&gt;</span></a>-->
      </div>
    </div>
    <div v-title="'活动管理数据分析平台 | RA内部业务中心'"></div>
  </div>
</template>

<script>

  export default {
    name: "tacket-mobile",
    data() {
      return {
        eventId: '',
        ticketInfo: {
          eventName: '',
          startTime: '',
          endTime: '',
          address: '',
          user: '',
          code: '',
        }
      }
    },
    methods: {
      //获取票券信息
      checkWeiChart() {
        var _self = this;
        var _eventId = _self.$route.query.eventId;
        if (_eventId) {
          this.$axios({
            method: 'get',
            url: '/event/feedback/ticket/' + _eventId
          }).then(function (response) {
            var _result = response.data.code;
            if (_result === '0000') {
              _self.ticketInfo = response.data.data;
            }else if (_result === '0004') { //没有登陆
              window.location.href = '/event/weixin/oauth?redirect='+ window.location.href;
            }else if(_result === '1300') { //用户没有报名
              _self.$alert('立即报名获取活动电子票', '提示', {
                confirmButtonText: '报名',
                customClass: 'ticket-notEnroll-mobile-modal',
                callback: action => {
                  _self.$router.push({path: '/s', query: {activity: _eventId, name: _self.ticketInfo.eventName}});
                }
              });
            }
          });
        }
      },
    },
    created() {
      this.checkWeiChart();
    },
  }
</script>

<style>
  .ticket-notEnroll-mobile-modal.el-message-box {
    width: 80%;
  }
  .ticket-notEnroll-mobile-modal .el-message-box__headerbtn {
    display: none;
  }
  .ticket-notEnroll-mobile-modal .el-button--primary {
    background-color: #03b02a;
    border-color: #03b02a;
  }
  .ticket-notEnroll-mobile-modal .el-button--primary.is-active, .ticket-notEnroll-mobile-modal .el-button--primary:active {
    background-color: #03b02a;
    border-color: #03b02a;
  }
  .ticket-notEnroll-mobile-modal .el-button--primary:focus, .ticket-notEnroll-mobile-modal .el-button--primary:hover {
    background-color: #03b02a;
    border-color: #03b02a;
  }
</style>
<style scoped lang="less" rel="stylesheet/less">
  .tacket-wrap {
    height: 100%;
    text-align: center;
    padding: 16px 27px;
    background-color: #ffffff;
    .tacket-unit {
      background: -moz-linear-gradient(top, #43b02a 0%, #86bc25 100%);
      background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #43b02a), color-stop(100%, #86bc25));
      background: -webkit-linear-gradient(top, #43b02a 0%, #86bc25 100%);
      background: -o-linear-gradient(top, #43b02a 0%, #86bc25 100%);
      background: -ms-linear-gradient(top, #43b02a 0%, #86bc25 100%);
      background: linear-gradient(to bottom, #43b02a 0%, #86bc25 100%);
      width: 100%;
      padding-top: 20px;
      padding-bottom: 16px;
      .tacket-name-line {
        height: 1px;
        width: 100%;
        border: 1px dashed #ffffff;
        position: relative;
        &:before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 20px;
          background-color: #ffffff;
          position: absolute;
          border-radius: 20px;
          left: -10px;
          top: -10px;
        }
        &:after {
          content: '';
          display: inline-block;
          width: 20px;
          height: 20px;
          background-color: #ffffff;
          position: absolute;
          border-radius: 20px;
          right: -10px;
          top: -10px;
        }
      }
      .tacket-name {
        text-align: center;
        font-size: 17px;
        color: #ffffff;
        font-weight: bold;
        padding: 0 20px 15px 20px;
      }
      .detail {
        padding: 23px 27px 19px 27px;
        .time {
          color: #ffffff;
          text-align: center;
          overflow: hidden;
          > div {
            display: inline-block;
          }
          .time-left {
            float: left;
          }
          .time-middle {
            position: relative;
            top: 12px;
            img {
              width: 40px;
              vertical-align: bottom;
            }
            padding: 10px 0;
          }
          .time-right {
            float: right;
          }
          .timing {
            font-size: 12px;
            opacity: .5;
          }
          .date {
            font-size: 30px;
          }
        }
        .address {
          text-align: left;
          color: #ffffff;
          padding-bottom: 19px;
          border-bottom: 1px dashed #ffffff;
        }
      }
      .info {
        padding: 0 27px 0 27px;
        .info-wrap {
          border-bottom: 1px dashed #ffffff;
          text-align: left;
          padding-bottom: 20px;
          color: #ffffff;
          .signUp-code-wrap {
            text-align: center;
            padding-top: 25px;
            padding-bottom: 15px;
            .signUp-code-box {
              border: 2px solid #ffffff;
              border-radius: 40px;
              display: inline-block;
              text-align: center;
              padding: 4px 24px;
              font-weight: bold;
              font-size: 36px;
            }
            .signUp-code-title {
              padding-top: 6px;
              padding-bottom: 4px;
              font-size: 12px;
              opacity: .5;
            }
          }
          .info-unit {
            display: block;
            text-align: center;
            padding-bottom: 10px;
            .title {
              font-size: 12px;
              opacity: .5;
            }
            .content {
              font-size: 16px;
            }
          }
        }

      }
      .tacket-footer {
        padding: 16px 0;
        padding-bottom: 0;
        color: #ffffff;
        a {
          color: #ffffff;
        }
      }
    }
  }
</style>
