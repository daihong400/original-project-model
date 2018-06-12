<template>
  <div id="previewTemplate" class="previewTemplate-wrap">
    <div class="phone-wrap">
      <img class="phone-bg" src="../assets/phone_bg.png" alt="">
      <div class="phone-header-absolute">
        <div class="phone-header-wrap">
          <img class="phone-header" src="../assets/phone_top_weichat.png" alt="">
          <!--<p>活动名称</p>-->
        </div>
      </div>
      <div class="mobile-wrap">
        <!--<tpl-mobile :eventId="eventId"></tpl-mobile>-->
        <iframe style="width: 100%;height: 620px;" :src="iframUrl"></iframe>
      </div>
    </div>
    <div v-title="$route.query.name + ' | 活动管理数据分析平台'"></div>
  </div>
</template>

<script>
  import  tplMobile from '../common/tplMobile.vue'
  import { basicHttp } from "../router/api.js"
  export default {
    name: "template-preview",
    components: {
      'tpl-mobile': tplMobile
    },
    data() {
      return {
        iframUrl : document.location.protocol + '//' + location.host + '/event/s/?activity='+ this.$route.query.eventId + '&t=' + new Date().getTime() + '&page=preview',
        eventId: '',
      }
    },
    methods: {

    },
    created() {
      this.eventId = this.$route.query.eventId;
    },
    mounted: function () {

    }
  }
</script>

<style>
</style>
<style scoped lang="less" rel="stylesheet/less">
  .phone-wrap {
    position: relative;
    width: 462px;
    margin: 50px auto;
    .phone-bg {
      width: 462px;
    }
    .mobile-wrap {
      position: absolute;
      width: 403px;
      height: 680px;
      overflow: hidden;
      /*overflow-y: auto;*/
      z-index: 10;
      top: 75px;
      left: 39px;
      border-radius: 5px;
      padding-top: 66px;
    }

  }
  .phone-header-absolute {
    position: absolute;
    z-index: 100;
    top: 75px;
    left: 39px;
  }
  .phone-header-wrap {
    position: relative;
    .phone-header {
      width: 386px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    > p {
      position: absolute;
      color: #ffffff;
      top: 33px;
      left: 162px;
      font-size: 18px;
    }
  }

</style>
