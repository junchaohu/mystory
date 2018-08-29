'use strict';

app.controller('FactoryTariffPairController', function($scope, TariffService, FactoryService, FactoryTariffPairService, toaster) {

	$scope.getAllFactories = function() {
		FactoryService.getAllFactories(function(error, data) {
			if (!error) {
				$scope.factories = data;
				if($scope.factories.length>0){
					$scope.currentFactory=$scope.factories[0];
					$scope.getTariffsByFactoryID($scope.currentFactory.id);
				}
				
			} else {
				$scope.factories = [];
			}
		});
	};

	$scope.changeFactory=function(){
		$scope.getTariffsByFactoryID($scope.currentFactory.id);
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

	$scope.getTariffsByFactoryID=function(id){
		FactoryTariffPairService.getTariffsByFactoryID(id,function(error,data){
			if (!error) {
				$scope.factorytariffs = data;
			} else {
				$scope.factorytariffs = [];
			}
		});
	};

	$scope.pairTariff=function(dragEl,dropEl){
		//var factoryid=angular.element(event.target).scope().factory.id;
		//var tariffid=ui.draggable.scope().tariff.id;
		var tariffid=angular.element('#'+dragEl).scope().tariff.id;
		var factoryid=$scope.currentFactory.id;
		FactoryTariffPairService.addPair(factoryid,tariffid,function(error,status){
			if (angular.isDefined(status) && status == 201) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'map tariff success.',
						showCloseButton: true,
					});
					//$scope.getAllFactories();
					$scope.getTariffsByFactoryID($scope.currentFactory.id);
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'map tariff faliure.',
						showCloseButton: true,
					});
				}
		});
	};

	$scope.deleteTariffPair=function(dragEl,dropEl){
		//var factoryid=angular.element(event.target).scope().factory.id;
		//var tariffid=tariff.id;
		if(angular.element('#'+dragEl).hasClass('source')){
			return;
		}
		var tariffid=angular.element('#'+dragEl).scope().factorytariff.id;
		var factoryid=$scope.currentFactory.id;
		FactoryTariffPairService.deletePair(factoryid,tariffid,function(error,status){
			if (angular.isDefined(status) && status == 204) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'unmap tariff success.',
						showCloseButton: true,
					});
					//$scope.getAllFactories();
					$scope.getTariffsByFactoryID($scope.currentFactory.id);
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'unmap tariff faliure.',
						showCloseButton: true,
					});
				}
		});
	};




	$scope.getAllFactories();
	$scope.$on('handleBroadcastFactoryChanged', function(event) {
		$scope.getAllFactories();
	});
	$scope.getAllTariffs();

});