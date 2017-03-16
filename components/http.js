/*
 * @Author: iceStone
 * @Date:   2016-02-17 15:15:22
 * @Last Modified by:   iceStone
 * @Last Modified time: 2016-02-17 16:05:11
 */

'use strict';

(function(angular){
  // 由于默认angular提供的异步请求对象不支持自定义回调函数名
  // angular随机分配的回调函数名称不被豆瓣支持
  var http = angular.module('moviecat.services.http', []);
  http.service('HttpService',['$window', '$document',function($window, $document){
    // url : http://api.douban.com/vsdfsdf -> <script> -> html就可自动执行
    this.jsonp = function (url,data,callback){
      /*if(typeof data == 'function'){
        callback = data;
      }*/
      var queryString = url.indexOf('?')==-1 ? '?' : '&' ;
      for(var key in data){
        queryString += key + '=' + data[key] + '&';
      }

      var cbFuncName = 'my_json_cb' + Math.random().toString().replace('.','');

      queryString +=  'callback=' + cbFuncName;
      var script = $document[0].createElement('script');
      script.src = url + queryString;
      //$window[cbFuncName] = callback;
      $document[0].body.appendChild(script);
      $window[cbFuncName] = function (data) {
        callback(data);
        $document[0].body.removeChild(script);
      };

    };
  }]);
})(angular);




