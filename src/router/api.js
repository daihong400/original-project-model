import axios from 'axios';

export var basicHttp = function(httpSetting, successCallBack, errorCallBack) {
  var time = new Date().getTime();
  if(httpSetting.url.indexOf('?') >= 0) {
    httpSetting.url = httpSetting.url + '&t=' + time;
  }else {
    httpSetting.url = httpSetting.url + '?t=' + time;
  }
  axios(httpSetting).then(function(response) {
    if(response.data && response.data.code === '0000') {
      successCallBack && successCallBack(response);
    }else if(response.data && response.data.code === '0302') {
      window.location.href = response.data.data;
    }else {
      errorCallBack && errorCallBack(response);
    }
  }).catch(function(error) {
    if(error) {
      errorCallBack && errorCallBack(error);
    }
  });
};

