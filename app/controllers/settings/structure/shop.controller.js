'use strict';

app.controller('ShopController', function($scope,$uibModal, FactoryService, ShopService, toaster,SweetAlert) {
	
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
			} else {
				$scope.shops = [];
			}
		});
	};

	$scope.getShopsByFactoryID = function(id) {
		ShopService.getShopsByFactoryID(id,function(error, data) {
			if (!error) {
				$scope.shops = data;
			} else {
				$scope.shops = [];
			}
		});
		
	};

	$scope.addShop = function() {
		var modalInstance = $uibModal.open({
			templateUrl: 'views/settings/structure/shop.model.html',
			controller: 'ModalAddShopCtrl',
			windowClass: "animated fadeIn",
		});
		modalInstance.result.then(function(shop) {
			//$scope.devices.unshift(factory);
			shop.factory_id=$scope.currentFactory;
			ShopService.addShop(shop, function(error, status) {
				if (angular.isDefined(status) && status == 201) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'add shop success.',
						showCloseButton: true,
					});
					$scope.$emit('handleEmitShopChanged');
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'add shop faliure.',
						showCloseButton: true,
					});
				}
			});
		}, function() {

		});
	};

	$scope.editShop = function(shop) {
		var modalInstance = $uibModal.open({
			windowClass: "animated fadeIn",
			templateUrl: 'views/settings/structure/shop.model.html',
			controller: 'ModalEditShopCtrl',
			resolve: {
				params: function() {
					return {
						shop: angular.copy(shop)
					};
				}
			}
		});

		modalInstance.result.then(function(modifiedShop) {
			ShopService.editShop(modifiedShop, function(error, status) {
				if (angular.isDefined(status) && status == 200) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'update shop success.',
						showCloseButton: true,
					});
					$scope.$emit('handleEmitShopChanged');
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'update shop faliure.',
						showCloseButton: true,
					});
				}
			});
		}, function() {
			//do nothing;
		});
	};

	$scope.deleteShop=function(shop){
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
		            ShopService.deleteShop(shop, function(error, status) {
		            	if (angular.isDefined(status) && status == 204) {
		            		toaster.pop({
		            			type: 'success',
		            			title: 'Success',
		            			body: 'delete shop success.',
		            			showCloseButton: true,
		            		});
		            		$scope.$emit('handleEmitShopChanged');
		            	} else {
		            		toaster.pop({
		            			type: 'error',
		            			title: 'Failure',
		            			body: 'delete shop faliure.',
		            			showCloseButton: true,
		            		});
		            	}
		            });
		        } 
		    });
	};


	$scope.getAllFactories();
	//$scope.getAllShops();
	$scope.$on('handleBroadcastFactoryChanged', function(event) {
		$scope.getAllFactories();
	});
	$scope.$on('handleBroadcastShopChanged', function(event) {
		//$scope.getAllShops();
		$scope.getShopsByFactoryID($scope.currentFactory);
	});
});

app.controller('ModalAddShopCtrl', function($scope, $uibModalInstance) {

	$scope.operation = "添加";
	$scope.ok = function() {
		$uibModalInstance.close($scope.shop);
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});

app.controller('ModalEditShopCtrl', function($scope, $uibModalInstance, params) {
	$scope.operation = "编辑";
	$scope.shop = params.shop;

	$scope.ok = function() {
		$uibModalInstance.close($scope.shop);
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});