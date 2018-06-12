myApp.filter('mIsHtml', function () { //可以注入依赖
  return function (text) {
    return text.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/quot;/g, '"').replace(/&#40;/g, '(').replace(/&#41;/g, ')');
  }
});
