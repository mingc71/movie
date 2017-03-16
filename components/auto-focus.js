/*
 * @Author: iceStone
 * @Date:   2016-02-17 17:42:49
 * @Last Modified by:   iceStone
 * @Last Modified time: 2016-02-17 17:57:30
 */
(function(angular) {
  angular.module('moviecat.directives.auto_focus', [])
    .directive('autoFocus', ['$location', function($location) {
      // Runs during compile
      var path = $location.path(); // /coming_soon/1
      return {
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        link: function($scope, iElm, iAttrs, controller) {
          //iElm:表示该指令用在那个元素上
          //iAttrs:作用的元素上作用的属性
          $scope.$location = $location;
          $scope.$watch('$location.path()',function(now){
            //console.log(now.startsWith('/search'));
            if(now.startsWith('/search') ){
              iElm.parent().children().removeClass('active');
            }
            // 当path发生变化时执行，now是变化后的值
            var aLink = iElm.children().attr('href');
            var type = aLink.replace(/#(\/.+?)\/\d+/, '$1'); // /coming_soon
            if (now.startsWith(type)) {
              // 访问的是当前链接
              iElm.parent().children().removeClass('active');
              iElm.addClass('active');
            }
          });
          /*var aLink = iElm.children().attr('href');
          var type = aLink.replace(/#(\/.+?)\/\d+/,'$1'); // /coming_soon =>  /  #(\/.+?)\/\d+  /
          if(path.startsWith(type)){
              // 访问的是当前链接
              iElm.addClass('active');
          }
          iElm.on('click', function() {
            //console.log(iAttrs);
            iElm.parent().children().removeClass('active');
            iElm.addClass('active');
          });*/
        }
      };
    }]);
})(angular);
