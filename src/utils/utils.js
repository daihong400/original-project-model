/**
 * Created by rodai on 10/11/2017.
 */
  // 固定底部
export const footerPosition = function () {
    var $footer = $(".common-footer");
    $footer.removeClass("fixed-bottom");
    var contentHeight = document.body.scrollHeight,//网页正文全文高度
      winHeight = window.innerHeight;//可视窗口高度，不包括浏览器顶部工具栏
    if (!(contentHeight > winHeight)) {
      //当网页正文高度小于可视窗口高度时，为footer添加类fixed-bottom
      $footer.addClass("fixed-bottom");
    } else {
      $footer.removeClass("fixed-bottom");
    }
  };

  // 判断pc端
export const IsPC = function () {
    if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return false; //移动端
    }
    return true;
  };

  //禁止浏览器返回
export const backBan = function () {
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
export const getUrlParam = function (name) {
    var serch = decodeURI(window.location.search.substr(1));
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = serch.match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
  };

//设置metaTitle
export const setMetaTitle = function (title) {
  document.title = title
  let mobile = navigator.userAgent.toLowerCase()
  if (/iphone|ipad|ipod/.test(mobile)) {
    let iframe = document.createElement('iframe')
    iframe.style.visibility = 'hidden'
    // 替换成站标favicon路径或者任意存在的较小的图片即可
    iframe.setAttribute('src', 'static/img/blank.png')
    let iframeCallback = function () {
      setTimeout(function () {
        iframe.removeEventListener('load', iframeCallback)
        document.body.removeChild(iframe)
      }, 0)
    }
    iframe.addEventListener('load', iframeCallback)
    document.body.appendChild(iframe)
  }
}
