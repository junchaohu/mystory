'use strict';

app.controller('CategoryController', function($scope,$uibModal, CategoryService,toaster,SweetAlert) {
	
	
	$scope.getAllCategories = function() {
		CategoryService.getAllCategories(function(error, data) {
			if (!error) {
				$scope.categories = data;
			} else {
				$scope.categories = [];
			}
		});
		
	};

	$scope.addCategory = function() {
		var modalInstance = $uibModal.open({
			templateUrl: 'views/settings/category/category.model.html',
			controller: 'ModalAddCategoryCtrl',
			windowClass: "animated fadeIn",
			resolve: {
		        params:function(){
                    return {
                        categories:angular.copy($scope.categories)
                    };
                }
		    }
		});
		modalInstance.result.then(function(category) {
			CategoryService.addCategory(category, function(error, status) {
				if (angular.isDefined(status) && status == 201) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'add category success.',
						showCloseButton: true,
					});
					$scope.getAllCategories();
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'add category faliure.',
						showCloseButton: true,
					});
				}
			});
		}, function() {

		});
	};

	$scope.editCategory=function(category){
		var modalInstance = $uibModal.open({
		    windowClass: "animated fadeIn",
		    templateUrl: 'views/settings/category/category.model.html',
		    controller: 'ModalEditCategoryCtrl',
		    resolve: {
		        params:function(){
                    return {
                        category:angular.copy(category),
                        categories:angular.copy($scope.categories)
                    };
                }
		    }
		});

		modalInstance.result.then(function (modifiedCategory) {
	        CategoryService.editCategory(modifiedCategory,function(error,status){
	            if(angular.isDefined(status) && status==200){
	                toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'update category success.',
						showCloseButton: true,
					});
	                $scope.getAllCategories();
	            }else{
	                toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'update category faliure.',
						showCloseButton: true,
					});
	            }
	        });
		}, function () {
	        //do nothing;
		});
	};

	$scope.deleteCategory=function(category){
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
		            CategoryService.deleteCategory(category, function(error, status) {
		            	if (angular.isDefined(status) && status == 204) {
		            		toaster.pop({
		            			type: 'success',
		            			title: 'Success',
		            			body: 'delete category success.',
		            			showCloseButton: true,
		            		});
		            		$scope.getAllCategories();
		            	} else {
		            		toaster.pop({
		            			type: 'error',
		            			title: 'Failure',
		            			body: 'delete category faliure.',
		            			showCloseButton: true,
		            		});
		            	}
		            });
		        } 
		    });
	};
	
	$scope.getAllCategories();
	

});

app.controller('ModalAddCategoryCtrl', function ($scope, $uibModalInstance,params) {

    $scope.operation="添加";
    $scope.categories=params.categories;
    $scope.ok = function () {
        $uibModalInstance.close($scope.category);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('ModalEditCategoryCtrl', function ($scope, $uibModalInstance, params) {
    $scope.operation="编辑";
    $scope.category = params.category;
    $scope.categories=params.categories;

    $scope.ok = function () {
        $uibModalInstance.close($scope.category);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});