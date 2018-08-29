'use strict';

app.controller('ComplexController', function($scope,$uibModal, ComplexService,toaster,SweetAlert) {
	
	
	$scope.getAllComplexes = function() {
		ComplexService.getAllComplexes(function(error, data) {
			if (!error) {
				$scope.complexes = data;
			} else {
				$scope.complexes = [];
			}
		});
		
	};

	$scope.addComplex = function() {
		var modalInstance = $uibModal.open({
			templateUrl: 'views/settings/product/complex.model.html',
			controller: 'ModalAddComplexCtrl',
			windowClass: "animated fadeIn",
			
		});
		modalInstance.result.then(function(complex) {
			ComplexService.addComplex(complex, function(error, status) {
				if (angular.isDefined(status) && status == 201) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'add complex success.',
						showCloseButton: true,
					});
					$scope.$emit('handleEmitComplexChanged');
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'add complex faliure.',
						showCloseButton: true,
					});
				}
			});
		}, function() {

		});
	};

	$scope.editComplex=function(complex){
		var modalInstance = $uibModal.open({
		    windowClass: "animated fadeIn",
		    templateUrl: 'views/settings/product/complex.model.html',
		    controller: 'ModalEditComplexCtrl',
		    resolve: {
		        params:function(){
                    return {
                        complex:angular.copy(complex),
                        complexes:angular.copy($scope.complexes)
                    };
                }
		    }
		});

		modalInstance.result.then(function (modifiedComplex) {
	        ComplexService.editComplex(modifiedComplex,function(error,status){
	            if(angular.isDefined(status) && status==200){
	                toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'update complex success.',
						showCloseButton: true,
					});
	                $scope.$emit('handleEmitComplexChanged');
	            }else{
	                toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'update complex faliure.',
						showCloseButton: true,
					});
	            }
	        });
		}, function () {
	        //do nothing;
		});
	};

	$scope.deleteComplex=function(complex){
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
		            ComplexService.deleteComplex(complex, function(error, status) {
		            	if (angular.isDefined(status) && status == 204) {
		            		toaster.pop({
		            			type: 'success',
		            			title: 'Success',
		            			body: 'delete complex success.',
		            			showCloseButton: true,
		            		});
		            		$scope.$emit('handleEmitComplexChanged');
		            	} else {
		            		toaster.pop({
		            			type: 'error',
		            			title: 'Failure',
		            			body: 'delete complex faliure.',
		            			showCloseButton: true,
		            		});
		            	}
		            });
		        } 
		    });
	};
	
	$scope.getAllComplexes();
	$scope.$on('handleBroadcastComplexChanged', function(event) {
		$scope.getAllComplexes();
	});

});

app.controller('ModalAddComplexCtrl', function ($scope, $uibModalInstance) {

    $scope.operation="添加";
    $scope.ok = function () {
        $uibModalInstance.close($scope.complex);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('ModalEditComplexCtrl', function ($scope, $uibModalInstance, params) {
    $scope.operation="编辑";
    $scope.complex = params.complex;
    $scope.complexes=params.complexes;

    $scope.ok = function () {
        $uibModalInstance.close($scope.complex);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});