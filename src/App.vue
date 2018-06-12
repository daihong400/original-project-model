<template>
  <div id="app" class="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import myHeader from './common/common-header'
  import myFooter from './common/common-footer'

  export default {
    name: 'app',
    data() {
      return {
        name1: '张三',
        age: 29
      }
    },
    components: {
      myHeader: myHeader,
      myFooter: myFooter
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  html,body {
    height: 100%;
  }
  body {
    background-color: #e8eae9;
  }
  body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td {
    margin: 0;
    padding: 0;
  }

  ul, ol {
    list-style: none;
  }

  a {
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
  }

  .clear {
    clear: both;
  }

  .app {
    height: 100%;
  }
  /*页面公共title*/
  .createActivityTitle {
    position: relative;
    text-align: center;
    height: 130px;
    background-color: #ffffff;
  }

  .createActivityTitle h2{
    font-size: 40px;
    position: relative;
    z-index: 9;
    display: inline-block;
    line-height: 130px;
    min-width: 168px;
    font-weight: normal;
    background-color: #ffffff;
    margin: 0;
    padding: 0 20px;
  }

  .createActivityTitle-line-wrap {
    width: 100%;
    position: absolute;
    top: 66px;
    margin: 0;
  }

  .createActivityTitle-line {
    display: inline-block;
    vertical-align: top;
    height: 2px;
    width: 320px;
    background-color: #a0a0a0;
  }
  .navbar-fixed-top {
    z-index: 2000;
  }
  .ele-alert {
    top:230px;
  }
</style>


