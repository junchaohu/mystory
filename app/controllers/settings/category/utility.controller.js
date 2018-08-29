'use strict';

app.controller('UtilityController', function($scope,$uibModal, UtilityService,toaster,SweetAlert) {
	
	
	$scope.getAllUtilities = function() {
		UtilityService.getAllUtilities(function(error, data) {
			if (!error) {
				$scope.utilities = data;
			} else {
				$scope.utilities = [];
			}
		});
		
	};

	$scope.addUtility = function() {
		var modalInstance = $uibModal.open({
			templateUrl: 'views/settings/category/utility.model.html',
			controller: 'ModalAddUtilityCtrl',
			windowClass: "animated fadeIn",
			resolve: {
		        params:function(){
                    return {
                        utilities:angular.copy($scope.utilities)
                    };
                }
		    }
		});
		modalInstance.result.then(function(utility) {
			UtilityService.addUtility(utility, function(error, status) {
				if (angular.isDefined(status) && status == 201) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'add utility success.',
						showCloseButton: true,
					});
					$scope.getAllUtilities();
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'add utility faliure.',
						showCloseButton: true,
					});
				}
			});
		}, function() {

		});
	};

	$scope.editUtility=function(utility){
		var modalInstance = $uibModal.open({
		    windowClass: "animated fadeIn",
		    templateUrl: 'views/settings/category/utility.model.html',
		    controller: 'ModalEditUtilityCtrl',
		    resolve: {
		        params:function(){
                    return {
                        utility:angular.copy(utility),
                        utilities:angular.copy($scope.utilities)
                    };
                }
		    }
		});

		modalInstance.result.then(function (modifiedUtility) {
	        UtilityService.editUtility(modifiedUtility,function(error,status){
	            if(angular.isDefined(status) && status==200){
	                toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'update utility success.',
						showCloseButton: true,
					});
	                $scope.getAllUtilities();
	            }else{
	                toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'update utility faliure.',
						showCloseButton: true,
					});
	            }
	        });
		}, function () {
	        //do nothing;
		});
	};

	$scope.deleteUtility=function(utility){
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
		            UtilityService.deleteUtility(utility, function(error, status) {
		            	if (angular.isDefined(status) && status == 204) {
		            		toaster.pop({
		            			type: 'success',
		            			title: 'Success',
		            			body: 'delete utility success.',
		            			showCloseButton: true,
		            		});
		            		$scope.getAllUtilities();
		            	} else {
		            		toaster.pop({
		            			type: 'error',
		            			title: 'Failure',
		            			body: 'delete utility faliure.',
		            			showCloseButton: true,
		            		});
		            	}
		            });
		        } 
		    });
	};
	
	$scope.getAllUtilities();
	

});

app.controller('ModalAddUtilityCtrl', function ($scope, $uibModalInstance,params) {

    $scope.operation="添加";
    $scope.utilities=params.utilities;
    $scope.ok = function () {
        $uibModalInstance.close($scope.utility);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('ModalEditUtilityCtrl', function ($scope, $uibModalInstance, params) {
    $scope.operation="编辑";
    $scope.utility = params.utility;
    $scope.utilities=params.utilities;

    $scope.ok = function () {
        $uibModalInstance.close($scope.utility);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});