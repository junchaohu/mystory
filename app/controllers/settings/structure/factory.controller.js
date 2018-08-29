'use strict';

app.controller('FactoryController', function($scope,$uibModal, FactoryService,toaster,SweetAlert) {
	
	$scope.getAllFactories = function() {
		FactoryService.getAllFactories(function(error, data) {
			if (!error) {
				$scope.factories = data;
			} else {
				$scope.factories = [];
			}
		});
		
	};

	$scope.addFactory = function() {
		var modalInstance = $uibModal.open({
			templateUrl: 'views/settings/structure/factory.model.html',
			controller: 'ModalAddFactoryCtrl',
			windowClass: "animated fadeIn",
			resolve: {
		        params:function(){
                    return {
                        factories:angular.copy($scope.factories)
                    };
                }
		    }
		});
		modalInstance.result.then(function(factory) {
			//$scope.devices.unshift(factory);
			factory.company_id=1;
			FactoryService.addFactory(factory, function(error, status) {
				if (angular.isDefined(status) && status == 201) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'add factory success.',
						showCloseButton: true,
					});
					//$scope.getAllFactories();
					$scope.$emit('handleEmitFactoryChanged');
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'add factory faliure.',
						showCloseButton: true,
					});
				}
			});
		}, function() {

		});
	};

	$scope.editFactory=function(factory){
		var modalInstance = $uibModal.open({
		    windowClass: "animated fadeIn",
		    templateUrl: 'views/settings/structure/factory.model.html',
		    controller: 'ModalEditFactoryCtrl',
		    resolve: {
		        params:function(){
                    return {
                        factory:angular.copy(factory),
                        factories:angular.copy($scope.factories)
                    };
                }
		    }
		});

		modalInstance.result.then(function (modifiedFactory) {
	        FactoryService.editFactory(modifiedFactory,function(error,status){
	            if(angular.isDefined(status) && status==200){
	                toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'update factory success.',
						showCloseButton: true,
					});
	                $scope.$emit('handleEmitFactoryChanged');
	            }else{
	                toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'update factory faliure.',
						showCloseButton: true,
					});
	            }
	        });
		}, function () {
	        //do nothing;
		});
	};

	$scope.deleteFactory=function(factory){
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
		            FactoryService.deleteFactory(factory, function(error, status) {
		            	if (angular.isDefined(status) && status == 204) {
		            		toaster.pop({
		            			type: 'success',
		            			title: 'Success',
		            			body: 'delete factory success.',
		            			showCloseButton: true,
		            		});
		            		$scope.$emit('handleEmitFactoryChanged');
		            	} else {
		            		toaster.pop({
		            			type: 'error',
		            			title: 'Failure',
		            			body: 'delete factory faliure.',
		            			showCloseButton: true,
		            		});
		            	}
		            });
		        } 
		    });
	};
	
	$scope.getAllFactories();
	$scope.$on('handleBroadcastFactoryChanged', function(event) {
		$scope.getAllFactories();
	});

});

app.controller('ModalAddFactoryCtrl', function ($scope, $uibModalInstance,params) {

    $scope.operation="添加";
    $scope.factories=params.factories;
    $scope.ok = function () {
        $uibModalInstance.close($scope.factory);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('ModalEditFactoryCtrl', function ($scope, $uibModalInstance, params) {
    $scope.operation="编辑";
    $scope.factory = params.factory;
    $scope.factories=params.factories;

    $scope.ok = function () {
        $uibModalInstance.close($scope.factory);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});