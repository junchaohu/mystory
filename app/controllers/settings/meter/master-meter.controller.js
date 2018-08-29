'use strict';

app.controller('MasterMeterController', function($scope,$uibModal, MasterMeterService,toaster,SweetAlert) {
	
	
	$scope.getAllMasterMeters = function() {
		MasterMeterService.getAllMasterMeters(function(error, data) {
			if (!error) {
				$scope.mastermeters = data;
			} else {
				$scope.mastermeters = [];
			}
		});
		
	};

	$scope.addMasterMeter = function() {
		var modalInstance = $uibModal.open({
			templateUrl: 'views/settings/meter/master-meter.model.html',
			controller: 'ModalAddMasterMeterCtrl',
			windowClass: "animated fadeIn",
			resolve: {
		        params:function(){
                    return {
                        mastermeters:angular.copy($scope.mastermeters)
                    };
                }
		    }
		});
		modalInstance.result.then(function(mastermeter) {
			MasterMeterService.addMasterMeter(mastermeter, function(error, status) {
				if (angular.isDefined(status) && status == 201) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'add mastermeter success.',
						showCloseButton: true,
					});
					$scope.getAllMasterMeters();
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'add mastermeter faliure.',
						showCloseButton: true,
					});
				}
			});
		}, function() {

		});
	};

	$scope.editMasterMeter=function(mastermeter){
		var modalInstance = $uibModal.open({
		    windowClass: "animated fadeIn",
		    templateUrl: 'views/settings/meter/master-meter.model.html',
		    controller: 'ModalEditMasterMeterCtrl',
		    resolve: {
		        params:function(){
                    return {
                        mastermeter:angular.copy(mastermeter),
                        mastermeters:angular.copy($scope.mastermeters)
                    };
                }
		    }
		});

		modalInstance.result.then(function (modifiedMasterMeter) {
	        MasterMeterService.editMasterMeter(modifiedMasterMeter,function(error,status){
	            if(angular.isDefined(status) && status==200){
	                toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'update mastermeter success.',
						showCloseButton: true,
					});
	                $scope.getAllMasterMeters();
	            }else{
	                toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'update mastermeter faliure.',
						showCloseButton: true,
					});
	            }
	        });
		}, function () {
	        //do nothing;
		});
	};

	$scope.deleteMasterMeter=function(mastermeter){
		SweetAlert.swal({
		        title: "Are you sure?",
		        text: "Your will not be able to recover this imaginary item!",
		        type: "warning",
		        showCancelButton: true,
		        confirmButtonColor: "#DD6B55",
		        confirmButtonText: "Yes, delete it!",
		        cancelButtonText: "No, cancel plx!",
		        closeOnConfirm: true,
		        closeOnCancel: true },
		    function (isConfirm) {
		        if (isConfirm) {
		            MasterMeterService.deleteMasterMeter(mastermeter, function(error, status) {
		            	if (angular.isDefined(status) && status == 204) {
		            		toaster.pop({
		            			type: 'success',
		            			title: 'Success',
		            			body: 'delete mastermeter success.',
		            			showCloseButton: true,
		            		});
		            		$scope.getAllMasterMeters();
		            	} else {
		            		toaster.pop({
		            			type: 'error',
		            			title: 'Failure',
		            			body: 'delete mastermeter faliure.',
		            			showCloseButton: true,
		            		});
		            	}
		            });
		        } 
		    });
	};
	
	$scope.getAllMasterMeters();
	

});

app.controller('ModalAddMasterMeterCtrl', function ($scope, $uibModalInstance,params) {

    $scope.operation="添加";
    $scope.mastermeters=params.mastermeters;
    $scope.ok = function () {
        $uibModalInstance.close($scope.mastermeter);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('ModalEditMasterMeterCtrl', function ($scope, $uibModalInstance, params) {
    $scope.operation="编辑";
    $scope.mastermeter = params.mastermeter;
    $scope.mastermeters=params.mastermeters;

    $scope.ok = function () {
        $uibModalInstance.close($scope.mastermeter);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});