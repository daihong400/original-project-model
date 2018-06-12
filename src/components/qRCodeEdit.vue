<template>
  <div>
    <qr-code></qr-code>
    <div v-title="'活动管理数据分析平台 | RA内部业务中心'"></div>
  </div>
</template>

<script>
  import qrCode from '../common/qRCode.vue'

  export default {
    name: "q-r-code-edit",
    components: {
      'qr-code': qrCode
    },
  }
</script>

<style scoped>

</style>
