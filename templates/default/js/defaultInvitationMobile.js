angular.module('defaultInvitationMobileApp', []).controller('defaultInvitationMobileController', ['$scope', '$http', function ($scope, $http) {
    $scope.registerTip = {};
    $scope.registerTipContent = {};
    $scope.register = {};
    $scope.canValidBool = true;
  $scope.baseInfo = {};
    $scope.outlineInfo = {};
    //获取数据内容
    getInfo();
    function getInfo() {
        var _href = window.location.href;
        var _eventId = _href.substring(window.location.href.lastIndexOf('/') - 0 + 1);

      $.ajax({
        url: "http://10.173.41.196:8080/event/event/" + _eventId,    //请求的url地址
        type: "GET",   //请求方式
        success: function (data) {
          //请求成功时处理
          $scope.$apply(function () {
            $scope.baseInfo = data.data.baseInfo;
            $scope.outlineInfo = data.data.outlineInfo;
          });
        },
        error: function (error) {
          //请求出错处理

        }
      });
    }


    //点击登录检测各表单是否为空
    $scope.checkInputRegister = function () {
        $scope.canValidBool = true;
        $scope.checkValidRegister();
        if ($scope.canValidBool) {  //前端验证通过
            $scope.registerSubmit();
        }
    };

    $scope.registerSubmit = function () {
        $scope.register.industryCode = $scope.register.selectedIndustry.industryCode;
        $scope.register.industry = $scope.register.selectedIndustry.industryName;
        var _data = angular.copy($scope.register);
        var args = JSON.stringify(_data);
        // console.log(args);
        $.ajax({
            url: "../user/register",    //请求的url地址
            dataType: "json",   //返回格式为json
            data: {"args": args},    //参数值
            type: "POST",   //请求方式
            success: function (data) {
                //请求成功时处理
                var code = data.code;
                if (code == 3) {  //用户名已存在
                    $scope.$apply(function () {
                        $scope.registerTip.registerUserName = true;
                        $scope.registerTipContent.registerUserName = '用户名已存在';
                    });
                } else if (code == 2) {  //手机号已存在
                    $scope.$apply(function () {
                        $scope.registerTip.registerMobile = true;
                        $scope.registerTipContent.registerMobile = '手机号已存在';
                    });
                } else if (code == 0) {
                    $scope.registerTip.registerUserName = false;
                    $scope.registerTip.registerCompanyName = false;
                    $scope.registerTip.registerIndustry = false;
                    $scope.registerTip.registerMobile = false;
                }
            },
            error: function (error) {
                //请求出错处理

            }
        });
    };

    //检测各表单并提示方法
    $scope.checkValidRegister = function () {
        if (!$scope.register.userName) {
            $scope.registerTip.registerUserName = true;
            $scope.registerTipContent.registerUserName = '请填写用户名';
            $scope.canValidBool = false;
        } else {
            $scope.userNameVal();
        }

        if (!$scope.register.registerPosition) {
            $scope.registerTip.registerPosition = true;
            $scope.registerTipContent.registerPosition = '请填写用户名';
            $scope.canValidBool = false;
        } else {
            $scope.registerPositionVal();
        }

        if (!$scope.register.companyName) {
            $scope.registerTip.registerCompanyName = true;
            $scope.registerTipContent.registerCompanyName = '请填写企业名称';
            $scope.canValidBool = false;
        } else {
            $scope.companyNameVal();
        }
        if ($scope.register.selectedIndustry == "" || $scope.register.selectedIndustry == null) {
            $scope.registerTip.registerIndustry = true;
            $scope.registerTipContent.registerIndustry = '请选择所属行业';
            $scope.canValidBool = false;
        } else {
            $scope.registerTip.registerIndustry = false;
            $scope.canValidBool = true;
        }

        if (!$scope.register.mobile) {
            $scope.registerTip.registerMobile = true;
            $scope.registerTipContent.registerMobile = '请填写手机号码';
            $scope.canValidBool = false;
        } else {
            $scope.mobileVal();
        }

    };

    $scope.userNameVal = function () {
        var isUserName = /^[0-9a-zA-Z_]{6,12}$/;
        if (!isUserName.test($scope.register.userName)) {
            $scope.registerTip.registerUserName = true;
            $scope.registerTipContent.registerUserName = '用户名须为6-12位数字，字母或下划线组成';
            $scope.canValidBool = false;
        }
    };

    $scope.registerPositionVal = function () {
        var isPosition = /^[0-9a-zA-Z_]{6,12}$/;
        if (!isPosition.test($scope.register.registerPosition)) {
            $scope.registerTip.registerPosition = true;
            $scope.registerTipContent.registerPosition = '用户名须为6-12位数字，字母或下划线组成';
            $scope.canValidBool = false;
        }
    };

    $scope.companyNameVal = function () {//企业名称
        var isCompanyName = /^.{2,50}$/;
        if (!isCompanyName.test($scope.register.companyName)) {
            $scope.registerTip.registerCompanyName = true;
            $scope.registerTipContent.registerCompanyName = '请填写正确企业名称';
            $scope.canValidBool = false;
        }
    };

    $scope.mobileVal = function () {
        var isMobile = /^1[3|4|5|7|8][0-9]{9}$/;
        if (!isMobile.test($scope.register.mobile)) {
            $scope.registerTip.registerMobile = true;
            $scope.registerTipContent.registerMobile = '请填入正确的联系电话格式';
            $scope.canValidBool = false;
        }
    };

    //input失交时验证
    $scope.userNameValBlur = function () {
        if ($scope.register.userName) {
            $scope.userNameVal();
        }
    };

    //input失交时验证
    $scope.positionValBlur = function () {
        if ($scope.register.registerPosition) {
            $scope.registerPositionVal();
        }
    };

    $scope.companyNameValBlur = function () {
        if ($scope.register.userName) {
            $scope.companyNameVal();
        }
    };
    $scope.mobileValBlur = function () {
        if ($scope.register.mobile) {
            $scope.mobileVal();
        }
    };

}]);


$(function () {
    if($.utils.getUrlParam('preview') !== '1') {   //如果用iframe加载此页面就url传值preview=1，不执行fullpage
        // fullpage配置
        var arrayAnimate = ['zoomIn', 'fadeInLeft', 'fadeInRight', 'fadeInDown', 'fadeInUp'];
        var arrayTemp = [];
        $(".animated").addClass("animateClass");
        $(".right").addClass("animateClass");
        $('#dowebok').fullpage({
            sectionsColor: ['#000000', '#000000', '#000000', '#000000'],
            afterLoad: function (anchorLink, index) {
                $(".animateClass").css("visibility", "visible");
                if (index == 3) {
                    //todo
                    $(".jiantou img").css("transform", "rotate(180deg)");
                    $(".jiantou").css("animation", "jiantou1 1s infinite");
                } else {
                    $(".jiantou img").css("transform", "rotate(0deg)");
                    $(".jiantou").css("animation", "jiantou 1s infinite");
                }
                if (arrayTemp != null) {
                    for (var i = 0; i < $(".animateClass").length; i++) {
                        $(".animateClass").eq(i).addClass(arrayTemp[i]);
                    }
                }
            },
            onLeave: function (index, direction) {
                $(".animateClass").css("visibility", "hidden");
                for (var j = 0; j < $(".animateClass").length; j++) {
                    var flag = false;
                    for (var i = 0; i < arrayAnimate.length; i++) {
                        if ($(".animateClass").eq(j).hasClass(arrayAnimate[i])) {
                            arrayTemp.push(arrayAnimate[i]);
                            $(".animateClass").eq(j).removeClass(arrayAnimate[i]);
                            flag = true;
                        }
                    }
                    if (!flag) {
                        arrayTemp.push('noAnimate');
                    }
                }
            }
        });
    }else {
        $('body').css({'zoom':'0.45','background-color':'#000000'})
        $('.section').css({'height':'1100px'})
    }


    // 微信转发配置
    $.post('https://tac.deloitte.com.cn/webchatshare/weixin/share', {args: location.href.split('#')[0]}, function (res) {
        if(res.code == 0){
            console.log(res.data)
            wx.config({
                debug: false,
                appId: res.data.sign.appid,
                timestamp: res.data.sign.timestamp,
                nonceStr: res.data.sign.nonceStr,
                signature: res.data.sign.signature,
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'openLocation']
            });
        }
    }, 'json');

});

wx.ready(function() {
    var data = {
        title: "德勤活动邀请函",
        desc: "制作邀请函模板",
        link: "https://tac.deloitte.com.cn/aas/",
        imgUrl: "https://tac.deloitte.com.cn/aas/img/share.jpg",
        type: 'link'
    };
    wx.onMenuShareTimeline(data);
    wx.onMenuShareAppMessage(data);
    wx.onMenuShareQQ(data);
    wx.onMenuShareWeibo(data);
    wx.onMenuShareQZone(data);
});

// 表单提交字段
//     `full_name` VARCHAR(50) NOT NULL COMMENT '姓名',
//     `job` VARCHAR(50) NOT NULL COMMENT '职位',
//     `domain` VARCHAR(100) NOT NULL COMMENT '工作领域',
//     `enterprise_name` VARCHAR(100) NOT NULL COMMENT '企业名称',
//     `contact` VARCHAR(50) NOT NULL COMMENT '联系电话',
