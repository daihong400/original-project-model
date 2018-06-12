import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../components/Home.vue'  // 导入组件Home
// import Public from '../components/publicIndex.vue'  // 导入组件Home
// import CreateActivity from '../components/createActivity.vue'
// import EditActivity from '../components/editTemplate.vue'
// import statisticsAnalysis from '../components/statisticsAnalysis/statisticsAnalysis.vue'
// import statisticsAnalysisList from '../components/statisticsAnalysisList/statisticsAnalysisList.vue'
// import activityAdministration from '../components/activityAdministration/activityAdministration.vue'
// import templateShare from '../components/templateShare.vue'
// import templatePreview from '../components/templatePreview.vue'
// import indexMobile from '../components/indexMobile.vue'
// import qRCodeGenerate from '../components/qRCodeGenerate.vue'
// import qRCodeAdministration from '../components/qRCodeAdministration.vue'
// import signIn from '../components/signIn.vue'

const Home = r => require.ensure( [], () => r (require('../components/Home.vue')));
const Public = r => require.ensure( [], () => r (require('../components/publicIndex.vue')));
const CreateActivity = r => require.ensure( [], () => r (require('../components/createActivity.vue')));
const editActivity = r => require.ensure( [], () => r (require('../components/editActivity.vue')));
const statisticsAnalysis = r => require.ensure( [], () => r (require('../components/statisticsAnalysis/statisticsAnalysis.vue')));
const statisticsAnalysisList = r => require.ensure( [], () => r (require('../components/statisticsAnalysisList/statisticsAnalysisList.vue')));
const activityAdministration = r => require.ensure( [], () => r (require('../components/activityAdministration/activityAdministration.vue')));
const templateShare = r => require.ensure( [], () => r (require('../components/templateShare.vue')));
const templatePreview = r => require.ensure( [], () => r (require('../components/templatePreview.vue')));
const indexMobile = r => require.ensure( [], () => r (require('../components/mobile/indexMobile.vue')));
const ticketMobile = r => require.ensure( [], () => r (require('../components/mobile/ticketMobile.vue')));
const qRCodeEdit = r => require.ensure( [], () => r (require('../components/qRCodeEdit.vue')));
const qRCodeGenerate = r => require.ensure( [], () => r (require('../components/qRCodeGenerate.vue')));
const qRCodeAdministration = r => require.ensure( [], () => r (require('../components/qRCodeAdministration.vue')));
const registerAdministration = r => require.ensure( [], () => r (require('../components/registerAdministration.vue')));
const userCenter = r => require.ensure( [], () => r (require('../components/userCenter.vue')));
const signInMobile = r => require.ensure( [], () => r (require('../components/mobile/signInMobile.vue')));
const enroll = r => require.ensure( [], () => r (require('../components/enroll.vue')));
Vue.use(Router)

export default new Router({
    // base:'/event/',
    mode: 'history', // 使用HTML5 History默认是哈希值的方式 打包要去掉
    routes: [
      {
        path: '/public', component: Public,
        children: [
          {path: '/public/home', component: Home},
          {path: '/public/createActivity', component: CreateActivity},
          {path: '/public/editActivity', component: editActivity},
          {path: '/public/activityAdministration', component: activityAdministration},
          {path: '/public/statisticsAnalysis', component: statisticsAnalysis}, //统计分析
          {path: '/public/statisticsAnalysisList', component: statisticsAnalysisList}, //统计分析管理
          {path: '/public/templateShare', component: templateShare},
          {path: '/public/templatePreview', component: templatePreview}, //模板预览
          {path: '/public/qRCodeEdit', component: qRCodeEdit},
          {path: '/public/qRCodeGenerate', component: qRCodeGenerate},
          {path: '/public/qRCodeAdministration', component: qRCodeAdministration},
          {path: '/public/registerAdministration', component: registerAdministration},  //签到管理
          {path: '/public/userCenter', component: userCenter},  //用户中心
          {path: '/public/enroll', component: enroll},  //报名管理
        ]
      },
      {path: '/s', component: indexMobile}, //用户用手机访问的页面
      {path: '/t', component: ticketMobile}, //手机票券
      {path: '/f', component: signInMobile}, //手机报名页
      {path: '*', redirect: '/public/home'}
    ]
})
