'use strict';

app.controller('StructureController', function($scope) {

	$scope.$on('handleEmitFactoryChanged', function(event) {
		$scope.$broadcast('handleBroadcastFactoryChanged');
	});

	$scope.$on('handleEmitShopChanged', function(event) {
		$scope.$broadcast('handleBroadcastShopChanged');
	});

	$scope.$on('handleEmitLineChanged', function(event) {
		$scope.$broadcast('handleBroadcastLineChanged');
	});

	$scope.$on('handleEmitAccessorialSystemChanged', function(event) {
		$scope.$broadcast('handleBroadcastAccessorialSystemChanged');
	});

	$scope.$on('handleEmitAuxiliarySystemChanged', function(event) {
		$scope.$broadcast('handleBroadcastAuxiliarySystemChanged');
	});
});