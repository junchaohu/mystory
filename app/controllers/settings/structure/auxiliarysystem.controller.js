'use strict';

app.controller('AuxiliarySystemController', function($scope,$uibModal, FactoryService, AuxiliarySystemService, toaster,SweetAlert) {
	
	
	$scope.getAllFactories = function() {
		FactoryService.getAllFactories(function(error, data) {
			if (!error) {
				$scope.factories = data;
				if($scope.factories.length>0){
					$scope.currentFactory=$scope.factories[0].id;
					$scope.getAuxiliarySystemsByFactoryID($scope.currentFactory);
				}
				
			} else {
				$scope.factories = [];
			}
		});
	};

	$scope.changeFactory=function(){
		$scope.getAuxiliarySystemsByFactoryID($scope.currentFactory);
	};

	$scope.getAllAuxiliarySystems = function() {
		AuxiliarySystemService.getAllAuxiliarySystems(function(error, data) {
			if (!error) {
				$scope.auxiliarySystems = data;
			} else {
				$scope.auxiliarySystems = [];
			}
		});
	};

	$scope.getAuxiliarySystemsByFactoryID = function(id) {
		AuxiliarySystemService.getAuxiliarySystemsByFactoryID(id,function(error, data) {
			if (!error) {
				$scope.auxiliarySystems = data;
			} else {
				$scope.auxiliarySystems = [];
			}
		});
		
	};

	$scope.addAuxiliarySystem = function() {
		var modalInstance = $uibModal.open({
			templateUrl: 'views/settings/structure/auxiliarysystem.model.html',
			controller: 'ModalAddAuxiliarySystemCtrl',
			windowClass: "animated fadeIn",
		});
		modalInstance.result.then(function(auxiliarySystem) {
			//$scope.devices.unshift(factory);
			auxiliarySystem.factory_id=$scope.currentFactory;
			AuxiliarySystemService.addAuxiliarySystem(auxiliarySystem, function(error, status) {
				if (angular.isDefined(status) && status == 201) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'add auxiliarySystem success.',
						showCloseButton: true,
					});
					$scope.$emit('handleEmitAuxiliarySystemChanged');
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'add auxiliarySystem faliure.',
						showCloseButton: true,
					});
				}
			});
		}, function() {

		});
	};

	$scope.editAuxiliarySystem = function(auxiliarySystem) {
		var modalInstance = $uibModal.open({
			windowClass: "animated fadeIn",
			templateUrl: 'views/settings/structure/auxiliarysystem.model.html',
			controller: 'ModalEditAuxiliarySystemCtrl',
			resolve: {
				params: function() {
					return {
						auxiliarySystem: angular.copy(auxiliarySystem)
					};
				}
			}
		});

		modalInstance.result.then(function(modifiedAuxiliarySystem) {
			AuxiliarySystemService.editAuxiliarySystem(modifiedAuxiliarySystem, function(error, status) {
				if (angular.isDefined(status) && status == 200) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'update auxiliarySystem success.',
						showCloseButton: true,
					});
					$scope.$emit('handleEmitAuxiliarySystemChanged');
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'update auxiliarySystem faliure.',
						showCloseButton: true,
					});
				}
			});
		}, function() {
			//do nothing;
		});
	};

	$scope.deleteAuxiliarySystem=function(auxiliarySystem){
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
		            AuxiliarySystemService.deleteAuxiliarySystem(auxiliarySystem, function(error, status) {
		            	if (angular.isDefined(status) && status == 204) {
		            		toaster.pop({
		            			type: 'success',
		            			title: 'Success',
		            			body: 'delete auxiliarySystem success.',
		            			showCloseButton: true,
		            		});
		            		$scope.$emit('handleEmitAuxiliarySystemChanged');
		            	} else {
		            		toaster.pop({
		            			type: 'error',
		            			title: 'Failure',
		            			body: 'delete auxiliarySystem faliure.',
		            			showCloseButton: true,
		            		});
		            	}
		            });
		        } 
		    });
	};


	$scope.getAllFactories();
	//$scope.getAllAuxiliarySystems();
	$scope.$on('handleBroadcastFactoryChanged', function(event) {
		$scope.getAllFactories();
	});
	$scope.$on('handleBroadcastAuxiliarySystemChanged', function(event) {
		//$scope.getAllAuxiliarySystems();
		$scope.getAuxiliarySystemsByFactoryID($scope.currentFactory);
	});
});

app.controller('ModalAddAuxiliarySystemCtrl', function($scope, $uibModalInstance) {

	$scope.operation = "添加";
	$scope.ok = function() {
		$uibModalInstance.close($scope.auxiliarySystem);
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});

app.controller('ModalEditAuxiliarySystemCtrl', function($scope, $uibModalInstance, params) {
	$scope.operation = "编辑";
	$scope.auxiliarySystem = params.auxiliarySystem;

	$scope.ok = function() {
		$uibModalInstance.close($scope.auxiliarySystem);
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});