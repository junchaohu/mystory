'use strict';

app.controller('MachineController', function($scope, $uibModal,FactoryService,ShopService,LineService,MachineService,toaster,SweetAlert) {
	$scope.getAllFactories = function() {
		FactoryService.getAllFactories(function(error, data) {
			if (!error) {
				$scope.factories = data;
				if($scope.factories.length>0){
					$scope.currentFactory=$scope.factories[0].id;
					$scope.getShopsByFactoryID($scope.currentFactory);
				}
				
			} else {
				$scope.factories = [];
			}
		});
	};

	$scope.changeFactory=function(){
		$scope.getShopsByFactoryID($scope.currentFactory);
	};

	$scope.getAllShops = function() {
		ShopService.getAllShops(function(error, data) {
			if (!error) {
				$scope.shops = data;
				$scope.currentShop=$scope.shops[0].id;
			} else {
				$scope.shops = [];
			}
		});
	};

	$scope.getShopsByFactoryID = function(id) {
		ShopService.getShopsByFactoryID(id,function(error, data) {
			if (!error) {
				$scope.shops = data;
				if($scope.shops.length>0){
					$scope.currentShop=$scope.shops[0].id;
					$scope.getLinesByShopID($scope.currentShop);
				}
			} else {
				$scope.shops = [];
			}
		});
		
	};

	$scope.changeShop=function(){
		$scope.getLinesByShopID($scope.currentShop);
	};

	$scope.getLinesByShopID = function(id) {
		LineService.getLinesByShopID(id,function(error, data) {
			if (!error) {
				$scope.lines = data;
				if($scope.lines.length>0){
					$scope.currentLine=$scope.lines[0].id;
					$scope.getMachinesByLineID($scope.currentLine);
				}
			} else {
				$scope.lines = [];
			}
		});
		
	};
	$scope.getAllMachines = function() {
		MachineService.getAllMachines(function(error, data) {
			if (!error) {
				$scope.machines = data;
			} else {
				$scope.machines = [];
			}
		});
	};

	$scope.getMachinesByLineID = function(id) {
		MachineService.getMachinesByLineID(id,function(error, data) {
			if (!error) {
				$scope.machines = data;
			} else {
				$scope.machines = [];
			}
		});
		
	};
	$scope.changeLine=function(){
		$scope.getMachinesByLineID($scope.currentLine);
	};

	$scope.addMachine = function() {
		var modalInstance = $uibModal.open({
			templateUrl: 'views/settings/machine/machine.model.html',
			controller: 'ModalAddMachineCtrl',
			windowClass: "animated fadeIn",
		});
		modalInstance.result.then(function(machine) {
			//$scope.devices.unshift(factory);
			machine.line_id=$scope.currentLine;
			MachineService.addMachine(machine, function(error, status) {
				if (angular.isDefined(status) && status == 201) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'add machine success.',
						showCloseButton: true,
					});
					$scope.getMachinesByLineID($scope.currentLine);
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'add machine faliure.',
						showCloseButton: true,
					});
				}
			});
		}, function() {

		});
	};

	$scope.editMachine = function(machine) {
		var modalInstance = $uibModal.open({
			windowClass: "animated fadeIn",
			templateUrl: 'views/settings/machine/machine.model.html',
			controller: 'ModalEditMachineCtrl',
			resolve: {
				params: function() {
					return {
						machine: angular.copy(machine)
					};
				}
			}
		});

		modalInstance.result.then(function(modifiedMachine) {
			MachineService.editMachine(modifiedMachine, function(error, status) {
				if (angular.isDefined(status) && status == 200) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'update machine success.',
						showCloseButton: true,
					});
					$scope.getMachinesByLineID($scope.currentLine);
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'update machine faliure.',
						showCloseButton: true,
					});
				}
			});
		}, function() {
			//do nothing;
		});
	};

	$scope.deleteMachine=function(machine){
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
		            MachineService.deleteMachine(machine, function(error, status) {
		            	if (angular.isDefined(status) && status == 204) {
		            		toaster.pop({
		            			type: 'success',
		            			title: 'Success',
		            			body: 'delete machine success.',
		            			showCloseButton: true,
		            		});
							$scope.getMachinesByLineID($scope.currentLine);
		            	} else {
		            		toaster.pop({
		            			type: 'error',
		            			title: 'Failure',
		            			body: 'delete machine faliure.',
		            			showCloseButton: true,
		            		});
		            	}
		            });
		        } 
		    });
	};

	$scope.getAllFactories();
	
});

app.controller('ModalAddMachineCtrl', function($scope, $uibModalInstance) {

	$scope.operation = "添加";
	$scope.ok = function() {
		$uibModalInstance.close($scope.machine);
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});

app.controller('ModalEditMachineCtrl', function($scope, $uibModalInstance, params) {
	$scope.operation = "编辑";
	$scope.machine = params.machine;

	$scope.ok = function() {
		$uibModalInstance.close($scope.machine);
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});