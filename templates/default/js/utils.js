/**
 * Created by rodai on 10/11/2017.
 */
(function ($) {
    $.utils = $.utils || {};

    // 固定底部
    $.utils.footerPosition = function (timeout) {
        timeout(function(){
            var $footer = $(".common-footer");
            $footer.removeClass("fixed-bottom");
            var contentHeight = document.body.scrollHeight,//网页正文全文高度
                winHeight = window.innerHeight;//可视窗口高度，不包括浏览器顶部工具栏
            if(!(contentHeight > winHeight)){
                //当网页正文高度小于可视窗口高度时，为footer添加类fixed-bottom
                $footer.addClass("fixed-bottom");
            } else {
                $footer.removeClass("fixed-bottom");
            }
        },200);
    };

    // 判断pc端
    $.utils.IsPC = function () {
        if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return false; //移动端
        }
        return true;
    };

    //禁止浏览器返回
    $.utils.backBan = function() {
        if (window.history && window.history.pushState) {
            $(window).on('popstate', function () {
                /// 当点击浏览器的 后退和前进按钮 时才会被触发，
                window.history.pushState('forward', null, '');
                window.history.forward(1);
            });
        }
        window.history.pushState('forward', null, '');  //在IE中必须得有这两行
        window.history.forward(1);
    };

    //获取url传参
    $.utils.getUrlParam = function(name) {
        var serch = decodeURI(window.location.search.substr(1));
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = serch.match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    };

})(jQuery);
