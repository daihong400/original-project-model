<template>
  <div class="phone-content">
    <div class="phone-content-middle">
      <div class="phone-content-banner" :style="{backgroundImage: 'url(' + info.poster + ')'}">

        <div class="name">{{info.name}}</div>
        <div class="info">
          <div class="banner-info" style="display: table">
            <span style="display: table-cell;width: 26px;">
              <svg class="icon" width="16" height="16" viewBox="0 0 1024 1024" version="1.1" style="vertical-align: text-bottom;"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill="#ffffff"
                      d="M940.218182 107.054545h-209.454546V46.545455h-65.163636v60.50909H363.054545V46.545455H297.890909v60.50909H83.781818c-18.618182 0-32.581818 13.963636-32.581818 32.581819v805.236363c0 18.618182 13.963636 32.581818 32.581818 32.581818h861.090909c18.618182 0 32.581818-13.963636 32.581818-32.581818V139.636364c-4.654545-18.618182-18.618182-32.581818-37.236363-32.581819zM297.890909 172.218182V232.727273h65.163636V172.218182h307.2V232.727273h65.163637V172.218182h176.872727v204.8H116.363636V172.218182h181.527273zM116.363636 912.290909V442.181818h795.927273v470.109091H116.363636z"/>
              </svg>
            </span>
            <div style="display: table-cell;font-size: 13px;">
              {{ info.startTime }} ~ {{ info.endTime }}
            </div>

          </div>
          <div class="banner-info" style="display: table;">
            <div style="display: table-cell;width: 26px;">
              <span class="el-icon-location" style="vertical-align: text-bottom;"></span>
            </div>
            <div style="display: table-cell;font-size: 13px;">
              {{ info.address }}
            </div>
          </div>
          <div class="banner-info sponsor" style="padding-left: 26px;font-size: 13px;">活动由{{sponsorName}}主办</div>
        </div>
      </div>
      <div class="phone-content">
        <div class="detail">
          <div class="unit-title">
            <h3>活动详情</h3>
            <div class="unit-title-line-wrap">
              <div class="unit-title-line"></div>
            </div>
          </div>
          <div class="detail-content">
            <div v-html="info.details"></div>
          </div>
        </div>
        <div class="more" v-show="info.productName || info.productName !== ''">
          <div class="unit-title">
            <h3>更多体验</h3>
            <div class="unit-title-line-wrap">
              <div class="unit-title-line"></div>
            </div>
          </div>
          <div class="more-content">
            <p>你还可点击下方链接体验产品</p>
            <strong style="font-family: ﻿MicrosoftYaHei-Bold;font-size: 16px;">产品：</strong>
            <a id="productLink" :href="info.productUrl" style="font-family: ﻿MicrosoftYaHei-Bold;">{{info.productName}}</a>
          </div>
        </div>
        <div class="sponsor-wrap">
          <div class="unit-title">
            <h3>主办方</h3>
            <div class="unit-title-line-wrap">
              <div class="unit-title-line"></div>
            </div>
          </div>
          <div class="sponsor-content-wrap">
            <div class="sponsor-unit" v-for="(item,index) in sponsor">
              <div class="sponsor-img-wrap">
                <img :src="item.logo" alt="">
              </div>
              <div class="sponsor-name">{{item.name}}</div>
            </div>
          </div>
          <div class="sponsor-content">
            <el-button plain v-on:click="connectAlert">联系我们</el-button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { Loading } from 'element-ui';
  import { basicHttp } from "../router/api.js"
  export default {
    name: "tpl-mobile",
    props: ["eventId"],
    data() {
      return {
        sponsorName: '',
        info: {

        },
        sponsor: []
      }
    },
    methods: {
      changeHtml (val) {
        return val.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/quot;/g, '"').replace(/&#40;/g, '(').replace(/&#41;/g, ')');
      },
      connectAlert () {
        this.$emit('connectAlert')
      },
      //拉取主办方详情
      getSponsor (index,sponsorId) {
        var _self = this;
        basicHttp({
          method:'get',
          url:'/event/sponsor/'+ sponsorId,
        }, function (response) {
          _self.$set(_self.sponsor,index,response.data.data)
          _self.sponsorName = response.data.data.name;
        });
      },
      //拉取页面主要内容
      getInfo () {
        var _self = this;
        var loadingInstance = Loading.service();
        this.$axios({
          method:'get',
          url:'/event/event/'+ this.eventId + '?t=' + new Date().getTime(),
        }).then(function(response) {
          _self.info = response.data.data;
          //如果是预览页用iframe加载的话产品链接打开新窗口
          if(_self.$route.query.page === 'preview') {
            let _productUrl = _self.info.productUrl;
            _self.info.productUrl = 'javascript:;';
            $('#productLink').click(function() {
              window.open(_productUrl);
            })
          }
          _self.info.startTime = _self.info.startTime.substring(0, 16);
          _self.info.endTime = _self.info.endTime.substring(0, 16);
          //用获取到的主办方id，去加载主办方信息，每个id一个ajax
          $.each(_self.info.sponsor, function(index, item) {
            _self.getSponsor(index,item);
          });
          setTimeout(function() {
            $('.detail-content img').attr({'style': '','width': '','height': ''}).css({'width': '100%'}).parent().attr('style','').css({'width': '100%'});
          },200);
          loadingInstance.close();
        });
      },
    },
    created() {
      this.getInfo();
    },
    mounted: function () {

    },
    deactivated () {
      this.$destroy(true)
    }

  }
</script>
<style>
  .list-paddingleft-2 {
    padding-left: 30px;
  }
  div .footer-fixed>a:link {
    text-decoration: none;
  }
  div .footer-fixed>a:visited {
    text-decoration: none;
  }
  div .footer-fixed>a:hover {
    text-decoration: none;
  }
  div .footer-fixed>a:active {
    text-decoration: none;
  }
  .detail-content img {
    width: 100%;
  }
</style>
<style scoped lang="less" rel="stylesheet/less">
  .phone-content {
    .unit-title {
      position: relative;
      text-align: center;
      h3 {
        display: inline-block;
        position: relative;
        padding: 0 20px;
        color: #43b02a;
        z-index: 10;
        margin-top: 0;
        font-weight: bold;
        background-color: #ffffff;
      }
      .unit-title-line-wrap {
        height: 1px;
        width: 200px;
        margin: 0 auto;
        .unit-title-line {
          position: absolute;
          top: 15px;
          height: 1px;
          width: 200px;
          border-top: 1px solid #43b02a;
        }
        .unit-title-line:before {
          content: '';
          display: inline-block;
          width: 15px;
          height: 15px;
          background-color: #ffffff;
          border: 1px solid #43b02a;
          border-radius: 15px;
          position: absolute;
          right: 0;
          top: -8px;
        }
        .unit-title-line:after {
          content: '';
          display: inline-block;
          width: 15px;
          height: 15px;
          background-color: #ffffff;
          border: 1px solid #43b02a;
          border-radius: 15px;
          position: absolute;
          left: 0;
          top: -8px;
        }
      }
    }
    .phone-content-middle {
      .phone-content-banner {
        width: 100%;
        background-size: cover;
        text-align: center;
        color: #ffffff;
        padding-top: 80px;
        .name {
          position: relative;
          font-size: 23px;
          font-weight: bold;
          padding: 30px 15px;
          width: 300px;
          margin: 0 auto;
          border-left: 1px solid #ffffff;
          border-right: 1px solid #ffffff;
        }
        .name:after {
          content: '';
          position: absolute;
          top: 10px;
          left: -20px;
          width: 340px;
          height: 1px;
          border-top: 1px solid #ffffff;
        }
        .name:before {
          content: '';
          position: absolute;
          bottom: 10px;
          right: -20px;
          width: 340px;
          height: 1px;
          border-bottom: 1px solid #ffffff;
        }
        .info {
          max-width: 408px;
          margin: 0 auto;
          font-size: 16px;
          padding: 50px 30px 30px 30px;
          text-align: left;
          .banner-info {
            padding-bottom: 10px;
          }
        }
      }

      .phone-content {
        .sponsor-wrap {
          .unit-title {
            h3 {
              margin-top: 0;
              background-color: #ecf7e9;
            }
          }
          background-color: #ecf7e9;
          padding-top: 30px;
          padding-bottom: 80px;
          .sponsor-content {
            padding: 20px 30px 40px 30px;
            text-align: center;
            .el-button {
              color: #43b02a;
              border-radius: 0;
              border-color: #43b02a;
              padding: 18px 50px;
              background-color: transparent;
              font-size: 16px;
              font-weight: bold;
            }
          }
          .sponsor-content-wrap {
            text-align: center;
            padding-top: 35px;
            .sponsor-unit {
              .sponsor-img-wrap {
                display: inline-block;
                height: 100px;
                width: 100px;
                overflow: hidden;
                border: 2px solid #43b02a;
                border-radius: 100px;
                background-color: #ffffff;
                img {
                  width: 100px;
                  height: 100px;
                }
              }
              .sponsor-name {
                padding-top: 10px;
                font-size: 14px;
              }
            }

          }
        }
        .more {
          background-color: #ffffff;
          .more-content {
            padding: 16px 30px 40px 30px;
            text-align: center;
            >p {
              padding-bottom: 16px;
              font-size: 14px;
            }
            >a {
              color: #00a3e0;
              font-size: 16px;
              font-weight: bold;
            }
          }
        }
        .sponsor {
          font-size: 16px;
        }
        .detail {
          background-color: #ffffff;
          color: #000000;
          width: 100%;
          padding-top: 30px;
          .detail-content {
            font-family: "Microsoft YaHei";
            padding: 40px 30px;
            max-width: 800px;
            margin: 0 auto;
          }
        }
      }
    }

  }
</style>
