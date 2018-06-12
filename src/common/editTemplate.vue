<template>
  <div>
    <div class="createActivityTitle">
      <div class="createActivityTitle-line-wrap text-center">
        <p class="createActivityTitle-line"></p>
      </div>
      <h2>
        {{pageTitle}}
      </h2>
    </div>

    <div class="edit-wrap">
      <div class="edit-box">
        <el-form :label-position="'left'" :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm"
                 label-width="100px" class="demo-ruleForm">
          <div class="edit-content">

            <div class="edit-title-wrap">
              <div class="edit-content-title">
                活动信息
                <div class="title-right">EVENT INFORMATION</div>
              </div>
            </div>
            <div class="row-wrap">

              <el-form-item label="活动名称" prop="name">
                <el-input placeholder="请输入活动名称" v-model="ruleForm.name"></el-input>
              </el-form-item>

              <div class="event-time-wrap">
                <label style="width: 100px;display: inline-block;margin-bottom: 10px;">活动时间</label>
                <div class="date-wrap startDate">
                  <input id="startDate" v-model="ruleForm.startTime" type="text" readonly>
                  <span></span>
                </div>
                <span style="display: inline-block;width: 25px;text-align: center;margin-right: 3px;">-</span>
                <div class="date-wrap endDate">
                  <input id="endDate" v-model="ruleForm.endTime" type="text" readonly>
                  <span></span>
                </div>
              </div>

              <!--<el-form-item class="event-time-wrap" label="活动时间" required>-->
              <!--<el-date-picker-->
              <!--v-model="ruleForm.time"-->
              <!--type="datetimerange"-->
              <!--range-separator="-"-->
              <!--format="yyyy-MM-dd hh:mm"-->
              <!--start-placeholder="开始日期"-->
              <!--end-placeholder="结束日期"-->
              <!--&gt;-->
              <!--</el-date-picker>-->

              <!--<el-row>-->
              <!--<el-col :span="11">-->
              <!--<el-date-picker-->
              <!--v-model="ruleForm.startTime"-->
              <!--type="datetime"-->
              <!--:editable="false"-->
              <!--format="yyyy-MM-dd hh:mm"-->
              <!--placeholder="开始时间">-->
              <!--</el-date-picker>-->
              <!--</el-col>-->
              <!--<el-col :offset="1" :span="1"> -</el-col>-->
              <!--<el-col :span="11">-->
              <!--<el-date-picker-->
              <!--v-model="ruleForm.endTime"-->
              <!--type="datetime"-->
              <!--:editable="false"-->
              <!--format="yyyy-MM-dd hh:mm"-->
              <!--placeholder="结束时间">-->
              <!--</el-date-picker>-->
              <!--</el-col>-->
              <!--</el-row>-->
              <!--</el-form-item>-->

              <el-form-item label="活动地址" prop="address" class="event-address">
                <el-row style="margin-bottom: 10px;">
                  <el-col :span="12">
                    <el-select v-model="ruleForm.province" @change="changeProvince('')" placeholder="请选择省份">
                      <el-option
                        v-for="item in provinceList"
                        :key="item"
                        :label="item"
                        :value="item">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="12" class="select-city">
                    <el-select v-model="ruleForm.city" placeholder="请选择城市">
                      <el-option
                        v-for="item in cityList"
                        :key="item"
                        :label="item"
                        :value="item">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <el-row class="map-container">
                  <el-autocomplete
                    popper-class="address-autocomplete"
                    class="inline-input"
                    v-model="ruleForm.address"
                    :fetch-suggestions="searchAddress"
                    placeholder="请填写详细地址"
                    :trigger-on-focus="false"
                    @select="handleSelectAddress"
                    style="width: 100%">
                    <i slot="suffix" @mouseout="showMap(false)" @mouseover="showMap(true)"
                       class="el-input__icon el-icon-location"></i>
                    <template slot-scope="props">
                      <div class="name">{{ props.item.title }}</div>
                      <span class="addr">{{ props.item.address }}</span>
                    </template>
                  </el-autocomplete>
                  <!--地址预览-->
                  <div id="map" class="map"></div>
                </el-row>
              </el-form-item>


              <el-form-item label="主办方" prop="sponsor" class="sponsor-wrap" required>
                <el-row>
                  <el-tag v-for="item in ruleForm.sponsor" :key="item" closable :disable-transitions="false"
                          @close="removeSponsorTag(item)">{{ sponsorList[item].name }}
                  </el-tag>
                </el-row>
                <el-col :span="20">
                  <el-select v-model="currentSelectSponsor" @change="selectSponsor" placeholder="请选择主办方">
                    <el-option
                      v-for="item in sponsorList"
                      :key="item.id"
                      :label="item.name"
                      v-if="ruleForm.sponsor.indexOf(item.id) == -1"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="4">
                  <a class="add-sponsor-btn" href="javascript:;" @click="addSponsorDialog = true;">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                        <path style="fill: #03b02a;" id="形状_2" data-name="形状 2" class="cls-1"
                              d="M8,0.667A7.333,7.333,0,1,1,.667,8,7.355,7.355,0,0,1,8,.667M8,0a8,8,0,1,0,8,8A7.981,7.981,0,0,0,8,0H8Zm4.667,7.667H8.333V3.333a0.333,0.333,0,0,0-.667,0V7.667H3.333a0.333,0.333,0,0,0,0,.667H7.666v4.333a0.333,0.333,0,0,0,.667,0V8.333h4.333A0.333,0.333,0,1,0,12.667,7.667Z"/>
                      </svg>
                    </span>
                    添加主办方
                  </a>
                </el-col>
                <AddSponsor :show.sync="addSponsorDialog" @new="newSponsor"></AddSponsor>
              </el-form-item>


              <el-form-item class="posters-label" label="活动海报" required>
                <el-col :span="24">
                  <div class="preview-posters-content">
                    <div class="preview-posters-wrap">
                      <img :src="ruleForm.poster" class="preview-posters" v-show="ruleForm.poster">
                    </div>
                    <el-button type="primary" @click="selectPostersDialog = true">选择海报</el-button>
                  </div>
                </el-col>
                <PosterSelector :show="selectPostersDialog" @close="selectPostersDialog = false;"
                                @result="chanagePoster"></PosterSelector>

              </el-form-item>

              <el-form-item class="event-detail-label" label="活动详情" required>
                <UEditor :defaultValue="ruleForm.details" @change="changeDetails"></UEditor>
              </el-form-item>
            </div>

            <div class="edit-title-wrap">
              <div class="edit-content-title">
                报名设置
                <div class="title-right">REGISTRATION SETTINGS</div>
              </div>
            </div>
            <div class="row-wrap">
              <el-form-item label="报名截止时间" class="signUp-EndTime"
                            :class="{ 'signUp-EndTime-label': !ruleForm.signUpToEventEnd}">
                <el-row>
                  活动结束前均可报名
                  <el-switch
                    v-model="ruleForm.signUpToEventEnd"
                    active-color="#13ce66"
                    inactive-color="#d0d0ce"
                    :change="switchChange(ruleForm.signUpToEventEnd)"
                  >
                  </el-switch>
                </el-row>
                <!--<el-row v-if="! ruleForm.signUpToEventEnd">-->
                <!--<el-date-picker-->
                <!--v-model="ruleForm.signUpEndTime"-->
                <!--type="datetime"-->
                <!--format="yyyy-MM-dd hh:mm"-->
                <!--placeholder="结束时间">-->
                <!--</el-date-picker>-->
                <!--</el-row>-->
              </el-form-item>
              <div class="enrolmentInput-wrap enrolmentInput" v-show="! ruleForm.signUpToEventEnd">
                <input id="enrolmentInput" v-model="ruleForm.signUpEndTime" type="text" readonly>
                <span></span>
              </div>

              <el-form-item label="报名人数" prop="enrolment" class="signUp-EndTime signUp-count">
                <el-input v-model="ruleForm.enrolment"></el-input>
              </el-form-item>
            </div>

            <div class="edit-title-wrap">
              <div class="edit-content-title">
                报名表单设置
                <div class="title-right">REGISTRATION FORM SETTINGS</div>
              </div>
              <span v-if="ruleForm.forms.length >= 7" class="form-tips enroll-tip">温馨提示：建议您最多添加7项报名表单项</span>
            </div>

            <div class="row-wrap">
              <div class="activity-sign-wrap">
                <el-row>
                  <el-col :span="15">
                    <el-row v-for="(x, index) in ruleForm.forms" :key="index"
                            v-dragging="{ item: x, list: ruleForm.forms, group: 'form' }">
                      <el-col :span="2">
                        <i class="el-icon-rank" style="margin-top: 10px;"></i>
                      </el-col>
                      <el-col :span="3">
                        <el-checkbox class="required-checkbox" :disabled="DEFAULT_FORM.indexOf(x.displayName) != -1"
                                     v-model="x.required" :checked="x.rules.indexOf('not_empty') != -1"
                                     @change="x.required === true ? x.rules.push('not_empty') : x.rules.splice(x.rules.indexOf('not_empty'), 1)">
                          必填
                        </el-checkbox>
                      </el-col>
                      <el-col :offset="1" :span="17">
                        <el-form-item :prop="'forms.'+ index +'.displayName'"
                                      :rules="{required: true, message: '表单名称不能为空', trigger: 'blur'}">
                          <el-input v-model="x.displayName"
                                    :disabled="DEFAULT_FORM.indexOf(x.displayName) != -1"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="1" v-if="DEFAULT_FORM.indexOf(x.displayName) == -1">
                        <i class="el-icon-circle-close-outline"
                           @click="ruleForm.forms.splice(ruleForm.forms.indexOf(x), 1)"
                           style="font-size: 20px; margin-top: 12px;cursor: pointer;"></i>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row>
                  <!--<a href="javascript:;" class="add-btn" @click="addCustom">添加文本框</a>-->
                  <button type="button" class="add-btn" @click="addCustom">添加文本框</button>
                </el-row>
              </div>
            </div>

            <div class="edit-title-wrap">
              <div class="edit-content-title">
                更多体验设置
                <div class="title-right">MORE EXPERIENCE</div>
              </div>
            </div>
            <div class="row-wrap">
              <el-form-item label="产品名称" prop="productName" class="more-product-unit">
                <el-input placeholder="请输入产品名称" v-model="ruleForm.productName"></el-input>
              </el-form-item>

              <el-form-item label="产品URL" prop="productUrl" class="more-product-unit">
                <el-input placeholder="请输入产品URL（链接请添加网络协议http://或https://）" v-model="ruleForm.productUrl"></el-input>
              </el-form-item>
            </div>

          </div>
          <el-form-item class="edit-content-bottom-wrap">
            <div class="text-center edit-content-bottom">
              <a class="submit-btn" type="primary" @click="submitForm('ruleForm',0)">保存</a>
              <a class="submit-btn" v-show="$route.query.type !== 'edit'" type="primary"
                 @click="submitForm('ruleForm',1)">发布</a>
            </div>
          </el-form-item>
        </el-form>

      </div>
    </div>
  </div>
</template>
<script>
  import {basicHttp} from "../router/api.js"
  import AddSponsor from '../components/event/AddSponsor'
  import PosterSelector from '../components/event/PosterSelector'
  import UEditor from '../components/event/UEditor'
  import '../../static/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css';
  import '../../static/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js';
  import '../../static/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js';

  export default {
    name: "edit-template",
    components: {AddSponsor, PosterSelector, UEditor},
    data() {
      return {
        pageTitle: '活动创建',
        DEFAULT_FORM: ["姓名", "企业名称", "职位", "电子邮箱", "联系电话"],
        editor: null,
        map: null,
        labelPosition: 'top',
        provinceList: [],
        cityList: [],
        sponsorList: {},
        selectPostersDialog: false,
        addSponsorDialog: false,
        currentSelectSponsor: '',
        ruleForm: {
          eventId: '',
          status: 0,
          name: '',
          // time: [],
          startTime: '',
          endTime: '',
          province: '',
          city: '',
          address: '',
          poster: '',
          sponsor: [],
          details: '',
          signUpToEventEnd: true,
          signUpEndTime: null, //报名截至时间
          enrolment: '',     //报名人数
          forms: [{
            displayName: "姓名",
            type: 1,
            required: true,
            rules: ["not_empty"],
          }, {
            displayName: "企业名称",
            type: 1,
            required: true,
            rules: ["not_empty"],
          }, {
            displayName: "职位",
            type: 1,
            required: true,
            rules: ["not_empty"],
          }, {
            displayName: "电子邮箱",
            type: 1,
            required: true,
            rules: ["not_empty", "is_email"],
          }, {
            displayName: "联系电话",
            type: 1,
            required: true,
            rules: ["not_empty", "is_phone_number"],
          }],
          productName: '',
          productUrl: '',
        },
        rules: {
          name: [
            {required: true, message: '您需填写必填信息方能完成活动发布', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '您需填写必填信息方能完成活动发布', trigger: 'blur'}
          ],
          enrolment: [
            {required: true, message: '您需填写必填信息方能完成活动发布', trigger: 'blur'},
            {pattern: /^\d+$/, message: '请输入正确的报名人数', trigger: 'blur'}
            // { type: 'number', message: '请输入正确的报名人数', trigger: 'blur'}
          ],
          productUrl: [
            {
              pattern: /http(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?/,
              message: '请填写正确的产品URL',
              trigger: 'blur'
            }
          ],
        },
      };
    },
    mounted() {
      var _self = this;
      //初始化地图
      this.map = new BMap.Map("map");
      this.map.centerAndZoom("重庆", 16);
      this.map.enableScrollWheelZoom(true);
      //拖拽支持
      this.$dragging.$on('dragged', ({value}) => {
        this.ruleForm.forms = value.list;
      });

      //时间控件初始化
      $("#startDate").datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd hh:ii',
        showSecond: true,
        autoclose: true,
      });
      $("#endDate").datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd hh:ii',
        showSecond: true,
        autoclose: true,
      });
      $("#enrolmentInput").datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd hh:ii',
        showSecond: true,
        autoclose: true,
      });
      $('.date-wrap.startDate span').click(function() {
        $('#startDate').datetimepicker('show');
      });
      $('.date-wrap.endDate span').click(function() {
        $('#endDate').datetimepicker('show');
      });
      $('.enrolmentInput-wrap.enrolmentInput span').click(function() {
        $('#enrolmentInput').datetimepicker('show');
      });


      //活动截止时间必须小于活动结束时间
      if (_self.ruleForm.endTime) {
        $("#enrolmentInput").datetimepicker('setStartDate', new Date());
        $("#enrolmentInput").datetimepicker('setEndDate', _self.ruleForm.endTime);
      }
      $("#endDate").on('changeDate', function (e) {
        if (_self.ruleForm.endTime) {
          $("#enrolmentInput").datetimepicker('setEndDate', $(this).val());
        }
      });

      this.doubleTimepickerCheck("#startDate", "#endDate");
      var _self = this;
      $('#startDate').datetimepicker()
        .on('hide', function (ev) {
          let value = $("#startDate").val();
          _self.ruleForm.startTime = value;
        });
      $('#endDate').datetimepicker()
        .on('hide', function (ev) {
          let value = $("#endDate").val();
          _self.ruleForm.endTime = value;
        });
      $("#enrolmentInput").datetimepicker()
        .on('hide', function (ev) {
          let value = $("#enrolmentInput").val();
          _self.ruleForm.signUpEndTime = value;
        });
      $('#startDate')[0].addEventListener('click', function (e) {
        e.currentTarget.blur();
      });
      $('#endDate')[0].addEventListener('click', function (e) {
        e.currentTarget.blur();
      });
      $('#enrolmentInput')[0].addEventListener('click', function (e) {
        e.currentTarget.blur();
      });

    },
    methods: {
      /**
       * 起始时间不能大于结束时间
       * @param start 开始控件，可以是jQuery选择器字符串，也可以是jQuery对象
       * @param end 结束控件，可以是jQuery选择器字符串，也可以是jQuery对象
       * @param minTimeGap 开始时间和结束时间的最小间隔，单位为分钟
       * @param maxTimeGap 开始时间和结束时间的最大时间间隔，单位为分钟
       */
      doubleTimepickerCheck: function (start, end, minTimeGap, maxTimeGap) {
        var $start;
        var $end;
        var $startInput;
        var $endInput;
        minTimeGap = (minTimeGap || 0) * 60 * 1000;
        maxTimeGap = (maxTimeGap || 0) * 60 * 1000;
        if (start && end) {
          if (typeof start == 'string' && typeof end == 'string') {
            $start = $(start);
            $end = $(end);
          } else if (typeof start == 'object' && typeof end == 'object'
            && start instanceof jQuery && end instanceof jQuery) {
            $start = start;
            $end = end;
          }

          $startInput = $start.prop('tagName') == 'DIV' ? $start.find('input') : $start;
          $endInput = $end.prop('tagName') == 'DIV' ? $end.find('input') : $end;

          $start.on('changeDate', function (e) {
            var t = Date.parse($startInput.val());
            $end.datetimepicker('setStartDate', new Date(t + minTimeGap) || '1000-01-01');
            if (maxTimeGap) {
              $end.datetimepicker('setEndDate', new Date(t + maxTimeGap) || '3000-01-01');
            }
          });
          $end.on('changeDate', function (e) {
            var t = Date.parse($endInput.val());
            $start.datetimepicker('setEndDate', new Date(t - minTimeGap) || '3000-01-01');
            if (maxTimeGap) {
              $start.datetimepicker('setStartDate', new Date(t - maxTimeGap) || '1000-01-01');
            }
          });
        }
      },
      //活动结束前均可报名 按钮打开时清空 活动截止时间 字段
      switchChange(val) {
        if (val) {
          this.ruleForm.signUpEndTime = '';
        }
      },
      changeDetails(content) {
        this.ruleForm.details = content;
      },
      /**
       * 显示或隐藏预览地图
       */
      showMap(show) {
        var _self = this;
        if (this.ruleForm.address.length != 0) {
          $("#map").css("z-index", (show ? 9999 : -1));
          //定位到用户填写的位置
          var myGeo = new BMap.Geocoder();
          myGeo.getPoint(this.ruleForm.address, function (point) {
            if (point) {
              _self.map.centerAndZoom(point, 16);
              _self.map.clearOverlays();
              _self.map.addOverlay(new BMap.Marker(point));
            }
          }, this.ruleForm.province);
        }
      },
      /**
       * 初始化省份选择
       */
      initProvince() {
        var _self = this;
        basicHttp({
          method: 'get',
          url: '/event/province'
        }, function (response) {
          _self.provinceList = response.data.data;
        });
      },
      /**
       * 选择省份后拉取所属城市
       */
      changeProvince(defCity) {
        var _self = this;
        this.ruleForm.city = '';
        basicHttp({
          method: 'get',
          url: '/event/city',
          params: {province: _self.ruleForm.province}
        }, function (response) {
          _self.cityList = response.data.data;
          if(defCity) {
            _self.ruleForm.city = defCity;
          }
        });
      },
      /**
       * 搜索地址
       */
      searchAddress(data, callback) {
        var options = {
          onSearchComplete: function (results) {
            if (local.getStatus() == BMAP_STATUS_SUCCESS) {
              var s = [];
              for (var i = 0; i < results.getCurrentNumPois(); i++) {
                s.push(results.getPoi(i));
              }
              callback(s);
            }
          }
        };
        var local = new BMap.LocalSearch(this.map, options);
        var pc = this.ruleForm.province + this.ruleForm.city;
        local.search(pc + this.ruleForm.address);
      },
      /**
       * 处理选择地址
       */
      handleSelectAddress(item) {
        this.ruleForm.address = item.address + " " + item.title;
      },
      /**
       * 新增主办方事件
       */
      newSponsor(data) {
        this.sponsorList[data.id] = data;
        this.ruleForm.sponsor = [];
        this.ruleForm.sponsor.push(data.id);
      },
      /**
       * 选择主办方
       */
      selectSponsor() {
        this.ruleForm.sponsor = [];
        this.ruleForm.sponsor.push(this.currentSelectSponsor);
        this.currentSelectSponsor = '';
      },
      /**
       * 删除已选择的主办方
       * @param item
       */
      removeSponsorTag(item) {
        this.ruleForm.sponsor.splice(this.ruleForm.sponsor.indexOf(item), 1);
      },
      /**
       * 更换海报事件
       * @param img
       */
      chanagePoster(img) {
        this.ruleForm.poster = img;
      },
      getFormData() {
        //复制一个新的对象，防止污染原数据
        var data = JSON.parse(JSON.stringify(this.ruleForm));
        return data;
      },
      /**
       * 保存或发布活动
       */
      submitForm(formName, type) {
        var _self = this;
        // var error = false;
        // $.each(this.ruleForm, function(name){
        //   console.log(typeof name);
        //   console.log(name);
        //   if(_self.rules[name] && ! error) {
        //     _self.$refs['ruleForm'].validateField(name, (errorMsg) => {
        //       if(errorMsg.length == 0){
        //         return;
        //       }
        //
        //       console.log(errorMsg);
        //       error = true;
        //       _self.$alert(errorMsg, '提示', {
        //         confirmButtonText: '确定'
        //       });
        //     });
        //   }
        // });
        //
        // if(error){
        //   return false;
        // }


        var data = this.getFormData();
        if (!data) {
          return false;
        }
        data.startTime = data.startTime + ':00';
        data.endTime = data.endTime + ':00';

        if (data.signUpToEventEnd) {
          data.signUpEndTime = null;
        }
        //活动结束前均可报名 按钮打开时清空时间
        if (data.signUpEndTime !== null && data.signUpEndTime !== '') {
          data.signUpEndTime = data.signUpEndTime + ':00';
        } else {
          data.signUpEndTime = '';
        }

        data.status = type;
        basicHttp({
          method: 'post',
          url: '/event/event/',
          data: data
        }, function (response) {
          _self.ruleForm.eventId = response.data.data.eventId;
          if (type == 0) {
            _self.$alert('活动保存成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                _self.$router.push({path: '/public/activityAdministration'});
              }
            });
          } else {
            _self.$alert('活动发布成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                _self.$router.push({path: '/public/templateShare', query: {eventId: _self.ruleForm.eventId}});
              }
            });
          }
        }, function (error) {
          if (error) {
            _self.$alert(error.data.message, '操作失败', {confirmButtonText: '确定'});
          }
        });
      },
      /**
       * 添加自定义表单
       */
      addCustom() {
        this.ruleForm.forms.push({
          displayName: '',
          type: 1,
          required: false,
          rules: [],
        });
      },
      /**
       *
       */
      loadSponsorData() {
        var _self = this;
        //拉取用户创建的所有主办方
        basicHttp({
          method: 'get',
          url: '/event/sponsor'
        }, function (response) {
          var list = {};
          $.each(response.data.data, function (index, obj) {
            list[obj.id] = obj;
          });
          _self.sponsorList = list;
          _self.loadEventData();
        });
      },
      /**
       * 加载活动信息
       */
      loadEventData() {
        var _self = this;
        var eventId = this.$route.query.eventId;
        if (eventId) {
          basicHttp({
            method: 'get',
            url: '/event/event/' + eventId,
            params: {"mode": "edit"}
          }, function (response) {
            _self.ruleForm = response.data.data;
            //活动截止时间必须小于活动结束时间
            if (_self.ruleForm.endTime) {
              $("#enrolmentInput").datetimepicker('setStartDate', new Date());
              $("#enrolmentInput").datetimepicker('setEndDate', _self.ruleForm.endTime);
            }
            //解决删除一个表单时会将所有表单置为必填项的bug
            for (var i = 0; i < _self.ruleForm.forms.length; i++) {
              _self.ruleForm.forms[i].required = _self.ruleForm.forms[i].rules.indexOf("not_empty") != -1;
            }
            _self.ruleForm.startTime = _self.ruleForm.startTime.substring(0, 16);
            _self.ruleForm.endTime = _self.ruleForm.endTime.substring(0, 16);
            if (_self.ruleForm.signUpEndTime) {
              _self.ruleForm.signUpEndTime = _self.ruleForm.signUpEndTime.substring(0, 16);
            }
            //手动触发change事件,保证地址二级联动
            _self.changeProvince(_self.ruleForm.city);
          });
        }
      },
      //获取页面title 编辑/创建
      getTitle() {
        if (this.$route.query.type === 'add') {
          this.pageTitle = '活动创建';
        } else if (this.$route.query.type === 'edit') {
          this.pageTitle = '活动编辑';
        }
      },
    },
    created() {
      //设置默认开始时间和结束时间
      if( this.$route.query.type !== 'edit' ) {
        var defaultStartTime = new Date();
        defaultStartTime.setDate(defaultStartTime.getDate() + 10);
        var defaultEndTime = new Date();
        defaultEndTime.setDate(defaultEndTime.getDate() + 15);
        // this.ruleForm.time = [defaultStartTime, defaultEndTime];
        this.ruleForm.startTime = defaultStartTime.Format('yyyy-MM-dd hh:mm');
        this.ruleForm.endTime = defaultEndTime.Format('yyyy-MM-dd hh:mm');
        //设置默认省份和城市
        this.ruleForm.province = '北京市';
        this.changeProvince('朝阳区');
      }
      //初始化省份
      this.initProvince();
      this.loadSponsorData();
      this.getTitle();
    }
  }
</script>
<style>
  .activity-sign-wrap .el-col-offset-1 {
    margin-left: 5px;
  }

  .signUp-EndTime-label .el-switch__core {
    color: #ffffff;
    font-size: 12px;
  }

  .edit-wrap .edit-box .el-form--inline .edit-content-bottom-wrap .el-form-item__content {
    width: 100%;
  }

  .signUp-EndTime-label .el-form-item__label {
    padding: 0;
  }

  .signUp-EndTime-label label:after {
    content: '*';
    color: #f56c6c;
  }

  .datetimepicker table tr td.active:active, .datetimepicker table tr td.active:hover:active, .datetimepicker table tr td.active.disabled:active, .datetimepicker table tr td.active.disabled:hover:active, .datetimepicker table tr td.active.active, .datetimepicker table tr td.active:hover.active, .datetimepicker table tr td.active.disabled.active, .datetimepicker table tr td.active.disabled:hover.active {
    background-color: #03b02a;
    background-image: none;
  }

  .datetimepicker table tr td span.active:active, .datetimepicker table tr td span.active:hover:active, .datetimepicker table tr td span.active.disabled:active, .datetimepicker table tr td span.active.disabled:hover:active, .datetimepicker table tr td span.active.active, .datetimepicker table tr td span.active:hover.active, .datetimepicker table tr td span.active.disabled.active, .datetimepicker table tr td span.active.disabled:hover.active {
    background-color: #03b02a;
    background-image: none;
  }

  .signUp-EndTime label {
    margin-bottom: 9px;
    color: #606266;
  }

  .signUp-EndTime .el-input {
    width: 459px;
  }

  .edit-wrap .edit-box input[disabled] {
    background-color: #cecece;
    color: #75787b;
  }

  .el-icon-rank {
    font-size: 20px;
    color: #97999b;
  }

  .edit-wrap .edit-box .event-time-wrap .el-input__inner {
    border: none;
    background-color: #ffffff;
    padding-left: 0;
    border-radius: 0;
  }

  .edit-wrap .edit-box .event-time-wrap .el-date-editor .el-range__icon {
    display: none;
  }

  .edit-wrap .edit-box .event-time-wrap .el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner {
    width: 100%;
  }

  .edit-wrap .edit-box .el-date-editor .el-range-input {
    -webkit-appearance: none;
    background-color: #f6f6f6;
    background-image: none;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 1;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 45%;
  }

  .el-icon-location:before {
    color: #43b02a;
  }

  .edit-wrap .edit-box .el-button {
    /*border-radius: 12px;*/
  }

  .el-tag .el-icon-close:hover {
    color: #da291c;
    background-color: #ffffff;
    border: 1px solid #da291c;
  }

  .el-tag .el-icon-close {
    right: -13px;
    top: -15px;
    color: #03b02a;
    background-color: #ffffff;
    border: 1px solid #03b02a;
  }

  .edit-wrap .edit-box .el-tag {
    border: 0;
    border-radius: 12px;
    background-color: #e5f7e9;
    color: #000;
    margin-right: 10px;
  }

  .edit-wrap .edit-box .posters-label label, .edit-wrap .edit-box .event-detail-label label {
    vertical-align: middle;
  }

  .edit-wrap .el-button--primary.is-active, .el-button--primary:active {
    background: #43b02a;
    border-color: #43b02a;
  }

  .el-button--primary {
    background: #43b02a;
    border-color: #43b02a;
    border-radius: 0;
  }
  .preview-posters-content .el-button--primary:hover {
    background-color: #ffffff;
    border-color: #43b02a;
    color: #43b02a;
    border-radius: 0;
  }

  .el-button--primary:focus, .el-button--primary:hover {
    background: #43b02a;
    border-color: #43b02a;
  }

  .edit-wrap .edit-box .add-sponsor-btn {
    border-radius: 0;
    background-color: #f6f6f6;
    width: 100%;
    border: 1px solid #dce0e2;
    border-left: 0;
    padding: 11px 32px;
    color: #43b02a;
    text-decoration: none;
  }

  .edit-wrap .edit-box .add-sponsor-btn > span {
    vertical-align: sub;
  }

  .edit-wrap .edit-box .sponsor-wrap .el-select {
    width: 100%;
  }

  .edit-wrap .edit-box .sponsor-wrap label {
    margin-bottom: 10px;
  }

  .edit-wrap .edit-box .more-product-unit label {
    margin-bottom: 10px;
  }

  .edit-wrap .edit-box .more-product-unit input {
    width: 425px;
  }

  .edit-wrap .edit-box .event-address label {
    vertical-align: middle;
    margin-top: 10px;
  }

  .edit-wrap .edit-box .signUp-count label {
    margin-bottom: 10px;
  }

  .el-form-item.is-required .el-form-item__label:before {
    display: none;
  }

  .el-form-item.is-required .el-form-item__label:after {
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
  }

  .edit-wrap .edit-box .el-form-item {
    margin-bottom: 40px;
  }

  .edit-wrap .edit-box .el-select {
    width: 97%;
  }

  .edit-wrap .edit-box .select-city .el-select {
    float: right;
  }

  .edit-wrap .edit-box .el-form--inline .el-form-item {
    width: 100%;
  }

  .edit-wrap .edit-box .el-form--inline .el-form-item__content {
    width: 90%;
  }

  .edit-wrap .edit-box label {
    vertical-align: bottom;
    font-weight: normal;
  }

  .edit-wrap .edit-box .el-input__inner {
    border-radius: 0;
    background-color: #f6f6f6;
  }

  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #03b02a;
    border-color: #03b02a;
  }

  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #000000;
  }

  .el-checkbox__input.is-disabled + span.el-checkbox__label {
    color: #000000;
  }
</style>

<style scoped lang="less" rel="stylesheet/less">
  @bg-gray: #e8eae9;
  @deloitte-text-green: #03b02a;
  .edit-wrap {
    width: 100%;
    background: @bg-gray;
    padding: 40px 0 56px 0;
    .edit-box {
      max-width: 1200px;
      margin: 0 auto;
      background: #ffffff;
      padding: 41px 43px;
      .enrolmentInput-wrap {
        margin-left: 100px;
        margin-bottom: 40px;
        width: 459px;
        position: relative;
        span {
          content: url("../assets/date-input-icon.svg");
          position: absolute;
          right: 10px;
          top: 9px;
          cursor: pointer;
        }
        input {
          cursor: pointer;
          -webkit-appearance: none;
          background-color: #f6f6f6;
          background-image: none;
          border: 1px solid #dcdfe6;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          color: #606266;
          display: inline-block;
          font-size: inherit;
          height: 40px;
          line-height: 1;
          outline: 0;
          padding: 0 15px;
          -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
          transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
          width: 100%;
        }
      }
      .date-wrap {
        display: inline-block;
        position: relative;
        span {
          content: url("../assets/date-input-icon.svg");
          position: absolute;
          right: 10px;
          top: 9px;
          cursor: pointer;
        }
      }
      .row-wrap {
        width: 100%;
        border: solid 1px rgba(220, 224, 226, 1);
        padding: 20px 30px;
        margin-bottom: 30px;
        border-top: 3px solid @deloitte-text-green;
        .event-time-wrap {
          margin-bottom: 40px;

          label {
            width: 100px;
            display: inline-block;
            &:after {
              content: '*';
              color: #f56c6c;
            }
          }
          input {
            -webkit-appearance: none;
            background-image: none;
            border: 1px solid #dcdfe6;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            color: #606266;
            display: inline-block;
            font-size: inherit;
            height: 40px;
            line-height: 1;
            outline: 0;
            padding: 0 15px;
            -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
            transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
            border-radius: 0;
            background-color: #f6f6f6;
            width: 457px;
            cursor: pointer;
            margin-left: -4px;
          }
        }
      }
      .edit-title-wrap {
        position: relative;
        .title-right {
          float: right;
          font-size: 12px;
          color: #afb2b4;
          line-height: 39px;
        }
        .title-right:after {
          content: '';
          position: absolute;
          bottom: -28px;
          right: 54px;
          display: inline-block;
          width: 1px;
          height: 20px;
          border: 11px solid transparent;
          border-top: 12px solid #03b02a;

        }
        .edit-content-title {
          color: @deloitte-text-green;
          font-weight: bold;
          font-size: 20px;
          margin-bottom: 5px;
          margin-top: 20px;
        }
      }
    }
  }

  .edit-content-bottom {
    margin-top: 40px;
  }

  .submit-btn {
    font-size: 16px;
    line-height: 16px;
    display: inline-block;
    cursor: pointer;
    padding: 18px 84px;
    color: @deloitte-text-green;
    background-color: transparent;
    border: 1px solid @deloitte-text-green;
    margin-right: 20px;
    &:hover {
      color: #ffffff;
      background-color: @deloitte-text-green;
    }
  }

  .reset-btn {
    font-size: 16px;
    line-height: 16px;
    display: inline-block;
    cursor: pointer;
    padding: 18px 84px;
    color: @deloitte-text-green;
    background-color: transparent;
    border: 1px solid @deloitte-text-green;
    &:hover {
      color: #ffffff;
      background-color: @deloitte-text-green;
    }
  }

  label {
    padding: 0;
    line-height: 20px;
  }

  .el-form--inline .el-form-item {
    width: 95%;
  }

  /*.is-disabled, .el-select {*/
  /*width: 92%;*/
  /*}*/

  .is-disabled input {
    margin-bottom: 30px;
  }

  .activity-sign-wrap .el-col {
    /*margin-bottom: 30px;*/
  }

  .delete-btn-wrap {
    width: 100%;
    position: relative;
  }

  .delete-btn-wrap > a {
    cursor: pointer;
    position: absolute;
    top: -40px;
    right: 0;
  }

  .el-input-group__append {
    background-color: @deloitte-text-green;
  }

  .add-btn {
    font-size: 16px;
    line-height: 16px;
    display: inline-block;
    cursor: pointer;
    padding: 8px 44px;
    color: @deloitte-text-green;
    background-color: transparent;
    border: 1px solid @deloitte-text-green;
    border-radius: 2px;
    &:hover {
      color: #ffffff;
      background-color: @deloitte-text-green;
    }
  }

  .clear {
    clear: both;
  }

  .required-checkbox {
    margin-top: 12px;
  }

  .address-autocomplete {
    li {
      line-height: normal;
      padding: 7px;

      .name {
        text-overflow: ellipsis;
        overflow: hidden;
        line-height: 14px;
      }
      .addr {
        font-size: 12px;
        color: #b4b4b4;
      }

      .highlighted .addr {
        color: #ddd;
      }
    }
  }

  .map-container {
    position: relative;

    .map {
      height: 300px;
      width: 100%;
      z-index: -1;
      position: absolute;
    }
  }

  .preview-posters-content {
    display: flex; /*Flex布局*/
    display: -webkit-flex; /* Safari */
    align-items: center; /*指定垂直居中*/
    width: 100%;
    button {
      vertical-align: middle;
      margin-left: 20px;
    }
    .preview-posters-wrap {
      display: inline-block;
      width: 459px;
      height: 336px;
      background: url("../assets/poster-bg.png") no-repeat center center;
      background-color: #d0d0ce;
      .preview-posters {
        width: 100%;
        height: 100%;
        display: inline-block;
      }
    }
  }

  .form-tips {
    margin-left: 20px;
    color: #ed8b00;
  }

  .enroll-tip {
    position: absolute;
    left: 120px;
    bottom: 0;
  }

</style>
