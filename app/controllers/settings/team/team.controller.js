'use strict';

app.controller('TeamController', function($scope, $uibModal,FactoryService,ShopService,LineService,TeamService,toaster,SweetAlert) {
	$scope.getAllFactories = function() {
		FactoryService.getAllFactories(function(error, data) {
			if (!error) {
				$scope.factories = data;
				if($scope.factories.length>0){
					$scope.currentFactory=$scope.factories[0].id;
					$scope.getShopsByFactoryID($scope.currentFactory);
				}
				
			} else {
				$scope.factories = [];
			}
		});
	};

	$scope.changeFactory=function(){
		$scope.getShopsByFactoryID($scope.currentFactory);
	};

	$scope.getAllShops = function() {
		ShopService.getAllShops(function(error, data) {
			if (!error) {
				$scope.shops = data;
				$scope.currentShop=$scope.shops[0].id;
			} else {
				$scope.shops = [];
			}
		});
	};

	$scope.getShopsByFactoryID = function(id) {
		ShopService.getShopsByFactoryID(id,function(error, data) {
			if (!error) {
				$scope.shops = data;
				if($scope.shops.length>0){
					$scope.currentShop=$scope.shops[0].id;
					$scope.getLinesByShopID($scope.currentShop);
				}
			} else {
				$scope.shops = [];
			}
		});
		
	};

	$scope.changeShop=function(){
		$scope.getLinesByShopID($scope.currentShop);
	};

	$scope.getLinesByShopID = function(id) {
		LineService.getLinesByShopID(id,function(error, data) {
			if (!error) {
				$scope.lines = data;
				if($scope.lines.length>0){
					$scope.currentLine=$scope.lines[0].id;
					$scope.getTeamsByLineID($scope.currentLine);
				}
			} else {
				$scope.lines = [];
			}
		});
		
	};
	$scope.getAllTeams = function() {
		TeamService.getAllTeams(function(error, data) {
			if (!error) {
				$scope.teams = data;
			} else {
				$scope.teams = [];
			}
		});
	};

	$scope.getTeamsByLineID = function(id) {
		TeamService.getTeamsByLineID(id,function(error, data) {
			if (!error) {
				$scope.teams = data;
			} else {
				$scope.teams = [];
			}
		});
		
	};
	$scope.changeLine=function(){
		$scope.getTeamsByLineID($scope.currentLine);
	};

	$scope.addTeam = function() {
		var modalInstance = $uibModal.open({
			templateUrl: 'views/settings/team/team.model.html',
			controller: 'ModalAddTeamCtrl',
			windowClass: "animated fadeIn",
		});
		modalInstance.result.then(function(team) {
			//$scope.devices.unshift(factory);
			team.line_id=$scope.currentLine;
			TeamService.addTeam(team, function(error, status) {
				if (angular.isDefined(status) && status == 201) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'add team success.',
						showCloseButton: true,
					});
					$scope.getTeamsByLineID($scope.currentLine);
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'add team faliure.',
						showCloseButton: true,
					});
				}
			});
		}, function() {

		});
	};

	$scope.editTeam = function(team) {
		var modalInstance = $uibModal.open({
			windowClass: "animated fadeIn",
			templateUrl: 'views/settings/team/team.model.html',
			controller: 'ModalEditTeamCtrl',
			resolve: {
				params: function() {
					return {
						team: angular.copy(team)
					};
				}
			}
		});

		modalInstance.result.then(function(modifiedTeam) {
			TeamService.editTeam(modifiedTeam, function(error, status) {
				if (angular.isDefined(status) && status == 200) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'update team success.',
						showCloseButton: true,
					});
					$scope.getTeamsByLineID($scope.currentLine);
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'update team faliure.',
						showCloseButton: true,
					});
				}
			});
		}, function() {
			//do nothing;
		});
	};

	$scope.deleteTeam=function(team){
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
		            TeamService.deleteTeam(team, function(error, status) {
		            	if (angular.isDefined(status) && status == 204) {
		            		toaster.pop({
		            			type: 'success',
		            			title: 'Success',
		            			body: 'delete team success.',
		            			showCloseButton: true,
		            		});
							$scope.getTeamsByLineID($scope.currentLine);
		            	} else {
		            		toaster.pop({
		            			type: 'error',
		            			title: 'Failure',
		            			body: 'delete team faliure.',
		            			showCloseButton: true,
		            		});
		            	}
		            });
		        } 
		    });
	};

	$scope.getAllFactories();
	
});

app.controller('ModalAddTeamCtrl', function($scope, $uibModalInstance) {

	$scope.operation = "添加";
	$scope.ok = function() {
		$uibModalInstance.close($scope.team);
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});

app.controller('ModalEditTeamCtrl', function($scope, $uibModalInstance, params) {
	$scope.operation = "编辑";
	$scope.team = params.team;

	$scope.ok = function() {
		$uibModalInstance.close($scope.team);
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});