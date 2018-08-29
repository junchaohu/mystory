'use strict';

app.controller('VirtualMeterController', function($scope,$uibModal, VirtualMeterService,toaster,SweetAlert) {
	
	
	$scope.getAllVirtualMeters = function() {
		VirtualMeterService.getAllVirtualMeters(function(error, data) {
			if (!error) {
				$scope.virtualmeters = data;
			} else {
				$scope.virtualmeters = [];
			}
		});
		
	};

	$scope.addVirtualMeter = function() {
		var modalInstance = $uibModal.open({
			templateUrl: 'views/settings/meter/virtual-meter.model.html',
			controller: 'ModalAddVirtualMeterCtrl',
			windowClass: "animated fadeIn",
			resolve: {
		        params:function(){
                    return {
                        virtualmeters:angular.copy($scope.virtualmeters)
                    };
                }
		    }
		});
		modalInstance.result.then(function(virtualmeter) {
			VirtualMeterService.addVirtualMeter(virtualmeter, function(error, status) {
				if (angular.isDefined(status) && status == 201) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'add virtualmeter success.',
						showCloseButton: true,
					});
					$scope.getAllVirtualMeters();
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'add virtualmeter faliure.',
						showCloseButton: true,
					});
				}
			});
		}, function() {

		});
	};

	$scope.editVirtualMeter=function(virtualmeter){
		var modalInstance = $uibModal.open({
		    windowClass: "animated fadeIn",
		    templateUrl: 'views/settings/meter/virtual-meter.model.html',
		    controller: 'ModalEditVirtualMeterCtrl',
		    resolve: {
		        params:function(){
                    return {
                        virtualmeter:angular.copy(virtualmeter),
                        virtualmeters:angular.copy($scope.virtualmeters)
                    };
                }
		    }
		});

		modalInstance.result.then(function (modifiedVirtualMeter) {
	        VirtualMeterService.editVirtualMeter(modifiedVirtualMeter,function(error,status){
	            if(angular.isDefined(status) && status==200){
	                toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'update virtualmeter success.',
						showCloseButton: true,
					});
	                $scope.getAllVirtualMeters();
	            }else{
	                toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'update virtualmeter faliure.',
						showCloseButton: true,
					});
	            }
	        });
		}, function () {
	        //do nothing;
		});
	};

	$scope.deleteVirtualMeter=function(virtualmeter){
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
		            VirtualMeterService.deleteVirtualMeter(virtualmeter, function(error, status) {
		            	if (angular.isDefined(status) && status == 204) {
		            		toaster.pop({
		            			type: 'success',
		            			title: 'Success',
		            			body: 'delete virtualmeter success.',
		            			showCloseButton: true,
		            		});
		            		$scope.getAllVirtualMeters();
		            	} else {
		            		toaster.pop({
		            			type: 'error',
		            			title: 'Failure',
		            			body: 'delete virtualmeter faliure.',
		            			showCloseButton: true,
		            		});
		            	}
		            });
		        } 
		    });
	};
	
	$scope.getAllVirtualMeters();

});

app.controller('ModalAddVirtualMeterCtrl', function ($scope, $uibModalInstance,params) {

    $scope.operation="添加";
    $scope.virtualmeters=params.virtualmeters;
    $scope.ok = function () {
        $uibModalInstance.close($scope.virtualmeter);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('ModalEditVirtualMeterCtrl', function ($scope, $uibModalInstance, params) {
    $scope.operation="编辑";
    $scope.virtualmeter = params.virtualmeter;
    $scope.virtualmeters=params.virtualmeters;

    $scope.ok = function () {
        $uibModalInstance.close($scope.virtualmeter);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});