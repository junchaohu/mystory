'use strict';

app.controller('PartController', function($scope,$uibModal, ComplexService, PartService, toaster,SweetAlert) {
	
	$scope.getAllComplexes = function() {
		ComplexService.getAllComplexes(function(error, data) {
			if (!error) {
				$scope.complexes = data;
				if($scope.complexes.length>0){
					$scope.currentComplex=$scope.complexes[0].id;
					$scope.getPartsByComplexID($scope.currentComplex);
				}
				
			} else {
				$scope.complexes = [];
			}
		});
	};

	$scope.changeComplex=function(){
		$scope.getPartsByComplexID($scope.currentComplex);
	};

	$scope.getAllParts = function() {
		PartService.getAllParts(function(error, data) {
			if (!error) {
				$scope.parts = data;
			} else {
				$scope.parts = [];
			}
		});
	};

	$scope.getPartsByComplexID = function(id) {
		PartService.getPartsByComplexID(id,function(error, data) {
			if (!error) {
				$scope.parts = data;
			} else {
				$scope.parts = [];
			}
		});
		
	};

	$scope.addPart = function() {
		var modalInstance = $uibModal.open({
			templateUrl: 'views/settings/product/part.model.html',
			controller: 'ModalAddPartCtrl',
			windowClass: "animated fadeIn",
		});
		modalInstance.result.then(function(part) {
			//$scope.devices.unshift(factory);
			part.complex_id=$scope.currentComplex;
			PartService.addPart(part, function(error, status) {
				if (angular.isDefined(status) && status == 201) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'add part success.',
						showCloseButton: true,
					});
					$scope.$emit('handleEmitPartChanged');
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'add part faliure.',
						showCloseButton: true,
					});
				}
			});
		}, function() {

		});
	};

	$scope.editPart = function(part) {
		var modalInstance = $uibModal.open({
			windowClass: "animated fadeIn",
			templateUrl: 'views/settings/product/part.model.html',
			controller: 'ModalEditPartCtrl',
			resolve: {
				params: function() {
					return {
						part: angular.copy(part)
					};
				}
			}
		});

		modalInstance.result.then(function(modifiedPart) {
			PartService.editPart(modifiedPart, function(error, status) {
				if (angular.isDefined(status) && status == 200) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'update part success.',
						showCloseButton: true,
					});
					$scope.$emit('handleEmitPartChanged');
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'update part faliure.',
						showCloseButton: true,
					});
				}
			});
		}, function() {
			//do nothing;
		});
	};

	$scope.deletePart=function(part){
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
		            PartService.deletePart(part, function(error, status) {
		            	if (angular.isDefined(status) && status == 204) {
		            		toaster.pop({
		            			type: 'success',
		            			title: 'Success',
		            			body: 'delete part success.',
		            			showCloseButton: true,
		            		});
		            		$scope.$emit('handleEmitPartChanged');
		            	} else {
		            		toaster.pop({
		            			type: 'error',
		            			title: 'Failure',
		            			body: 'delete part faliure.',
		            			showCloseButton: true,
		            		});
		            	}
		            });
		        } 
		    });
	};


	$scope.getAllComplexes();
	//$scope.getAllParts();
	$scope.$on('handleBroadcastComplexChanged', function(event) {
		$scope.getAllComplexes();
	});
	$scope.$on('handleBroadcastPartChanged', function(event) {
		//$scope.getAllParts();
		$scope.getPartsByComplexID($scope.currentComplex);
	});
});

app.controller('ModalAddPartCtrl', function($scope, $uibModalInstance) {

	$scope.operation = "添加";
	$scope.ok = function() {
		$uibModalInstance.close($scope.part);
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});

app.controller('ModalEditPartCtrl', function($scope, $uibModalInstance, params) {
	$scope.operation = "编辑";
	$scope.part = params.part;

	$scope.ok = function() {
		$uibModalInstance.close($scope.part);
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});