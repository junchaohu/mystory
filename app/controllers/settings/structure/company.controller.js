'use strict';

app.controller('CompanyController', function($scope, CompanyService, toaster) {

	$scope.getAllCompanies = function() {
		CompanyService.getAllCompanies(function(error, data) {
			if (!error) {
				$scope.company = data[0];
			} else {
				$scope.company = {};
			}
		});
	};

	$scope.updateCompany = function() {
		CompanyService.editCompany($scope.company, function(error, status) {
			if (angular.isDefined(status) && status == 200) {
				toaster.pop({
					type: 'success',
					title: 'Success',
					body: 'update company success.',
					showCloseButton: true,
				});
				$scope.getAllCompanies();
			} else {
				toaster.pop({
					type: 'error',
					title: 'Failure',
					body: 'update company faliure.',
					showCloseButton: true,
				});
			}
		});
	};


	$scope.getAllCompanies();

});