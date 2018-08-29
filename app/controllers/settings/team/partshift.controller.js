'use strict';

app.controller('PartShiftController', function($scope, $uibModal,PartShiftService,toaster,SweetAlert) {
	
	$scope.getAllPartShifts = function() {
		PartShiftService.getAllPartShifts(function(error, data) {
			if (!error) {
				$scope.partshifts = data;
			} else {
				$scope.partshifts = [];
			}
		});
	};

	

	$scope.getAllPartShifts();
	
});
