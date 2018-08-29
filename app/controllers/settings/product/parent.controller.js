'use strict';

app.controller('ProductParentController', function($scope) {

	$scope.$on('handleEmitComplexChanged', function(event) {
		$scope.$broadcast('handleBroadcastComplexChanged');
	});

	$scope.$on('handleEmitPartChanged', function(event) {
		$scope.$broadcast('handleBroadcastPartChanged');
	});

	
});