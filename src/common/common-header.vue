<template>
  <div>
    <nav class="navbar navbar-inverse navbar-fixed-top header" role="navigation" style="border-radius: 0;">
      <div class="container-fluid">
        <div class="header-container-fluid-box">
          <div class="navbar-header">
            <router-link class="navbar-brand" to="/public/home" @click.native="changeActive = 0">
              <img src="../assets/deloitte.svg" alt="">
            </router-link>
          </div>
          <ul class="nav navbar-nav navbar-left header-major-menu">
            <li v-for="(x,index) in menulist" :class="{ active:changeActive == index }" @click="menuActive(index)">
              <router-link :to="{ path: x.name }" active-class="active">
                {{ x.text }}
              </router-link>
            </li>
            <li class="QRCode-generate-nav-wrap" >
                  <a href="javascript:;" :class="{ activeLi:changeActive == 3 }">
                    二维码生成器
                  </a>
                <ul class="QRCode-nav-secondary">
                  <li>
                    <router-link :to="{ path: '/public/qRCodeGenerate' }">二维码生成</router-link>
                  </li>
                  <li>
                    <router-link :to="{ path: '/public/qRCodeAdministration' }">二维码管理</router-link>
                  </li>
                </ul>
            </li>
          </ul>
          <div class="collapse navbar-collapse" id="example-navbar-collapse">
            <ul class="nav navbar-nav navbar-right">
              <li class="dropdown">
                <a href="javascript:;" class="dropdown-toggle userIfo-toggle-btn" data-toggle="dropdown">
                  <span>{{userInfo.username}}</span>
                  <b class="caret"></b>
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <router-link to="/public/userCenter">个人中心</router-link>
                  </li>
                  <li><a href="/event/user/logout">退出登录</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <div class="nav-height"></div>
    <!--RA内部业务中心导航栏副标题-->
    <div class="nav-attached">
      <div class="nav-attached-inner">
        <span>RA</span>
        <i>内部业务中心</i>
      </div>
    </div>
  </div>
</template>

<script>
  import {basicHttp} from "../router/api.js"

  export default {
    data() {
      return {
        title: "header",
        userInfo: {
          username: ''
        },
        menulist: [
          {
            "text": "首页",
            "name": "/public/home"
          },
          {
            "text": "创建活动",
            "name": "/public/createActivity"
          },
          {
            "text": "活动管理",
            "name": "/public/activityAdministration"
          }
        ],
        changeActive: 0
      }
    },
    methods: {
      menuActive: function (index) {
        this.changeActive = index;
      },
      //获取路由改变
      getStatus(urlStr) {
        var urlStrArr = urlStr.split('/')
        return urlStrArr[urlStrArr.length - 1]
      }
    },
    created() {
      var _self = this;
      basicHttp({
        method: 'get',
        url: '/event/user'
      }, function (response) {
        _self.userInfo.username = response.data.data.username;
      });
      switch (this.$route.path) {
        case '/public/home':
          this.changeActive = 0;
          break;
        case '/public/createActivity':
          this.changeActive = 1;
          break;
        case '/public/qRCodeAdministration':
          this.changeActive = 3;
          break;
        case '/public/qRCodeGenerate':
          this.changeActive = 3;
          break;
        case '/public/activityAdministration':
          this.changeActive = 2;
          break;
      }
    },
    mounted: function () {
      $('.QRCode-generate-nav-wrap').hover(function () {
        $(this).find('ul').show();
      }, function () {
        $(this).find('ul').hide();
      });
    },
    watch: {
      $route(data){
        console.log(data.path)
        //编辑页到创建页刷新页面
        // if(data.path.indexOf('/public/editActivity') >= 0 && data.query.type === undefined) {
        //   this.$router.go(0)
        // }
        switch (this.$route.path) {
          case '/public/home':
            this.changeActive = 0;
            break;
          case '/public/createActivity':
            this.changeActive = 1;
            break;
          case '/public/qRCodeAdministration':
            this.changeActive = 3;
            break;
          case '/public/qRCodeGenerate':
            this.changeActive = 3;
            break;
          case '/public/activityAdministration':
            this.changeActive = 2;
            break;
        }
      }
    }
  }
</script>
<style>
  @media (min-width: 768px) {
    .navbar-fixed-top .navbar-nav > li {
      float: none;
    }
    .navbar-header {
      position: absolute;
      z-index: 999;
    }
  }

  .container-fluid {
    position: relative;
    padding: 0;
  }

  .navbar-left {
    width: 100%;
    position: absolute;
    text-align: center;
  }

  .navbar-left.nav > li {
    display: inline-block;
  }

  @media (min-width: 768px) {
    .navbar > .container .navbar-brand, .navbar > .container-fluid .navbar-brand {
       margin-left: 0;
    }
  }

</style>
<style scoped lang="less" rel="stylesheet/less">
  @deloitte-text-green: #03b02a;
  .QRCode-generate-nav-wrap {
    position: relative;
    .QRCode-nav-secondary {
      display: none;
      position: absolute;
      top: 58px;
      background-color: #ffffff;
      -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
      box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
      li {
        a {
          display: inline-block;
          font-size: 14px;
          color: #000000;
          width: 114px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          &:hover {
            background-color: #03b02a;
            color: #ffffff;
            text-decoration: none;
          }
        }
      }
    }
  }

  .navbar {
    min-height: 59px;
  }

  .navbar-brand > img {
    width: 120px;
  }

  .dropdown-menu {
    padding: 0;
    border-radius: 0;
  }

  .dropdown-menu > li > a {
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    text-align: center;
  }

  .dropdown-menu > li > a:hover, .dropdown-menu > li > a:focus {
    background: @deloitte-text-green;
    color: #ffffff;
  }

  .navbar-inverse .navbar-nav > .active > a, .navbar-inverse .navbar-nav > .active > a:hover, .navbar-inverse .navbar-nav > .active > a:focus {
    padding: 7px 13px;
    margin-top: 15px;
    background-color: @deloitte-text-green;
    line-height: 14px;
  }

  .container-fluid {
    max-width: 1200px;
    margin: 0 auto;
  }

  .navbar-header .navbar-brand {
    height: 59px;
    padding: 15px 0;
  }

  .navbar-nav > li > a {
    line-height: 29px;
  }

  .nav-height {
    height: 59px;
  }

  .nav-attached {
    width: 100%;
    height: 40px;
    background-color: #53565A;
  }

  .nav-attached-inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  .nav-attached-inner>span {
    font-weight: bold;
  }

  .nav-attached-inner>i {
    font-weight: bold;
  }

  .nav-attached span {
    color: #ffffff;
    line-height: 40px;
  }

  .nav-attached i {
    color: #43b02a;
    line-height: 40px;
  }
  .activeLi::after{
    content: '二维码生成器';
    color: white;
    background-color: #03b02a;
    position: absolute;
    width: 100%;
    height: 28px;
    top: 15px;
    left: 0;
    opacity: 1;
  }
</style>
