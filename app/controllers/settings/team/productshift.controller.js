'use strict';

app.controller('ProductShiftController', function($scope, $uibModal,ProductShiftService,toaster,SweetAlert) {
	
	$scope.getAllProductShifts = function() {
		ProductShiftService.getAllProductShifts(function(error, data) {
			if (!error) {
				$scope.productshifts = data;
			} else {
				$scope.productshifts = [];
			}
		});
	};

	

	$scope.getAllProductShifts();
	
});
