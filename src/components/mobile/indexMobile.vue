<template>
  <div>
    <div id='wx_pic' style='margin:0 auto;display:none;'>
      <img src='../../assets/webwxgetmsgimg.jpg'/>
    </div>
    <remout-js></remout-js>
    <tpl-mobile :eventId="eventId" v-on:connectAlert="connectAlertParent"></tpl-mobile>
    <div class="footer-fixed">
      <a href="javascript:;" @click="signupNow">立即报名</a>
    </div>

    <div class="modal fade signupModal" id="signupModal" tabindex="-1" role="dialog" data-backdrop="static">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="text-center signupModal-title">关注“德勤风险咨询”<br>即可报名</h4>
          </div>
          <div class="modal-body">
            <img class="img-RaQrCode" :src="info.feedbackQrcode" alt="">
            <p>{{signupModalTip}}</p>
            <div class="signupModal-close-btn-wrap">
              <span class="signupModal-close-btn" @click="closeSignupModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 14 14">
                    <path style="fill: #ffffff;"
                          d="M7.409,7l3-3A0.289,0.289,0,0,0,10,3.587l-3,3-3-3A0.289,0.289,0,0,0,3.587,4l3,3-3,3a0.282,0.282,0,0,0,0,.408,0.282,0.282,0,0,0,.409,0l3-3,3,3a0.282,0.282,0,0,0,.408,0,0.282,0.282,0,0,0,0-.408ZM7,0.583A6.417,6.417,0,1,1,.583,7,6.436,6.436,0,0,1,7,.583M7,0a7,7,0,1,0,7,7A6.983,6.983,0,0,0,7,0H7Z"/>
                  </svg>
              </span>
            </div>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

    <div class="modal fade connetModal" id="connetModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title text-center">联系我们</h3>
          </div>
          <div class="modal-body text-left" style="border-bottom: 0">
            <p style="color: #999999">
              若您需要了解德勤风险咨询、智能应用业务相关产品及服务；请通过以下方式联系我们 :
            </p>
            <div class="col-xs-12" style="padding: 0;">
              <img src="../../assets/Mail_closed_NEG.svg" style="width: 44px;height: 44px;margin-right: 10px;">
              <p class="" style="line-height: 44px;padding: 0;display: inline-block;">{{sponsor.email}}</p>
            </div>
            <div class="col-xs-12" style="padding: 0;">
              <img src="../../assets/Phone_NEG1.svg" style="width: 44px;height: 44px;margin-right: 10px;">
              <p class="" style="line-height: 44px;padding: 0;display: inline-block;">{{sponsor.phone}}</p>
            </div>
            <!--<div class="col-xs-12 " style="padding: 0;">-->
            <!--<p>{{sponsor.summary}}</p>-->
            <!--</div>-->
            <div class="col-xs-12 " style="padding: 0;">
              <img src="../../assets/RaQrCode.png"
                   style="width: 88px;height: 88px;margin-right: 10px;vertical-align: top;margin-top: 2px;">
              <p class="" style="padding: 0;display: inline-block;margin-top: 26px;">德勤风险咨询 <br>微信公众号</p>
            </div>
          </div>
          <div class="modal-footer" style="bottom: 0;">
            <img src="../../assets/Cross_POS.svg" type="button" @click="connectCloseModal()"
                 style="margin-bottom: -120px;width: 22px;height: 22px">
          </div>
        </div>
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <div v-title="$route.query.name + ' | 活动管理数据分析平台'"></div>
  </div>
</template>

<script>
  var wx = require('weixin-js-sdk');
  import tplMobile from '../../common/tplMobile.vue'
  import {basicHttp} from "../../router/api.js"

  export default {
    name: "index-mobile",
    data() {
      return {
        attentioned: false,//已关注为true,直接跳转到报名页
        info: {},
        signupModalTip: '长按图片后，点击“识别图中二维码”',
        eventId: '',
        sponsor: {}
      }
    },
    components: {
      'tpl-mobile': tplMobile,
      remoutJs: {
        render: function (createElement) {
          // alert(location.host);
          var src = "http://da.deloitte.com/userbehavior/js/tracker_vue.js";
          // var src = "http://10.173.41.191:8080/userbehavior/js/tracker_vue.js";
          if (location.host == "tac.deloitte.com.cn") {
            src = "https://tac.deloitte.com.cn/userbehavior/js/tracker_vue.js";
          } else if (location.host == "da.deloitte.com.cn") {
            src = "https://da.deloitte.com.cn/userbehavior/js/tracker_vue.js";
          }
          try {
            return createElement('script', {
              attrs: {
                type: 'text/javascript',
                src: src
              }
            });
          } catch (e) {
          }

        }
      }
    },
    methods: {
      isAttention() {
        var _self = this;
        let ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') { //微信浏览器
          basicHttp({
            method: 'get',
            url: '/event/weixin/subscribe'
          }, function (response) {
            _self.attentioned = true;
          },function(error) {
            var _result = error.data.code;
            if (_result === '0004') {//0004 微信未登陆
              window.location.href = '/event/weixin/oauth?redirect='+ window.location.href;
            }else {
              _self.attentioned = false;
            }
          });
        }
      },
      getInfo() {
        var _self = this;
        basicHttp({
          method: 'get',
          url: '/event/event/' + this.$route.query.activity,
        }, function (response) {
          _self.info = response.data.data;
          $.each(_self.info.sponsor, function (index, item) {
            _self.getSponsor(index, item);
          });
        });

      },
      //拉取主办方详情
      getSponsor(index, sponsorId) {
        var _self = this;
        basicHttp({
          method: 'get',
          url: '/event/sponsor/' + sponsorId,
        }, function (response) {
          _self.sponsor = response.data.data;
        });
      },
      //点击联系我们
      connectAlertParent() {
        $('#connetModal').modal('show');
      },
      //关闭联系我们弹窗
      connectCloseModal() {
        $('#connetModal').modal('hide');
      },
      // 点击报名弹出模态框
      signupNow() {
        if(this.attentioned) {
          //微信已关注的用户直接去报名页
          this.$router.push({path: '/f', query: { eventId: this.$route.query.activity }});
        }else {
          console.log(this.attentioned)
          $('#signupModal').modal('show');
        }
      },
      //关闭模态框
      closeSignupModal() {
        $('#signupModal').modal('hide');
      },
      is_weixin() {
        let ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') { //微信浏览器
          this.signupModalTip = '长按图片后，点击“识别图中二维码”';
        } else {//非微信浏览器
          this.signupModalTip = '保存图片，打开微信扫一扫';
        }
      },
      //分享相关设置
      shareOptions() {
        var _self = this;
        // todo
        $.post('https://tac.deloitte.com.cn/webchatshare/weixin/share', {args: location.href.split('#')[0]}, function (res) { //生产
        // $.post('http://tac.deloitte.com/webchatshare/weixin/share', {args: location.href.split('#')[0]}, function (res) {  //UAT
          if (res.code == 0) {
            console.log(res.data)
            wx.config({
              debug: false,
              appId: res.data.sign.appid,
              timestamp: res.data.sign.timestamp,
              nonceStr: res.data.sign.nonceStr,
              signature: res.data.sign.signature,
              jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'openLocation']
            });
          }
        }, 'json');
        wx.ready(function () {
          var data = {
            title: _self.info.name + " | 活动管理数据分析平台",
            desc: "点击查看详情",
            link: window.location.href,
            imgUrl: "https://tac.deloitte.com.cn/event/static/img/webwxgetmsgimg.df6ff1d.jpg",
            // imgUrl: "http://tac.deloitte.com/event/static/img/RadarMap.5ba092d.png",
            type: 'link'
          };
          wx.onMenuShareTimeline(data);
          wx.onMenuShareAppMessage(data);
          wx.onMenuShareQQ(data);
          wx.onMenuShareWeibo(data);
          wx.onMenuShareQZone(data);
        });
      },
      //设置cookie
      setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
      }
    },
    created() {
      this.eventId = this.$route.query.activity;
      //判断微信是否已关注
      // this.isAttention();
      this.getInfo();

      // 微信转发配置
      this.shareOptions();

    },
    mounted: function () {
      this.is_weixin();
      //删除该cookie
      this.setCookie("activityevent", "", -1);
    },
    beforeDestroy: function () {
      console.log("销毁前！");
      window.onbeforeunload();

    },
    //离开当前页面后执行
    destroyed: function () {

    },
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .footer-fixed {
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 1000;
    > a {
      display: block;
      text-align: center;
      padding: 16px;
      background-color: #43b02a;
      color: #ffffff;
      &:hover {
        background-color: lighten(#43b02a, 10%);
      }
    }
  }

  .signupModal {
    .modal-dialog {
      width: 260px;
      margin: 0 auto;
      margin-top: 20%;
      .modal-content {
        border-radius: 0;
        .modal-body {
          padding-top: 25px;
          padding-bottom: 30px;
          text-align: center;
          .signupModal-close-btn-wrap {
            position: relative;
            display: inline-block;
            width: 1px;
            .signupModal-close-btn {
              position: absolute;
              top: 50px;
              left: -13px;
            }
          }
          .img-RaQrCode {
            width: 100px;
            margin-bottom: 20px;
          }
        }
        .signupModal-title {
          font-size: 18px;
          line-height: 24px;
          color: #43b02a;
          font-weight: bold;
        }
      }
    }
  }

  .connetModal {
    .modal-dialog {
      margin-top: 20%;
    }
    .modal-footer {
      border: 0;
      text-align: center;
    }
  }

</style>
