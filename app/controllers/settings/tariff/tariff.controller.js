'use strict';

app.controller('TariffController', function($scope, $uibModal, TARIFF_TYPE, PEAK_TYPE, TariffService, CategoryService, toaster, SweetAlert) {

	$scope.getAllCategories = function() {
		CategoryService.getAllCategories(function(error, data) {
			if (!error) {
				$scope.categories = data;
			} else {
				$scope.categories = [];
			}
		});

	};
	$scope.getAllTariffs = function() {
		TariffService.getAllTariffs(function(error, data) {
			if (!error) {
				$scope.tariffs = data;
			} else {
				$scope.tariffs = [];
			}
		});

	};

	$scope.showTariffType = function(type) {
		return TARIFF_TYPE[type];
	};

	$scope.addTariff = function() {
		var modalInstance = $uibModal.open({
			templateUrl: 'views/settings/tariff/tariff.model.html',
			controller: 'ModalAddTariffCtrl',
			windowClass: "animated fadeIn",
			size: 'lg',
			resolve: {
				params: function() {
					return {
						categories: angular.copy($scope.categories)
					};
				}
			}
		});
		modalInstance.result.then(function(tariff) {
			TariffService.addTariff(tariff, function(error, status) {
				if (angular.isDefined(status) && status == 201) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'add tariff success.',
						showCloseButton: true,
					});
					$scope.getAllTariffs();
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'add tariff faliure.',
						showCloseButton: true,
					});
				}
			});
		}, function() {

		});
	};

	$scope.editTariff = function(tariff) {
		var modalInstance = $uibModal.open({
			windowClass: "animated fadeIn",
			templateUrl: 'views/settings/tariff/tariff.model.html',
			controller: 'ModalEditTariffCtrl',
			size: 'lg',
			resolve: {
				params: function() {
					return {
						tariff: angular.copy(tariff),
						categories: angular.copy($scope.categories)
					};
				}
			}
		});

		modalInstance.result.then(function(modifiedTariff) {
			TariffService.editTariff(modifiedTariff, function(error, status) {
				if (angular.isDefined(status) && status == 200) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'update tariff success.',
						showCloseButton: true,
					});
					$scope.getAllTariffs();
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'update tariff faliure.',
						showCloseButton: true,
					});
				}
			});
		}, function() {
			//do nothing;
		});
	};

	$scope.deleteTariff = function(tariff) {
		SweetAlert.swal({
				title: "Are you sure?",
				text: "Your will not be able to recover this imaginary item!",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "Yes, delete it!",
				cancelButtonText: "No, cancel plx!",
				closeOnConfirm: true,
				closeOnCancel: true
			},
			function(isConfirm) {
				if (isConfirm) {
					TariffService.deleteTariff(tariff, function(error, status) {
						if (angular.isDefined(status) && status == 204) {
							toaster.pop({
								type: 'success',
								title: 'Success',
								body: 'delete tariff success.',
								showCloseButton: true,
							});
							$scope.getAllTariffs();
						} else {
							toaster.pop({
								type: 'error',
								title: 'Failure',
								body: 'delete tariff faliure.',
								showCloseButton: true,
							});
						}
					});
				}
			});
	};

	$scope.getAllTariffs();
	$scope.getAllCategories();

});

app.controller('ModalAddTariffCtrl', function($scope, $timeout, $uibModalInstance, TARIFF_TYPE, PEAK_TYPE, params) {

	$scope.operation = "添加";
	$scope.disable=false;
	$scope.categories = params.categories;
	$scope.timeofuse = [];
	$scope.block=[];
	$scope.showPeakType = function(type) {
		return PEAK_TYPE[type];
	};
	
	$scope.ok = function() {
		if($scope.tariff.tariff_type=='timeofuse'){
			$scope.tariff.timeofuse=$scope.timeofuse;
		}else if($scope.tariff.tariff_type=='block'){
			$scope.tariff.block=$scope.block;
		}
		$uibModalInstance.close($scope.tariff);
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
	$scope.add = function(t) {
		if ($scope.tariff.tariff_type == 'timeofuse') {
			if ($scope.timeofuse.length > 0) {
				$scope.timeofuse.unshift(angular.copy(t));
			} else {
				$scope.timeofuse.push(angular.copy(t));
			}
			$scope.t = {};

			$timeout(function() {
				angular.element('#touTable').trigger('footable_redraw');
			}, 10);
		} else if($scope.tariff.tariff_type=='block'){
			if ($scope.block.length > 0) {
				$scope.block.unshift(angular.copy(t));
			} else {
				$scope.block.push(angular.copy(t));
			}
			$scope.b = {};

			$timeout(function() {
				angular.element('#blockTable').trigger('footable_redraw');
			}, 10);
		}

	};
	$scope.delete = function(key) {
		if($scope.tariff.tariff_type=='timeofuse'){
			$scope.timeofuse.splice(key, 1);
			$timeout(function() {
				angular.element('#touTable').trigger('footable_redraw');
			}, 10);
		}else if($scope.tariff.tariff_type=='block'){
			$scope.block.splice(key, 1);
			$timeout(function() {
				angular.element('#blockTable').trigger('footable_redraw');
			}, 10);
		}
		
	}
});

app.controller('ModalEditTariffCtrl', function($scope, $timeout, $uibModalInstance, TARIFF_TYPE, PEAK_TYPE, params) {
	$scope.operation = "编辑";
	$scope.disable=true;
	$scope.tariff = params.tariff;
	$scope.categories = params.categories;
	$scope.timeofuse = $scope.tariff.timeofuse;
	$scope.block=$scope.tariff.block;
	$scope.showPeakType = function(type) {
		return PEAK_TYPE[type];
	};
	$timeout(function() {
		if ($scope.tariff.tariff_type == 'timeofuse') {
			angular.element('#touTable').trigger('footable_redraw');
		} else if ($scope.tariff.tariff_type == 'block') {
			angular.element('#blockTable').trigger('footable_redraw');
		}
	}, 100);

	$scope.ok = function() {
		$uibModalInstance.close($scope.tariff);
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
	$scope.add = function(t) {
		if ($scope.tariff.tariff_type == 'timeofuse') {
			if ($scope.timeofuse.length > 0) {
				$scope.timeofuse.unshift(angular.copy(t));
			} else {
				$scope.timeofuse.push(angular.copy(t));
			}
			$scope.t = {};

			$timeout(function() {
				angular.element('#touTable').trigger('footable_redraw');
			}, 10);
		} else if($scope.tariff.tariff_type=='block'){
			if ($scope.block.length > 0) {
				$scope.block.unshift(angular.copy(t));
			} else {
				$scope.block.push(angular.copy(t));
			}
			$scope.b = {};

			$timeout(function() {
				angular.element('#blockTable').trigger('footable_redraw');
			}, 10);
		}

	};
	$scope.delete = function(key) {
		if($scope.tariff.tariff_type=='timeofuse'){
			$scope.timeofuse.splice(key, 1);
			$timeout(function() {
				angular.element('#touTable').trigger('footable_redraw');
			}, 10);
		}else if($scope.tariff.tariff_type=='block'){
			$scope.block.splice(key, 1);
			$timeout(function() {
				angular.element('#blockTable').trigger('footable_redraw');
			}, 10);
		}
		
	}
});