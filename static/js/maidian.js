window.maidian = {}
window.maidian.start = new Date();
window.maidian.len = 0;
window.maidian.end;
window.maidian.status = "in";
window.maidian.second = 60;

window.maidian.revive = function () {
  if (maidian.status == "out") {
    maidian.start = new Date();
    maidian.status = "in";
  }
  window.maidian.second = 60;
}

window.setInterval(function () {
  window.maidian.second -= 1;
  if (0 == window.maidian.second) {
    maidian.end = new Date();
    maidian.len += (maidian.end.getTime() - maidian.start.getTime()) / 1000;
    maidian.status = "out";
  }
}, 1000);
$('body').click(function () {
  window.maidian.revive();
});
$('body').mousedown(function () {
  window.maidian.revive();
});
$('body').mouseup(function () {
  window.maidian.revive();
});
$('body').mousemove(function () {
  window.maidian.revive();
});
//(Firefox)
$('body').bind('DOMMouseScroll', function () {
  window.maidian.revive();
});
//(IE,Google)
$('body').bind('mousewheel', function () {
  window.maidian.revive();
});
$('body').keydown(function (e) {
  window.maidian.revive();
});
$('body').keyup(function (e) {
  window.maidian.revive();
});
$('body').keypress(function (e) {
  window.maidian.revive();
});


/*
 * 设置cookie
 */
window.maidian.setBICookie = function (name, value, days, domain) {
  try {
    var exp = new Date();
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";" + "expires=" + exp.toGMTString();
  } catch (e) {
  }
}

/*
 * 1.根据键取得对应的cookie
 */
window.maidian.getBICookie = function (name) {
  try {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
  } catch (e) {
  }
}

/*
 * 1.根据键删除对应的cookie
 */
window.maidian.delCookie = function (name) {
  try {
    var date = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  } catch (e) {
  }
}

window.maidian.getQueryString = function (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

window.maidian.trackClick = function (data) {
  // alert(1)
  try {
    if ("undefined" != typeof data) {
      maidian.writelog(data, "clickview");
    } else {
      maidian.writelog(null, "clickview");
    }
  } catch (e) {
  }
}

window.maidian.trackPageview = function (data) {
  try {
    if ("undefined" != typeof data) {
      maidian.writelog(data, "pageview");
    } else {
      maidian.writelog(null, "pageview");
    }
  } catch (e) {
  }
}

window.maidian.sendTrackerLog = function (a) {
  (new Image).src = a
}

window.maidian.getContextPath = function () {
  var pathName = document.location.pathname;
  var index = pathName.substr(1).indexOf("/");
  var result = pathName.substr(1, index);
  return result;
}

window.maidian.writelog = function (data, logtype, Url) {
  var cookie_days = 180;//Cookie Save Days
  var url;
  if (Url) {
    url = Url;
  } else {
    url = document.URL;
  }
  var cookie_domain = "." + url.replace(/http:\/\/.*?([^\.]+\.(com\.cn|org\.cn|net\.cn|[^\.\/]+))\/.+/, "$1");
  var contextPatch = maidian.getContextPath();
  var eventStartTime = new Date().getTime();
  var device = maidian.browserType();
  var pramas = "contextPath=" + contextPatch + "&device=" + device + "&eventStartTime=" + eventStartTime + "&url=" + url;
  var log_url = "action=" + logtype;
  // var requesturl = "./log.gif?";
  // var requesturl = "http://10.173.41.191:8080/userbehavior/log.gif?";
  var requesturl = "http://da.deloitte.com/userbehavior/log.gif?";
  // var requesturl="https://tp.deloitte.com.cn/userbehavior/log.gif?";


  var bi_cookieid = maidian.getBICookie("bi_cookieid");
  if (bi_cookieid == null || bi_cookieid == "") {
    bi_cookieid = (new Date).valueOf() + "" + parseInt(Math.random() * 10000000000);
    maidian.setBICookie("bi_cookieid", bi_cookieid, cookie_days, cookie_domain);
  }
  log_url += "&cookieid=" + bi_cookieid;

  var activityCache = "activity";
  if (contextPatch) {
    activityCache += contextPatch;
  } else {
    if (data) {
      if (logtype != "stayview") {
        var paramArr = data.split("&");
        for (var i = 0; i < paramArr.length; i++) {
          console.log(paramArr[i]);
          if (paramArr[i].indexOf("subdomain") != -1) {
            var subdomains = paramArr[i].split("=");
            activityCache += subdomains[1];
          }
        }
      } else {
        var paramArr = data["subdomain"];
        if (paramArr) {
          activityCache += paramArr;
        }
      }
    }
  }
  var activity = maidian.getBICookie(activityCache);
  if (activity == null || activity == "") {
    activity = maidian.getQueryString("activity");
    if (activity != null) {
      maidian.setBICookie(activityCache, activity, 1, cookie_domain);
    }
  }
  if (activity != null) {
    log_url += "&activity=" + activity;
  }

  var referrer = encodeURIComponent(document.referrer);
  if (referrer == null || referrer == "") {
    referrer = "none";
  }

  if (data != null && logtype == "pageview" || logtype == "stayview") {
    for (var key in data) {
      var value = data[key];
      log_url += "&" + key + "=" + value;
    }
  } else if (data != null && logtype == "clickview") {
    var str = data;
    var end = new Date();
    var len = (end.getTime() - maidian.start.getTime()) / 1000;
    var queryData = "&" + str + "&stayTime=" + len;
    log_url += queryData;
  } else if (data == null && logtype == "pageview") {
    if (contextPatch == "" || contextPatch == null) {
      log_url += "&subdomain=portal";
    }
  }
  log_url += "&" + pramas;
  maidian.sendTrackerLog(requesturl + encodeURI(encodeURI(log_url)));
}

// ps:注意将同名的放在一个数组里 eg: getFormJson($("#formID"))
window.maidian.getFormJson = function (formId) {
  var o = {};
  var form;
  if (formId != null) {
    form = document.getElementById(formId);
  } else {
    form = $("form")[0];
  }
  if (undefined == form) {
    return;
  }

  var formIds = ["address-search"];
  if ($.inArray(form.id, formIds) != -1) {
    return;
  }
  //遍历指定form表单所有元素
  for (var i = 0; i < form.length; i++) {
    var element = form[i];
    var filedsname = "fileds_" + element.name;
    if (element.type == "password" || element.type == "hidden" || element.type == "submit" || element.type == "reset") {
      continue;
    }
    if (element.name != null && element.name != "") {
      if (o[filedsname] !== undefined) {
        if (!o[filedsname].push) {
          o[filedsname] = [o[element.name]];
        }
        o[filedsname].push(element.value);
      } else {
        o[filedsname] = element.value;
      }
    }
  }
  return o;
}

window.maidian.getServiceDate = function () {
  var date = new Date($.ajax({async: false}).getResponseHeader("Date"));
  var bombay = date + (3600000 * 8);
  var time = new Date(bombay);
  return time;
}

window.maidian.browserType = function () {
  var device = "PC";
  var sUserAgent = navigator.userAgent.toLowerCase();
  var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  var bIsMidp = sUserAgent.match(/midp/i) == "midp";
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  var bIsAndroid = sUserAgent.match(/android/i) == "android";
  var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
  if ((bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
    device = "Mobile";
  }
  return device;
}

window.onbeforeunload = function () {
  maidian.end = new Date();
  maidian.len += (maidian.end.getTime() - maidian.start.getTime()) / 1000;
  var formdate = maidian.getFormJson();

  var data = {};
  data.stayTime = maidian.len;
  data.strStart = maidian.start.getTime();
  data.lastDate = maidian.end.getTime();
  data.domain = window.location.host;
  data.viewName = window.location.pathname.substring(1);
  var contextpath = maidian.getContextPath();
  if (contextpath == "" || contextpath == null) {
    data.subdomain = "portal";
  }
  if (formdate != null) {
    for (var key in formdate) {
      var value = formdate[key];
      data[key] = value;
    }
  }
  try {
    maidian.writelog(data, "stayview");
  } catch (e) {

  }

};


try {
  if ("undefined" != typeof bi_params) {
    maidian.writelog(bi_params, "pageview");
  } else {
    maidian.writelog(null, "pageview");
  }
} catch (e) {
}
