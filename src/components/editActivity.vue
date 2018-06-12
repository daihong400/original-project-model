<template>
  <div>
    <edit-template></edit-template>
    <div v-title="'活动管理数据分析平台 | RA内部业务中心'"></div>
  </div>
</template>

<script>
  import editTemplate from '../common/editTemplate.vue'

  export default {
    name: "edit-activity",
    components: {
      'edit-template': editTemplate
    },
  }
</script>

<style scoped>

</style>
