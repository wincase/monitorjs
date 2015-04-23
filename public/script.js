(function(angular){
	'use strict';
	angular.module('monitorjs', ['ngRoute', 'ngAnimate'])
		.config(['$routeProvider',
			function($routeProvider){
				$routeProvider.when('/', {templateUrl: 'partials/dashboard.html', controller: 'DashboardCtrl'});
				$routeProvider.when('/details/:index', {templateUrl: 'partials/dashboard.html', controller: 'DashboardCtrl'});
				$routeProvider.otherwise({redirectTo: '/'});
			}])
		.directive('server', function() {
			return {
				restrict: 'E',
				scope: { server: '=urlprefix', timeout: '=timeout', index: '=index' },
				controller: function($scope, $http, $interval, $location) {
					$scope.update = function (){
						/* TODO: add history record between executions, so we can compare and see how it evolves */
						$http.get('/api/filesystem').success(function(data) {
							$scope.filesystems = data;
						}).error(function(){
							$scope.filesystems = undefined;
						});
						$http.get('/api/profile').success(function(data) {
							$scope.profile = data;
							$scope.profile.occupedpercent = 100 - ( data.freemem * 100 / data.totalmem );
						}).error(function(){
							$scope.profile = undefined;
						});
					};
					$scope.update();
					$scope.progressClass = function(percent){
						if (percent > 0.8) return 'progress-bar-danger';
						if (percent > 0.6) return 'progress-bar-warning';
						if (percent > 0.4) return 'progress-bar-info';
						return 'progress-bar-success';
					};
					$scope.trClass = function(percent){
						if (percent > 0.8) return 'danger';
						if (percent > 0.6) return 'warning';
						if (percent > 0.4) return 'info';
						return 'success';
					};
					$scope.alertClass = function(percent){
						if (percent > 0.8) return 'alert-danger';
						if (percent > 0.6) return 'alert-warning';
						if (percent > 0.4) return 'alert-info';
						return 'alert-success';
					};
					$scope.focus = function(index){
						$location.url('/details/' + index);
					};
					$interval( $scope.update , $scope.timeout * 1000);
				},
				templateUrl: 'partials/server.html'
			};
		})
		.controller('DashboardCtrl', [ '$rootScope', '$scope', '$routeParams',
			function($rootScope, $scope, $routeParams){
				if (typeof $rootScope.servers === 'undefined')
				{
					$rootScope.servers = [//add here your servers
						{ url: '/', timeout: 60 }
					];
					//just a test, you should remove this line
					for(var c = Math.floor((Math.random() * 10) + 1); c > 0; c--){
						$rootScope.servers.push( { url: '/', timeout: 90 } );
					}
				}
				if (typeof $routeParams.index === 'undefined'){
					$scope.servers = $rootScope.servers;
					$scope.detailed = false;
				}else{
					$scope.servers = [ $rootScope.servers[ $routeParams.index ] ];
					$scope.detailed = true;
				}
				$scope.serverClass = function(){
					if ($scope.servers.length >= 5){
						return 'col-lg-4 col-md-6 col-sm-12';
					}
					if ($scope.servers.length == 1){
						return 'col-lg-11 col-md-11 col-sm-12';
					}
					return 'col-lg-6 col-md-6 col-sm-12';
				};
			}
		]);
})(angular);