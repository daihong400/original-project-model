<template>
  <div>
    <my-header></my-header>
    <!--定义路由插座-->
    <router-view></router-view>
    <!--可以定义不变的内容-->
    <my-footer></my-footer>
  </div>
</template>

<script>
  import myHeader from '../common/common-header'
  import myFooter from '../common/common-footer'

  export default {
    name: "public-index",
    components: {
      myHeader: myHeader,
      myFooter: myFooter
    }
  }
</script>

<style scoped>

</style>
