'use strict';

angular.module('moviecat', [
  'ngRoute',
  'moviecat.movie_detail',
  'moviecat.movie_list',
  'moviecat.directives.auto_focus',
])
    .constant('AppConfig',{
        pageSize:10,
        listApiAddress:'http://api.douban.com/v2/movie/',
        detailApiAddress:'http://api.douban.com/v2/movie/subject/'
    })//���峣��
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
          .otherwise({
              redirectTo: '/in_theaters/1'
          });
        }
    ])
    //����������
    .controller('SearchController',[
        '$scope',
        '$route',
        function($scope,$route){
            $scope.input = '';//ȥ�ı����ֵ
            $scope.search = function(){
                //console.log($scope.input);
                $route.updateParams(
                    {
                        category : 'search',
                        q:$scope.input
                    }
                );
            };
        }
    ]);

/*//�����Ŀ�����
.controller('NavController',[
    '$scope',
    '$location',
    function($scope,$location){
        $scope.$location = $location;
        $scope.$watch('$location.path()',function(now){
            if(now.startsWith('/in_theaters')){
                $scope.type = 'in_theaters';
            }else if(now.startsWith('/coming_soon')){
                $scope.type = 'coming_soon';
            }else if(now.startsWith('/top250')){
                $scope.type = 'top250';
            }
            console.log($scope.type);
        });
    }
]);*/

