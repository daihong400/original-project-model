// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import "babel-polyfill";
import router from './router/index';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import { setMetaTitle } from './utils/utils.js';
import $ from 'jquery'
import VueDND from 'awe-dnd'

import echarts from 'echarts'
Vue.prototype.$echarts = echarts;

import axios from 'axios'
Vue.prototype.$axios = axios;

//拖拽排序
Vue.use(VueDND);

Vue.use(ElementUI);

//设置metaTitle
Vue.directive('title', {
  inserted: function (el, binding) {
    setMetaTitle(binding.value)
  }
})

// router.beforeEach((to, from, next) => {
//   console.log(to.fullPath);
//   next();
// })

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render(h){
        return h(App);
    }
})

Vue.filter('setYear',function(value){
  return value.substring(0, 10);

});
Vue.filter('setTime',function(value){
  return value.substring(10, 16);

});

/*
        js由毫秒数得到年月日
        使用： (new Date(data[i].creationTime)).Format("yyyy-MM-dd hh:mm:ss.S")
        */
Date.prototype.Format = function (fmt) { //author: meizz
  if(fmt) {
    var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }

};

