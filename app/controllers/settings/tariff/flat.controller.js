'use strict';

app.controller('FlatController', function($scope,$uibModal, FlatService,toaster,SweetAlert) {
	
	
	$scope.getAllFlats = function() {
		FlatService.getAllFlats(function(error, data) {
			if (!error) {
				$scope.flats = data;
			} else {
				$scope.flats = [];
			}
		});
		
	};

	$scope.addFlat = function() {
		var modalInstance = $uibModal.open({
			templateUrl: 'views/settings/tariff/flat.model.html',
			controller: 'ModalAddFlatCtrl',
			windowClass: "animated fadeIn",
			resolve: {
		        params:function(){
                    return {
                        flats:angular.copy($scope.flats)
                    };
                }
		    }
		});
		modalInstance.result.then(function(flat) {
			FlatService.addFlat(flat, function(error, status) {
				if (angular.isDefined(status) && status == 201) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'add flat success.',
						showCloseButton: true,
					});
					$scope.getAllFlats();
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'add flat faliure.',
						showCloseButton: true,
					});
				}
			});
		}, function() {

		});
	};

	$scope.editFlat=function(flat){
		var modalInstance = $uibModal.open({
		    windowClass: "animated fadeIn",
		    templateUrl: 'views/settings/tariff/flat.model.html',
		    controller: 'ModalEditFlatCtrl',
		    resolve: {
		        params:function(){
                    return {
                        flat:angular.copy(flat),
                        flats:angular.copy($scope.flats)
                    };
                }
		    }
		});

		modalInstance.result.then(function (modifiedFlat) {
	        FlatService.editFlat(modifiedFlat,function(error,status){
	            if(angular.isDefined(status) && status==200){
	                toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'update flat success.',
						showCloseButton: true,
					});
	                $scope.getAllFlats();
	            }else{
	                toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'update flat faliure.',
						showCloseButton: true,
					});
	            }
	        });
		}, function () {
	        //do nothing;
		});
	};

	$scope.deleteFlat=function(flat){
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
		            FlatService.deleteFlat(flat, function(error, status) {
		            	if (angular.isDefined(status) && status == 204) {
		            		toaster.pop({
		            			type: 'success',
		            			title: 'Success',
		            			body: 'delete flat success.',
		            			showCloseButton: true,
		            		});
		            		$scope.getAllFlats();
		            	} else {
		            		toaster.pop({
		            			type: 'error',
		            			title: 'Failure',
		            			body: 'delete flat faliure.',
		            			showCloseButton: true,
		            		});
		            	}
		            });
		        } 
		    });
	};
	
	$scope.getAllFlats();
	

});

app.controller('ModalAddFlatCtrl', function ($scope, $uibModalInstance,params) {

    $scope.operation="添加";
    $scope.flats=params.flats;
    $scope.ok = function () {
        $uibModalInstance.close($scope.flat);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('ModalEditFlatCtrl', function ($scope, $uibModalInstance, params) {
    $scope.operation="编辑";
    $scope.flat = params.flat;
    $scope.flats=params.flats;

    $scope.ok = function () {
        $uibModalInstance.close($scope.flat);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});