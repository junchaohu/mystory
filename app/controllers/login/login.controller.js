'use strict';

app.controller('LoginController', function($location,$cookies,$scope, LoginService, toaster) {

	$scope.dataLoading=false;
	$scope.login = function(user) {
		$scope.dataLoading=true;
		LoginService.login(user, function(error,status,headers) {
			if (angular.isDefined(status) && status == 200) {
				toaster.pop({
					type: 'success',
					title: 'Success',
					body: 'login success.',
					showCloseButton: true,
				});
				$location.path('/feed/factory');
			} else {
				toaster.pop({
					type: 'error',
					title: 'Failure',
					body: 'login faliure.',
					showCloseButton: true,
				});
			}
			$scope.dataLoading=false;
		});
	};

	$scope.logout = function() {
		LoginService.logout( function(error,status,headers) {
			if (angular.isDefined(status) && status == 200) {
				toaster.pop({
					type: 'success',
					title: 'Success',
					body: 'logout success.',
					showCloseButton: true,
				});
				$location.path('/login');
			} else {
				toaster.pop({
					type: 'error',
					title: 'Failure',
					body: 'logout faliure.',
					showCloseButton: true,
				});
			}
		});
	};




	//$scope.getAllUsers();


});