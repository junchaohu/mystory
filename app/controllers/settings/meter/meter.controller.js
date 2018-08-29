'use strict';

app.controller('MeterController', function($scope,$uibModal, MeterService,toaster,SweetAlert) {
	
	
	$scope.getAllMeters = function() {
		MeterService.getAllMeters(function(error, data) {
			if (!error) {
				$scope.meters = data;
			} else {
				$scope.meters = [];
			}
		});
		
	};

	$scope.addMeter = function() {
		var modalInstance = $uibModal.open({
			templateUrl: 'views/settings/meter/sub-meter.model.html',
			controller: 'ModalAddMeterCtrl',
			windowClass: "animated fadeIn",
			resolve: {
		        params:function(){
                    return {
                        meters:angular.copy($scope.meters)
                    };
                }
		    }
		});
		modalInstance.result.then(function(meter) {
			MeterService.addMeter(meter, function(error, status) {
				if (angular.isDefined(status) && status == 201) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'add meter success.',
						showCloseButton: true,
					});
					$scope.getAllMeters();
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'add meter faliure.',
						showCloseButton: true,
					});
				}
			});
		}, function() {

		});
	};

	$scope.editMeter=function(meter){
		var modalInstance = $uibModal.open({
		    windowClass: "animated fadeIn",
		    templateUrl: 'views/settings/meter/sub-meter.model.html',
		    controller: 'ModalEditMeterCtrl',
		    resolve: {
		        params:function(){
                    return {
                        meter:angular.copy(meter),
                        meters:angular.copy($scope.meters)
                    };
                }
		    }
		});

		modalInstance.result.then(function (modifiedMeter) {
	        MeterService.editMeter(modifiedMeter,function(error,status){
	            if(angular.isDefined(status) && status==200){
	                toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'update meter success.',
						showCloseButton: true,
					});
	                $scope.getAllMeters();
	            }else{
	                toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'update meter faliure.',
						showCloseButton: true,
					});
	            }
	        });
		}, function () {
	        //do nothing;
		});
	};

	$scope.deleteMeter=function(meter){
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
		            MeterService.deleteMeter(meter, function(error, status) {
		            	if (angular.isDefined(status) && status == 204) {
		            		toaster.pop({
		            			type: 'success',
		            			title: 'Success',
		            			body: 'delete meter success.',
		            			showCloseButton: true,
		            		});
		            		$scope.getAllMeters();
		            	} else {
		            		toaster.pop({
		            			type: 'error',
		            			title: 'Failure',
		            			body: 'delete meter faliure.',
		            			showCloseButton: true,
		            		});
		            	}
		            });
		        } 
		    });
	};
	
	$scope.getAllMeters();
	

});

app.controller('ModalAddMeterCtrl', function ($scope, $uibModalInstance,params) {

    $scope.operation="添加";
    $scope.meters=params.meters;
    $scope.ok = function () {
        $uibModalInstance.close($scope.meter);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('ModalEditMeterCtrl', function ($scope, $uibModalInstance, params) {
    $scope.operation="编辑";
    $scope.meter = params.meter;
    $scope.meters=params.meters;

    $scope.ok = function () {
        $uibModalInstance.close($scope.meter);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});