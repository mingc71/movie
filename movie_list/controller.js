
(function(angular) {
    'use strict';

    var module = angular.module(
        'moviecat.movie_list',[
            'ngRoute',
            'moviecat.services.http'
        ]);
    //配置路由
    module.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/:category/:page', {
                controller: 'MovieListController',
                templateUrl: 'movie_list/view.html'
            });
    }]);

    //配置控制器
    module.controller('MovieListController',[
        '$scope',
        '$route',
        '$routeParams',
        'HttpService',
        'AppConfig',
        function($scope,$route,$routeParams,HttpService,AppConfig){
        var count = 5;//每一页的条数
        var page = parseInt($routeParams.page);//接收当前第几页
        var start = (page - 1) * count;//当前页从那开始
        //控制器  两步：1、设计暴露的数据2、设计暴露的行为
        $scope.loading = true;
        $scope.subjects = [];
        $scope.title = 'Loading';
        $scope.message = '';
        $scope.totalCout = 0;
        $scope.totalPages = 0;
        $scope.currentPage = page;//当前页
        HttpService.jsonp(
            AppConfig.listApiAddress + $routeParams.category,
            //$routeParams数据来源：1、路由匹配来得2、？后面的参数
            {
                start : start,
                count : count,
                q : $routeParams.q
            },
            function(data){
                $scope.subjects = data.subjects;
                $scope.totalCout = data.total;
                $scope.title = data.title;
                $scope.loading = false;
                $scope.totalPages = Math.ceil($scope.totalCout / count);
                $scope.$apply();//$apply在使用第三方，要调用一下，通知ng这个库，重新监听,让所有的值都同步一下
        }
        );
        //暴露上一页下一页的行为
        $scope.go =function(page){
            //传过来的是第几页，我就跳第几页
            //一定要做一个合法教研
            if(page >=1 && page <= $scope.totalPages){
                $route.updateParams({page : page });
            }

        }
    }]);
})(angular);

// // 测试$http服务
// // 在Angular中使用JSONP的方式做跨域请求，
// // 就必须给当前地址加上一个参数 callback=JSON_CALLBACK
/*
var doubanApiAddress = 'http://api.douban.com/v2/movie/in_theaters';
$http.jsonp(doubanApiAddress).then(function(res) {
    //此处的代码是在异步请求完成后才执行（需要等一段时间才执行）
    if(res.status == 200)
        $scope.subjects = res.data.subjects;
    else
        $scope.message = '没找到数据';
}, function (err) {
    console.log(err);
    $scope.message = '没找到数据';
});*/
