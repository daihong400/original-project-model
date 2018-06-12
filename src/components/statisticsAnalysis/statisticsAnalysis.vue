<template>
  <div class="statisticsAnalysisList-wrap">
    <!--统计分析标题-->
    <div class="createActivityTitle">
      <div class="createActivityTitle-line-wrap text-center">
        <p class="createActivityTitle-line"></p>
      </div>
      <h2>
        统计分析
      </h2>
    </div>

    <div class="statisticsAnalysisList-content-wrap">
      <div class="statisticsAnalysisList-content-box">

        <div class="statisticalAnalysis-head">
          <strong>{{defaultData.eventName}}</strong>
          <span>时间：{{defaultData.eventStartTime}} &nbsp;&nbsp;地点：{{defaultData.eventAddress}}</span>
        </div>
        <div class="statisticalAnalysis-time">
          <div class="statisticalAnalysis-time-left">
            <span class="small-title">浏览量</span><br/>
            <strong>{{defaultData.pv}}</strong>
          </div>
          <div class="statisticalAnalysis-time-left statisticalAnalysis-time-right">
            <span class="small-title">报名人数</span><br>
            <strong>{{defaultData.totalEnrolment}}</strong><span>人</span><span class="green-font"
                                                                               style="position: relative;padding-left: 10px;">
            <div style="position: absolute;left: 2px;top: 1px;height: 10px;">
              <div style="width: 7px;height: 7px;background: #43b02a;transform:rotate(45deg); "></div>
              <div style="width: 12px;height: 6px;background: #ffffff; position: absolute;left: -2px;top: 3px;">
                <div style="width: 4px;height: 6px;background: #43b02a;position: absolute;left: 3.5px;"></div>
              </div>
            </div>

            {{todaySign}}</span>
          </div>
          <div class="statisticalAnalysis-time-left statisticalAnalysis-time-right">
            <span class="small-title">已签到</span><br>
            <strong>{{defaultData.signed}}</strong><span>未签到</span><span class="green-font">{{defaultData.notSign}}</span>
          </div>
          <!--<div class="statisticalAnalysis-time-right">-->
          <!--<a href="javascript:;">导出</a>-->
          <!--</div>-->
          <div class="clear"></div>
          <div style="height: 4px;"></div>
        </div>
        <div class="statisticalAnalysis-content">
          <el-row class="statisticalAnalysis-contentTitle">
            <el-col :span="24" class="statisticalAnalysis-content-left">
              <span class="statisticalAnalysis-content-title">浏览与报名</span>

            </el-col>
            <!--<el-col :span="12">-->
            <!--<span class="statisticalAnalysis-content-title statisticalAnalysis-content-title-two">数据来源</span>-->
            <!--</el-col>-->
          </el-row>
          <el-row>
            <el-col :span="24" class="statisticalAnalysis-content-left">
              <div id="visitCount" class="statisticalAnalysis-content-visitCount"></div>
              <div style="height: 28px;"></div>
            </el-col>
            <!--<el-col :span="12">-->
            <!--<div id="dataSource" class="statisticalAnalysis-content-dataSource"></div>-->
            <!--</el-col>-->
          </el-row>

        </div>

      </div>
    </div>
    <div v-title="'活动管理数据分析平台 | RA内部业务中心'"></div>
  </div>
</template>

<script>
  import {basicHttp} from "../../router/api.js"

  export default {
    name: "statistics-analysis",
    data() {
      return {
        todaySign: null, //今日报名人数
        defaultData: {},
        statisticsDate: {}
      }
    },
    methods: {
      //获取对象最后一个key
      getLastKey(obj) {
        let lastkey="";
        for (let key in obj){
          lastkey=key;
        }
        return lastkey;
      },
      //获取数组中最大数字
      arryMax(arry) {
        var max = arry[0];
        var len = arry.length;
        for (var i = 1; i < len; i++){
          if (arry[i] > max) {
            max = arry[i];
          }
        }
        return max;
      },
      //对象转数组
      jsonToArray(obj) {
        var arr = [];
        for (let i in obj) {
          let o = {};
          o[i] = obj[i];
          arr.push(o)
        }
        return arr;
      },
      //获取统计信息
      getDate() {
        var _self = this;
        basicHttp({
          method: 'get',
          url: '/event/statistics/' + this.$route.query.eventId
        }, function (response) {
          // console.log(response.data);
          _self.defaultData = response.data.data;
          var dataArry = _self.jsonToArray(response.data.data.visit);
          _self.todaySign = response.data.data.visit[_self.getLastKey(response.data.data.visit)].enrolment;
          //柱状图时间数组
          var date = [];
          //当天pc访问量
          var pc = [];
          //当天移动端访问量
          var mobile = [];
          //当天报名人数
          var enrolment = [];
          for(let k=0; k<dataArry.length; k++) {
            for (let i in dataArry[k]){
              date.push(i);
              pc.push(dataArry[k][i].pc);
              mobile.push(dataArry[k][i].mobile);
              enrolment.push(dataArry[k][i].enrolment);
            }
          }


          //y轴最多人数
          let maxPc = _self.arryMax(pc);
          let maxMobile = _self.arryMax(mobile);
          let maxnrolment = _self.arryMax(enrolment);
          let max = [maxPc, maxMobile, maxnrolment];
          let maxY = 10;
          if(_self.arryMax(max) < 10) {//y轴最大值小于10时
            maxY = 10;
          }else if(_self.arryMax(max) > 10 && _self.arryMax(max) < 20) {//y轴最大值大于10小于20时
            maxY = 20;
          }else {//y轴最大值大于20时
            if(_self.arryMax(max)%10 === 0){
              maxY = _self.arryMax(max);
            }else {
              //如果y轴最大值除10不为整数时向上取整
              maxY = _self.arryMax(max) + (10 - _self.arryMax(max)%10);
            }
          }

          let intervalY = 1;
          // Y轴默认只显示10个轴，由数据最大值平分成10份取得对数值，若最大值无法被10整除，则取最近似值
          if(maxY >= 10) {
            intervalY = Math.ceil(maxY/10)
          }

          if(maxY < 20) {
            intervalY = 1;
          }else {
              intervalY = maxY/10
          }


          _self.initEchart(date, pc, mobile, enrolment, maxY, intervalY);
          // 今日报名人数
          _self.todaySign = dataArry[length-1].enrolment;  //会阻断进程
        });
      },
      /**
       * 初始化柱状图
       * @param date 横轴的日期（数组）
       * @param pc pc端访问量
       * @param mobile mobile端访问量
       * @param sign 报名人数
       * @param maxY y轴最大值（算出各日期轴的报名人数）
       * @param intervalY y轴单位大小（Y轴默认只显示10个轴，由数据最大值平分成10份取得对数值，若最大值无法被10整除，则取最近似值）
       */
      initEchart(date, pc, mobile, sign, maxY, intervalY) {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('visitCount'));
        // 绘制图表
        myChart.setOption({
          color: ['#ddd'],
          // title: {
          //   text: '访问预报名'
          // },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            // feature: {
            //   dataView: {show: true, readOnly: false},
            //   magicType: {show: true, type: ['line', 'bar']},
            //   restore: {show: true},
            //   saveAsImage: {show: true}
            // }
          },
          legend: {
            bottom: 0,
            itemWidth: 10,
            itemHeight: 10,
            // itemGap: 10,
            // borderWidth:5,
            // borderRadius: 5,
            data: [{name: '网页端', icon: 'circle'}, {name: '手机端', icon: 'circle'}, '报名人数'],
            textStyle: {
              color: '#75787b',          //legend字体颜色
              // backgroundColor:"red"
            }
          },
          xAxis: [
            {
              type: 'category',
              data: date,
              axisPointer: {
                type: 'shadow'
              },
              axisTick: {show: false},//刻度线
              axisLine: {
                lineStyle: {
                  color: "#dce0e2",
                }
              },
              axisLabel: {//x轴文字
                show: true,
                textStyle: {
                  color: '#999999',
                },
                rotate: -25,
              },
            },

          ],

          yAxis: [
            {
              type: 'value',
              name: '人        ',
              nameTextStyle: {
                color: "#999999",
                align: 'left'
              },
              min: 0,
              max: maxY,
              interval: intervalY,
              splitLine: {//网格线
                lineStyle: {
                  type: 'solid',
                  // 使用深浅的间隔色
                  color: "#dce0e2",
                }
              },
              // axisLabel: {
              //   formatter: '{value}'
              // },
              axisLine: {show: false},
              axisTick: {show: false},
              axisLabel: {//y轴文字
                show: true,
                textStyle: {
                  color: '#999999',
                },
              },
            },
          ],
          series: [
            {
              name: '网页端',
              type: 'bar',
              barWidth: 11,//柱图宽度
              data: pc,
              itemStyle: {
                normal: {
                  barBorderRadius: 3,
                  color: "#0076a8",
                },
              },
            },
            {
              name: '手机端',
              type: 'bar',
              barWidth: 11,//柱图宽度
              data: mobile,
              itemStyle: {
                normal: {
                  barBorderRadius: 3,
                  color: "#43b02a",
                },
              },
            },
            {
              name: '报名人数',
              type: 'line',
              // yAxisIndex: 1,
              data: sign,
              itemStyle: {
                normal: {
                  color: "#e69801",
                },
              },
            }
          ]
        });
      },
      echartsPie() {
        let myChartdataSource = this.$echarts.init(document.getElementById('dataSource'));
        myChartdataSource.setOption({
          tooltip: {
            show: true,
            trigger: 'item',
            position: function (point, params, dom, rect, size) {
              //size参数可以拿到提示框的outerWidth和outerheight，dom参数可以拿到提示框div节点。
              //console.log(dom)可以看到，提示框是用position定位
              var marginW = Math.ceil(size.contentSize[0] / 2);
              var marginH = Math.ceil(size.contentSize[1] / 2);
              dom.style.marginLeft = '-' + marginW + 'px';
              dom.style.marginTop = '-' + marginH + 'px';
              return ['50%', '50%'];
            },
            formatter: function (params, ticket, callback) {
              var num = params.percent;
              var str = '<div style="text-align: center;color:' + params.color + '" id="toolTipBox"><p style="font-size:30px;margin:0px;padding-bottom: 10px;">' + params.percent + '%</p><p style="font-size:14px;margin:0px;">' + params.name + '</p></div>'
              return str
            },
            alwaysShowContent: true,
            backgroundColor: '#FFF',	//设置提示框的背景色
          },
          legend: {
            itemWidth: 14,
            itemHeight: 14,
            bottom: 28,
            data: ['直接访问', '邮件营销', '联盟广告', '搜索引擎'],
            textStyle: {
              color: '#75787b',          //legend字体颜色
            }
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['113', '144'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  // position: "center",
                  // formatter: "{d}%{a}"
                },
                emphasis: {
                  show: false,
                  // textStyle: {
                  //   fontSize: '30',
                  //   fontWeight: 'bold'
                  // }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {value: 335, name: '直接访问', itemStyle: {color: '#00a3e0'}},
                {value: 310, name: '邮件营销', itemStyle: {color: '#0076a8'}},
                {value: 234, name: '联盟广告', itemStyle: {color: '#0097a9'}},
                {value: 1548, name: '搜索引擎', itemStyle: {color: '#97999b'}}
              ]
            }
          ],
        });
        myChartdataSource.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: 0
        });
      },
    },
    mounted() {
      // this.initEchart();
      this.getDate();
    },
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .statisticsAnalysisList-content-wrap {
    width: 100%;
    background-color: #e8eae9;
    padding-top: 26px;
    padding-bottom: 63px;
    .statisticsAnalysisList-content-box {
      width: 1200px;
      background-color: #ffffff;
      padding: 0;
      margin: 0 auto;
      .small-title {
        font-weight: bold;
      }
      .statisticalAnalysis-head {
        font-size: 14px;
        border-bottom: 1px solid rgba(220, 224, 226, 1);
        padding: 19px 40px 17px 40px;
        > span {
          display: block;
          font-size: 14px;
          color: #75787b;
        }
      }
      .statisticalAnalysis-time {
        font-size: 12px;
        border-bottom: 1px solid rgba(220, 224, 226, 1);
        /*padding: 30px 40px 30px 40px;*/
      }
      .statisticalAnalysis-time-left {
        float: left;
        width: 33.3%;
        height: 84px;
        padding: 18px 0 0 40px;
        /*>span {*/
        /*color: #43b02a;*/
        /*letter-spacing: 2px;*/
        /*}*/
      }
      .green-font {
        color: #43b02a;
      }
      .statisticalAnalysis-time-right {
        /*float: right;*/
        border-left: 1px solid #dce0e2;
      }
      .statisticalAnalysis-time-left strong {
        font-size: 30px;
        display: inline-block;
        font-weight: normal;
        padding-right: 12px;
        letter-spacing: 1px;
      }
      .statisticalAnalysis-time-left strong.two {
        padding-left: 20px;
      }
      .statisticalAnalysis-content {
        /*padding: 62px 86px 44px 86px;*/
        border-top: 20px solid #e8eae9;
        background-color: #ffffff;
        .statisticalAnalysis-contentTitle {
          border-bottom: #dce0e2 solid 1px;
        }
        .statisticalAnalysis-content-left {
          border-right: #dce0e2 solid 1px;
        }

        .statisticalAnalysis-content-title {
          padding-left: 40px;
          height: 70px;
          font-size: 16px;
          font-weight: bold;
          font-stretch: normal;
          /*font-weight: bold;*/
          line-height: 70px;
          letter-spacing: 0px;
          color: #2b2b2b;
        }
        .statisticalAnalysis-content-title-two {
          padding-left: 36px;
          font-size: 18px;
          color: #000000;
        }
      }
      .statisticalAnalysis-content-visitCount {
        padding-left: 46px;
        /*width: 520px;*/
        width: 100%;
        height: 426px;
        /*padding-bottom: 28px;*/
        /*display: inline-block;*/
      }
      .statisticalAnalysis-content-dataSource {
        /*padding-left: 46px;*/
        width: 520px;
        height: 454px;
        /*display: inline-block;*/
      }
    }
  }
</style>
