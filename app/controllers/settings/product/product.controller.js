'use strict';

app.controller('ProductController', function($scope,$uibModal, ProductService,toaster,SweetAlert) {
	
	
	$scope.getAllProducts = function() {
		ProductService.getAllProducts(function(error, data) {
			if (!error) {
				$scope.products = data;
			} else {
				$scope.products = [];
			}
		});
		
	};

	$scope.addProduct = function() {
		var modalInstance = $uibModal.open({
			templateUrl: 'views/settings/product/product.model.html',
			controller: 'ModalAddProductCtrl',
			windowClass: "animated fadeIn",
		});
		modalInstance.result.then(function(product) {
			ProductService.addProduct(product, function(error, status) {
				if (angular.isDefined(status) && status == 201) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'add product success.',
						showCloseButton: true,
					});
					$scope.getAllProducts();
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'add product faliure.',
						showCloseButton: true,
					});
				}
			});
		}, function() {

		});
	};

	$scope.editProduct=function(product){
		var modalInstance = $uibModal.open({
		    windowClass: "animated fadeIn",
		    templateUrl: 'views/settings/product/product.model.html',
		    controller: 'ModalEditProductCtrl',
		    resolve: {
		        params:function(){
                    return {
                        product:angular.copy(product),
                        products:angular.copy($scope.products)
                    };
                }
		    }
		});

		modalInstance.result.then(function (modifiedProduct) {
	        ProductService.editProduct(modifiedProduct,function(error,status){
	            if(angular.isDefined(status) && status==200){
	                toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'update product success.',
						showCloseButton: true,
					});
	                $scope.getAllProducts();
	            }else{
	                toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'update product faliure.',
						showCloseButton: true,
					});
	            }
	        });
		}, function () {
	        //do nothing;
		});
	};

	$scope.deleteProduct=function(product){
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
		            ProductService.deleteProduct(product, function(error, status) {
		            	if (angular.isDefined(status) && status == 204) {
		            		toaster.pop({
		            			type: 'success',
		            			title: 'Success',
		            			body: 'delete product success.',
		            			showCloseButton: true,
		            		});
		            		$scope.getAllProducts();
		            	} else {
		            		toaster.pop({
		            			type: 'error',
		            			title: 'Failure',
		            			body: 'delete product faliure.',
		            			showCloseButton: true,
		            		});
		            	}
		            });
		        } 
		    });
	};
	
	$scope.getAllProducts();
	

});

app.controller('ModalAddProductCtrl', function ($scope, $uibModalInstance) {

    $scope.operation="添加";
    $scope.ok = function () {
        $uibModalInstance.close($scope.product);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('ModalEditProductCtrl', function ($scope, $uibModalInstance, params) {
    $scope.operation="编辑";
    $scope.product = params.product;
    $scope.products=params.products;

    $scope.ok = function () {
        $uibModalInstance.close($scope.product);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});