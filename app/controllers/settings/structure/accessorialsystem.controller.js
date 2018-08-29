'use strict';

app.controller('AccessorialSystemController', function($scope,$uibModal, FactoryService, AccessorialSystemService, toaster,SweetAlert) {
	
	
	$scope.getAllFactories = function() {
		FactoryService.getAllFactories(function(error, data) {
			if (!error) {
				$scope.factories = data;
				if($scope.factories.length>0){
					$scope.currentFactory=$scope.factories[0].id;
					$scope.getAccessorialSystemsByFactoryID($scope.currentFactory);
				}
				
			} else {
				$scope.factories = [];
			}
		});
	};

	$scope.changeFactory=function(){
		$scope.getAccessorialSystemsByFactoryID($scope.currentFactory);
	};

	$scope.getAllAccessorialSystems = function() {
		AccessorialSystemService.getAllAccessorialSystems(function(error, data) {
			if (!error) {
				$scope.accessorialSystems = data;
			} else {
				$scope.accessorialSystems = [];
			}
		});
	};

	$scope.getAccessorialSystemsByFactoryID = function(id) {
		AccessorialSystemService.getAccessorialSystemsByFactoryID(id,function(error, data) {
			if (!error) {
				$scope.accessorialSystems = data;
			} else {
				$scope.accessorialSystems = [];
			}
		});
		
	};

	$scope.addAccessorialSystem = function() {
		var modalInstance = $uibModal.open({
			templateUrl: 'views/settings/structure/accessorialsystem.model.html',
			controller: 'ModalAddAccessorialSystemCtrl',
			windowClass: "animated fadeIn",
		});
		modalInstance.result.then(function(accessorialSystem) {
			//$scope.devices.unshift(factory);
			accessorialSystem.factory_id=$scope.currentFactory;
			AccessorialSystemService.addAccessorialSystem(accessorialSystem, function(error, status) {
				if (angular.isDefined(status) && status == 201) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'add accessorialSystem success.',
						showCloseButton: true,
					});
					$scope.$emit('handleEmitAccessorialSystemChanged');
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'add accessorialSystem faliure.',
						showCloseButton: true,
					});
				}
			});
		}, function() {

		});
	};

	$scope.editAccessorialSystem = function(accessorialSystem) {
		var modalInstance = $uibModal.open({
			windowClass: "animated fadeIn",
			templateUrl: 'views/settings/structure/accessorialsystem.model.html',
			controller: 'ModalEditAccessorialSystemCtrl',
			resolve: {
				params: function() {
					return {
						accessorialSystem: angular.copy(accessorialSystem)
					};
				}
			}
		});

		modalInstance.result.then(function(modifiedAccessorialSystem) {
			AccessorialSystemService.editAccessorialSystem(modifiedAccessorialSystem, function(error, status) {
				if (angular.isDefined(status) && status == 200) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'update accessorialSystem success.',
						showCloseButton: true,
					});
					$scope.$emit('handleEmitAccessorialSystemChanged');
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'update accessorialSystem faliure.',
						showCloseButton: true,
					});
				}
			});
		}, function() {
			//do nothing;
		});
	};

	$scope.deleteAccessorialSystem=function(accessorialSystem){
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
		            AccessorialSystemService.deleteAccessorialSystem(accessorialSystem, function(error, status) {
		            	if (angular.isDefined(status) && status == 204) {
		            		toaster.pop({
		            			type: 'success',
		            			title: 'Success',
		            			body: 'delete accessorialSystem success.',
		            			showCloseButton: true,
		            		});
		            		$scope.$emit('handleEmitAccessorialSystemChanged');
		            	} else {
		            		toaster.pop({
		            			type: 'error',
		            			title: 'Failure',
		            			body: 'delete accessorialSystem faliure.',
		            			showCloseButton: true,
		            		});
		            	}
		            });
		        } 
		    });
	};


	$scope.getAllFactories();
	//$scope.getAllAccessorialSystems();
	$scope.$on('handleBroadcastFactoryChanged', function(event) {
		$scope.getAllFactories();
	});
	$scope.$on('handleBroadcastAccessorialSystemChanged', function(event) {
		//$scope.getAllAccessorialSystems();
		$scope.getAccessorialSystemsByFactoryID($scope.currentFactory);
	});
});

app.controller('ModalAddAccessorialSystemCtrl', function($scope, $uibModalInstance) {

	$scope.operation = "添加";
	$scope.ok = function() {
		$uibModalInstance.close($scope.accessorialSystem);
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});

app.controller('ModalEditAccessorialSystemCtrl', function($scope, $uibModalInstance, params) {
	$scope.operation = "编辑";
	$scope.accessorialSystem = params.accessorialSystem;

	$scope.ok = function() {
		$uibModalInstance.close($scope.accessorialSystem);
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});