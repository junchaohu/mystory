'use strict';

app.controller('OfflineMeterController', function($scope,$uibModal, OfflineMeterService,toaster,SweetAlert) {
	
	
	$scope.getAllOfflineMeters = function() {
		OfflineMeterService.getAllOfflineMeters(function(error, data) {
			if (!error) {
				$scope.offlinemeters = data;
			} else {
				$scope.offlinemeters = [];
			}
		});
		
	};

	$scope.addOfflineMeter = function() {
		var modalInstance = $uibModal.open({
			templateUrl: 'views/settings/meter/offline-meter.model.html',
			controller: 'ModalAddOfflineMeterCtrl',
			windowClass: "animated fadeIn",
			resolve: {
		        params:function(){
                    return {
                        offlinemeters:angular.copy($scope.offlinemeters)
                    };
                }
		    }
		});
		modalInstance.result.then(function(offlinemeter) {
			OfflineMeterService.addOfflineMeter(offlinemeter, function(error, status) {
				if (angular.isDefined(status) && status == 201) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'add offlinemeter success.',
						showCloseButton: true,
					});
					$scope.getAllOfflineMeters();
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'add offlinemeter faliure.',
						showCloseButton: true,
					});
				}
			});
		}, function() {

		});
	};

	$scope.editOfflineMeter=function(offlinemeter){
		var modalInstance = $uibModal.open({
		    windowClass: "animated fadeIn",
		    templateUrl: 'views/settings/meter/offline-meter.model.html',
		    controller: 'ModalEditOfflineMeterCtrl',
		    resolve: {
		        params:function(){
                    return {
                        offlinemeter:angular.copy(offlinemeter),
                        offlinemeters:angular.copy($scope.offlinemeters)
                    };
                }
		    }
		});

		modalInstance.result.then(function (modifiedOfflineMeter) {
	        OfflineMeterService.editOfflineMeter(modifiedOfflineMeter,function(error,status){
	            if(angular.isDefined(status) && status==200){
	                toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'update offlinemeter success.',
						showCloseButton: true,
					});
	                $scope.getAllOfflineMeters();
	            }else{
	                toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'update offlinemeter faliure.',
						showCloseButton: true,
					});
	            }
	        });
		}, function () {
	        //do nothing;
		});
	};

	$scope.deleteOfflineMeter=function(offlinemeter){
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
		            OfflineMeterService.deleteOfflineMeter(offlinemeter, function(error, status) {
		            	if (angular.isDefined(status) && status == 204) {
		            		toaster.pop({
		            			type: 'success',
		            			title: 'Success',
		            			body: 'delete offlinemeter success.',
		            			showCloseButton: true,
		            		});
		            		$scope.getAllOfflineMeters();
		            	} else {
		            		toaster.pop({
		            			type: 'error',
		            			title: 'Failure',
		            			body: 'delete offlinemeter faliure.',
		            			showCloseButton: true,
		            		});
		            	}
		            });
		        } 
		    });
	};
	
	$scope.getAllOfflineMeters();

});

app.controller('ModalAddOfflineMeterCtrl', function ($scope, $uibModalInstance,params) {

    $scope.operation="添加";
    $scope.offlinemeters=params.offlinemeters;
    $scope.ok = function () {
        $uibModalInstance.close($scope.offlinemeter);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('ModalEditOfflineMeterCtrl', function ($scope, $uibModalInstance, params) {
    $scope.operation="编辑";
    $scope.offlinemeter = params.offlinemeter;
    $scope.offlinemeters=params.offlinemeters;

    $scope.ok = function () {
        $uibModalInstance.close($scope.offlinemeter);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});