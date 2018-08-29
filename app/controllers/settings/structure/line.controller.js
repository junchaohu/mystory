'use strict';

app.controller('LineController', function($scope, $uibModal,FactoryService,ShopService,LineService,toaster,SweetAlert) {
	
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
	$scope.getAllLines = function() {
		LineService.getAllLines(function(error, data) {
			if (!error) {
				$scope.lines = data;
			} else {
				$scope.lines = [];
			}
		});
	};

	$scope.getLinesByShopID = function(id) {
		LineService.getLinesByShopID(id,function(error, data) {
			if (!error) {
				$scope.lines = data;
			} else {
				$scope.lines = [];
			}
		});
		
	};


	$scope.addLine = function() {
		var modalInstance = $uibModal.open({
			templateUrl: 'views/settings/structure/line.model.html',
			controller: 'ModalAddLineCtrl',
			windowClass: "animated fadeIn",
		});
		modalInstance.result.then(function(line) {
			//$scope.devices.unshift(factory);
			line.shop_id=$scope.currentShop;
			LineService.addLine(line, function(error, status) {
				if (angular.isDefined(status) && status == 201) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'add line success.',
						showCloseButton: true,
					});
					$scope.$emit('handleEmitLineChanged');
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'add line faliure.',
						showCloseButton: true,
					});
				}
			});
		}, function() {

		});
	};

	$scope.editLine = function(line) {
		var modalInstance = $uibModal.open({
			windowClass: "animated fadeIn",
			templateUrl: 'views/settings/structure/line.model.html',
			controller: 'ModalEditLineCtrl',
			resolve: {
				params: function() {
					return {
						line: angular.copy(line)
					};
				}
			}
		});

		modalInstance.result.then(function(modifiedLine) {
			LineService.editLine(modifiedLine, function(error, status) {
				if (angular.isDefined(status) && status == 200) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'update line success.',
						showCloseButton: true,
					});
					$scope.$emit('handleEmitLineChanged');
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'update line faliure.',
						showCloseButton: true,
					});
				}
			});
		}, function() {
			//do nothing;
		});
	};

	$scope.deleteLine=function(line){
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
		            LineService.deleteLine(line, function(error, status) {
		            	if (angular.isDefined(status) && status == 204) {
		            		toaster.pop({
		            			type: 'success',
		            			title: 'Success',
		            			body: 'delete line success.',
		            			showCloseButton: true,
		            		});
							$scope.$emit('handleEmitLineChanged');
		            	} else {
		            		toaster.pop({
		            			type: 'error',
		            			title: 'Failure',
		            			body: 'delete line faliure.',
		            			showCloseButton: true,
		            		});
		            	}
		            });
		        } 
		    });
	};

	$scope.getAllFactories();
	//$scope.getAllShops();
	//$scope.getAllLines();
	$scope.$on('handleBroadcastFactoryChanged', function(event) {
		$scope.getAllFactories();
	});
	$scope.$on('handleBroadcastShopChanged', function(event) {
		//$scope.getAllShops();
		$scope.getShopsByFactoryID($scope.currentFactory);
	});
	$scope.$on('handleBroadcastLineChanged', function(event) {
		//$scope.getAllLines();
		$scope.getLinesByShopID($scope.currentShop);
	});
});

app.controller('ModalAddLineCtrl', function($scope, $uibModalInstance) {

	$scope.operation = "添加";
	$scope.ok = function() {
		$uibModalInstance.close($scope.line);
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});

app.controller('ModalEditLineCtrl', function($scope, $uibModalInstance, params) {
	$scope.operation = "编辑";
	$scope.line = params.line;

	$scope.ok = function() {
		$uibModalInstance.close($scope.line);
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});