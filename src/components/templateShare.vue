<template>
  <div id="previewTemplate" class="previewTemplate-wrap">
    <div class="previewTemplate-box">
      <div class="previewTemplate-content-left-box">
        <h4>{{infoRight.name}}</h4>
        <router-link class="gotoActivityAdministration-btn" to="activityAdministration">
          前往活动管理列表
        </router-link>
        <el-card class="box-card">
          <div class="previewTemplate-content-left">
            <tpl-mobile :eventId="eventId"></tpl-mobile>
            <div class="mobile-footer-fixed">
              <a href="javascript:;">立即报名</a>
            </div>
          </div>
        </el-card>
      </div>

      <div class="previewTemplate-content-right">
        <h4>分享活动</h4>
        <p class="warningPrompt">重要提示： 请提前到 <router-link class="activity-unit-btn" :to="{ path:'/public/registerAdministration', query: { eventId:  $route.query.eventId} }"><span>“签到管理”</span></router-link>下载并打印签到二维码，用于活动现场微信扫描进行签到</p>
        <div class="previewTemplate-content-right-left">
          <div class="qrcode-wrap">
            <div>
              <img :src="infoRight.visitQrcode" alt="">
            </div>
            <a :href="'/event/export/qrcode/'+ eventId + '?type=visit'" class="qrcode-text">
              <svg t="1523936423625" class="icon" style="" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="3179" xmlns:xlink="http://www.w3.org/1999/xlink" width="22"
                   height="22">
                <path
                  d="M938.855808 638.776382l0 270.299169c0 27.41028-22.210861 49.634444-49.621141 49.634444l-754.442728 0c-27.41028 0-49.647747-22.224164-49.647747-49.634444L85.144192 638.776382c0-27.41028 22.224164-49.634444 49.634444-49.634444s49.634444 22.224164 49.634444 49.634444l0 220.664725 655.17384 0L839.58692 638.776382c0-27.41028 22.224164-49.634444 49.634444-49.634444S938.855808 611.366102 938.855808 638.776382zM476.55165 701.027168c9.335622 9.534144 22.116717 14.905478 35.46063 14.905478 13.344936 0 26.121937-5.371334 35.461653-14.905478l198.014866-202.167442c19.179828-19.583011 18.85544-51.006697-0.732687-70.190619-19.587104-19.175735-51.016931-18.85544-70.196759 0.731664l-112.924909 115.285676L561.634444 114.924449c0-27.41028-22.224164-49.634444-49.634444-49.634444-27.41028 0-49.634444 22.224164-49.634444 49.634444l0 429.754834L349.473393 429.40077c-19.179828-19.583011-50.590212-19.902282-70.186526-0.731664-19.583011 19.179828-19.910469 50.603515-0.730641 70.190619L476.55165 701.027168z"
                  p-id="3180" fill="#43b02a"></path>
              </svg>
              下载二维码
            </a>
          </div>
        </div>
        <div class="previewTemplate-content-right-right">
          <form class="form-inline">

            <div class="form-group">
              <textarea id="copyUrl" class="copy-bar" v-model="copyUrl"></textarea>
            </div>
            <button type="button" class="btn-copy copy-link-btn" data-clipboard-action="copy"
                    data-clipboard-target="#copyUrl">
              复制链接
            </button>
          </form>
          <div class="previewTemplate-content-right-right-text">
            <h5>热门分享</h5>
            <p>好的活动值得与更多人分享，立即分享至你的社交平台上吧~</p>
            <div>
              <a href="javascript:;" @click="share('weixin')">
                <img src="../assets/share/weixin.svg" width="50"  />
              </a>
                <!--<img src="../assets/share/weixinquan.svg" width="50" />-->
              <!--</a>-->
              <a href="javascript:;" @click="share('sina')">
                <img src="../assets/share/weibo.svg" width="50"  />
              </a>

              <a href="javascript:;" @click="share('QQ')">
                <img src="../assets/share/qq.svg" width="50" />
              </a>
              <a href="javascript:;" @click="share('qzone')">
                <img src="../assets/share/qqspace.svg" width="50" />
              </a>
            </div>
          </div>
        </div>
        <div class="clear"></div>
      </div>
      <div class="clear"></div>
    </div>
    <div v-title="'活动管理数据分析平台 | RA内部业务中心'"></div>
  </div>
</template>

<script>
  import {basicHttp} from "../router/api.js"
  import Clipboard from 'clipboard';
  import tplMobile from '../common/tplMobile.vue'

  export default {
    name: "preview-template",
    components: {
      'tpl-mobile': tplMobile
    },
    data() {
      return {
        iframSrc: '',
        qrCode: '',
        copyUrl: '',
        eventId: '',
        infoRight: {},
      }
    },
    methods: {
      setIframSrc() {
        this.iframSrc = '/event/s/' + this.$route.query.eventId + '?preview=1'
      },
      //获取页面信息
      getInfo() {
        var _self = this;
        basicHttp({
          method: 'get',
          url: '/event/event/' + this.$route.query.eventId
        }, function (response) {
          _self.infoRight = response.data.data;
        });
      },
      copy() {
        var _self = this;
        //复制功能
        var clipboard = new Clipboard('.btn-copy');
        clipboard.on('success', function (e) {
          console.info('Action:', e.action);
          console.info('Text:', e.text);
          console.info('Trigger:', e.trigger);
          _self.$message({
            message: '复制成功',
            type: 'success'
          });
        });
        clipboard.on('error', function (e) {
          console.error('Action:', e.action);
          console.error('Trigger:', e.trigger);
          // 不支持复制
          _self.$message({
            message: '该浏览器不支持复制功能，请手动复制',
            type: 'warning'
          });
        });
      },
      share(to, date) {
        var _title = this.infoRight.name || document.title,//标题
          _source = "" || "来源", //来源
          _sourceUrl,
          _showcount,
          _desc = this.infoRight.name || document.title,//标题
          _summary = this.infoRight.name || document.title,//标题
          _site = "" || "来源", //来源
          _width = 600,
          _height = 600,
          _top = (screen.height - _height) / 2,
          _left = (screen.width - _width) / 2,
          _url = this.copyUrl,//路径
          _pic = this.infoRight.poster,//图片
          _shareUrl;//分享完整路径

        var shareSummary = "我在 @德勤中国DeloitteChina 发现一个不错的活动 #"+ this.infoRight.name +"#，分享给大家";
        var shareSummaryQQorQQZone = "我在 德勤中国 发现一个不错的活动 #"+ this.infoRight.name +"#，分享给大家";

        // var yemian;
        // if(this.$route.path == '/article'){
        //   yemian=12;
        // }else if(this.$route.path == '/'||this.$route.path == '/index.html'){
        //   yemian=3;
        // }else if(this.$route.path == '/detail'){
        //   yemian=8;
        // }
        switch (to) {
          case "sina"://分享到新浪微博
            console.log("分享到新浪微博");
            // toMaidian("分享图标-微博",yemian);
            _shareUrl = 'http://v.t.sina.com.cn/share/share.php?';    //真实的appkey，必选参数
            _shareUrl += '&url=' + encodeURIComponent(_url || document.location);     //参数url设置分享的内容链接|默认当前页location，可选参数
            _shareUrl += '&title=' + encodeURIComponent(encodeURIComponent(shareSummary));    //参数title设置分享的标题|默认当前页标题，可选参数
            // _shareUrl += '&source=' + encodeURIComponent(_source || '');//来源
            _shareUrl += '&sourceUrl=' + encodeURIComponent(_sourceUrl || '');
            _shareUrl += '&content=' + 'utf-8';   //参数content设置页面编码gb2312|utf-8，可选参数
            _shareUrl += '&pic=' + encodeURIComponent(_pic || '');  //参数pic设置图片链接|默认为空，可选参数
            _shareUrl += '&name=' + this.$route.query.name;
            console.log(_shareUrl);
            window.open(_shareUrl, '_blank', 'width=' + _width + ',height=' + _height + ',top=' + _top + ',left=' + _left + ',toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0');
            break;
          case "QQ"://分享到qq
            console.log("分享到QQ");
            // toMaidian("分享图标-QQ", yemian);
            _shareUrl = 'http://connect.qq.com/widget/shareqq/index.html?';
            _shareUrl += 'url=' + encodeURIComponent(_url || document.location);   //参数url设置分享的内容链接|默认当前页location
            // _shareUrl += '&showcount=' + _showcount || 0;      //参数showcount是否显示分享总数,显示：'1'，不显示：'0'，默认不显示
            _shareUrl += '&desc=' + encodeURIComponent(shareSummaryQQorQQZone || '分享的描述');   //参数desc设置分享的描述，可选参数
            _shareUrl += '&summary=' + encodeURIComponent('点击查看详情');   //参数summary设置分享摘要，可选参数
            _shareUrl += '&title=' + encodeURIComponent(_title || document.title);    //参数title设置分享标题，可选参数
            _shareUrl += '&site=' + encodeURIComponent(_site || '');   //参数site设置分享来源，可选参数
            _shareUrl += '&pics=' + encodeURIComponent(_pic || '');   //参数pics设置分享图片的路径，多张图片以＂|＂隔开，可选参数
            _shareUrl += '&name=' + this.$route.query.name;
            window.open(_shareUrl, '_blank', 'width=' + _width + ',height=' + _height + ',top=' + _top + ',left=' + _left + ',toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0');
            break;
            break;
          case "qzone"://分享到QQ空间
            console.log("分享到QQ空间");
            // if (document.location.host != "tac.deloitte.com" || document.location.host != "tac.deloitte.com.cn") {
            //   _url = "https://tac.deloitte.com.cn/4threport/dynamicDetail.html?dynamicId=6";
            // }
            // toMaidian("分享图标-QQ空间",yemian);
            _shareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';
            _shareUrl += 'url=' + encodeURIComponent(_url || document.location);   //参数url设置分享的内容链接|默认当前页location
            // _shareUrl += '&showcount=' + _showcount || 0;      //参数showcount是否显示分享总数,显示：'1'，不显示：'0'，默认不显示
            _shareUrl += '&desc=' + encodeURIComponent(shareSummaryQQorQQZone);    //参数desc设置分享的描述，可选参数
            // _shareUrl += '&summary=' + encodeURIComponent(_summary || '分享摘要');    //参数summary设置分享摘要，可选参数
            _shareUrl += '&title=' + encodeURIComponent(_title || '');    //参数title设置分享标题，可选参数
            //_shareUrl += '&site=' + encodeURIComponent(_site||'');   //参数site设置分享来源，可选参数
            _shareUrl += '&pics=' + encodeURIComponent(_pic || '');   //参数pics设置分享图片的路径，多张图片以＂|＂隔开，可选参数
            _shareUrl += '&name=' + this.$route.query.name;
            window.open(_shareUrl, 'width=' + _width + ',height=' + _height + ',top=' + (screen.height - _height) / 2 + ',left=' + (screen.width - _width) / 2 + ',toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0');
            break;
          case "weixin"://分享到微信
            console.log("分享到微信");
            // toMaidian("分享图标-微信",yemian);
            // $("#share11").append(date.qrcode);
            // document.getElementById('shareImg').src = date.qrcode;
            // $("#about").modal('show');
            this.shareAlert(this.infoRight.visitQrcode);
            break;
          case "weixinzone"://分享到微信
            console.log("分享到微信朋友圈");
            // toMaidian("分享图标-微信朋友圈",yemian);
            // $("#share11").append(date.qrcode);
            // document.getElementById('shareImg').src = date.qrcode;
            // $("#about").modal('show');
            this.shareAlert(this.infoRight.visitQrcode);
            break;
          default:
            break;
        }

      },
        shareAlert(imgurl) {
        this.$alert('<div>' +
          '<img src="'+imgurl+'" width="100%" height="100%">' +
          '<br>打开微信，点击底部的“发现”，使用 “扫一扫” 即可将网页分享到我的朋友圈。'+
          '</div>', '分享到微信朋友圈', {
          dangerouslyUseHTMLString: true,
          center:true,
        });
      },
    },
    created() {
      this.copyUrl = document.location.protocol + '//' + location.host + '/event/s?activity=' + this.$route.query.eventId + '&name=' + this.$route.query.name;
      this.eventId = this.$route.query.eventId;
      this.getInfo();
      this.setIframSrc();
    },
    mounted() {
      var $footer = $(".common-footer");
      $footer.removeClass("fixed-bottom");
      var contentHeight = document.body.scrollHeight,//网页正文全文高度
        winHeight = window.innerHeight;//可视窗口高度，不包括浏览器顶部工具栏
      if (!(contentHeight > winHeight)) {
        //当网页正文高度小于可视窗口高度时，为footer添加类fixed-bottom
        $footer.addClass("fixed-bottom");
      } else {
        $footer.removeClass("fixed-bottom");
      }
      this.copy();
    }
  }
</script>
<style>
  .el-card__body {
    padding: 0;
  }
  .previewTemplate-content-left-box .el-button {
    cursor: default;
  }
</style>
<style scoped lang="less" rel="stylesheet/less">
  .previewTemplate-wrap {
    padding: 40px 0 68px;
    background-color: #e8eae9;
    .previewTemplate-box {
      width: 1200px;
      background-color: #ffffff;
      padding: 45px 84px;
      overflow: hidden;
      margin: 0 auto;
      .previewTemplate-content-left-box {
        position: relative;
        width: 340px;
        display: inline-block;
        float: left;
        margin-right: 20px;
        a.gotoActivityAdministration-btn {
          display: inline-block;
          padding: 13px;
          border: 1px solid #43b02a;
          color: #43b02a;
          margin-top: 13px;
          margin-bottom: 33px;
          font-size: 16px;
          line-height: 16px;
        }
        .previewTemplate-content-left {
          float: left;
          display: inline-block;
          height: 510px;
          width: 340px;
          overflow: hidden;
          overflow-y: auto;
          background-color: gray;
          .mobile-footer-fixed {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 96%;
            z-index: 1000;
            > a {
              display: block;
              text-align: center;
              padding: 16px;
              background-color: #43b02a;
              color: #ffffff;
              cursor: default;
              text-decoration: none;
              /*&:hover {*/
                /*background-color: lighten(#43b02a, 10%);*/
              /*}*/
            }
          }
        }
      }
      .previewTemplate-content-right {
        float: left;
        display: inline-block;
        min-height: 610px;
        min-width: 599px;
        padding-left: 40px;
        border-left: 1px solid #dce0e2;
        >h4 {
          font-family: MicrosoftYaHei-Bold;
        }
        .previewTemplate-content-right-left {
          float: left;
          .qrcode-wrap {
            display: inline-block;
            border: 1px solid #dce0e2;
            div {
              padding: 11px 20px;
            }
            img {
              display: inline-block;
              width: 170px;
              height: 170px;
            }
            a.qrcode-text {
              display: block;
              text-align: center;
              border-top: 1px solid #dce0e2;
              padding: 14px;
              color: #43b02a;
              svg {
                vertical-align: bottom;
              }
            }
          }
        }
        .previewTemplate-content-right-right {
          padding-left: 20px;
          float: left;
          .copy-bar {
            width: 260px;
            resize: none;
          }
          .previewTemplate-content-right-right-text {
            padding-top: 30px;
            h5 {
              font-size: 14px;
              font-weight: bold;
            }
            p {
              font-size: 12px;
              padding-top: 10px;
              padding-bottom: 20px;
            }
          }
          .form-inline .form-control {
            width: 260px;
            height: 44px;
            border-radius: 0;
          }
          .copy-link-btn {
            background-color: #ffffff;
            border-radius: 2px;
            padding: 12px 17px;
            color: #43b02a;
            border: 1px solid #43b02a;
          }
        }
        .warningPrompt {
          margin-bottom: 20px;
          background-color: rgba(222, 205, 17, .25);
          font-size: 12px;
          padding: 10px;
          color: #999999;
          span {
            color: #43b02a;
          }
        }
        h4 {
          border-bottom: 1px solid #dce0e2;
          padding-bottom: 15px;
          margin-bottom: 12px;
        }
      }
    }
  }

</style>
