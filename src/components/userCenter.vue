<template>
  <div>
    <div class="user-center-wrap">
      <div class="user-center-box">
        <div class="user-center-title">
          <span>账户信息</span>
          <p></p>
        </div>
        <div class="user-center-title user-center-content">
          <span class="black">德勤工号</span>
          <p>{{ userInfo.staffCode }}</p>
        </div>
        <div class="user-center-title user-center-content">
          <span class="black">员工姓名</span>
          <p>{{ userInfo.username }}</p>
        </div>
        <div class="user-center-title user-center-content">
          <span class="black">德勤邮箱</span>
          <p>{{ userInfo.email }}</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import { basicHttp } from "../router/api.js"
  export default {
    name: "user-center",
    data() {
      return {
        userInfo: {}
      };
    },
    methods: {
      getInfo() {
        var _self = this;
        basicHttp({
          method: 'get',
          url: '/event/user'
        }, function (response) {
          _self.userInfo = response.data.data;
        });
      }
    },
    created() {
      this.getInfo();
    },
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .user-center-wrap {
    height: 100%;
    width: 100%;
    background-color: #e8eae9;
    padding: 42px 0 247px;
  }

  .user-center-box {
    width: 1198px;
    height: 651px;
    margin: 0 auto;
    background-color: #ffffff;
  }

  .user-center-title {
    height: 50px;
    color: #75787b;
    font-size: 18px;
  }

  .user-center-title > p {
    display: inline-block;
    padding-left: 125px;
  }

  .user-center-title .black {
    color: #000000;
  }

  .user-center-title:nth-of-type(even) {
    background-color: #f5f5f5;
  }

  .user-center-title > span {
    display: inline-block;
    width: 115px;
    text-align: right;
    line-height: 50px;
    color: #75787b;
    font-size: 18px;
    font-weight: normal;
  }

  .user-center-content > span {
    font-size: 14px;
  }

  .user-center-content > p {
    font-size: 14px;
    color: #75787b;
  }
</style>
