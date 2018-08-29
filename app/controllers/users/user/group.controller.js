'use strict';

app.controller('GroupController', function($scope,$uibModal, GroupService,toaster,SweetAlert) {
	
	
	$scope.getAllGroups = function() {
		GroupService.getAllGroups(function(error, data) {
			if (!error) {
				$scope.groups = data;
			} else {
				$scope.groups = [];
			}
		});
		
	};

	$scope.addGroup = function() {
		var modalInstance = $uibModal.open({
			templateUrl: 'views/users/user/group.model.html',
			controller: 'ModalAddGroupCtrl',
			windowClass: "animated fadeIn",
			resolve: {
		        params:function(){
                    return {
                        groups:angular.copy($scope.groups)
                    };
                }
		    }
		});
		modalInstance.result.then(function(group) {
			GroupService.addGroup(group, function(error, status) {
				if (angular.isDefined(status) && status == 201) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'add group success.',
						showCloseButton: true,
					});
					$scope.getAllGroups();
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'add group faliure.',
						showCloseButton: true,
					});
				}
			});
		}, function() {

		});
	};

	$scope.editGroup=function(group){
		var modalInstance = $uibModal.open({
		    windowClass: "animated fadeIn",
		    templateUrl: 'views/users/user/group.model.html',
		    controller: 'ModalEditGroupCtrl',
		    resolve: {
		        params:function(){
                    return {
                        group:angular.copy(group),
                        groups:angular.copy($scope.groups)
                    };
                }
		    }
		});

		modalInstance.result.then(function (modifiedGroup) {
	        GroupService.editGroup(modifiedGroup,function(error,status){
	            if(angular.isDefined(status) && status==200){
	                toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'update group success.',
						showCloseButton: true,
					});
	                $scope.getAllGroups();
	            }else{
	                toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'update group faliure.',
						showCloseButton: true,
					});
	            }
	        });
		}, function () {
	        //do nothing;
		});
	};

	$scope.deleteGroup=function(group){
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
		            GroupService.deleteGroup(group, function(error, status) {
		            	if (angular.isDefined(status) && status == 204) {
		            		toaster.pop({
		            			type: 'success',
		            			title: 'Success',
		            			body: 'delete group success.',
		            			showCloseButton: true,
		            		});
		            		$scope.getAllGroups();
		            	} else {
		            		toaster.pop({
		            			type: 'error',
		            			title: 'Failure',
		            			body: 'delete group faliure.',
		            			showCloseButton: true,
		            		});
		            	}
		            });
		        } 
		    });
	};
	
	$scope.getAllGroups();
	

});

app.controller('ModalAddGroupCtrl', function ($scope, $uibModalInstance,params) {

    $scope.operation="添加";
    $scope.groups=params.groups;
    $scope.ok = function () {
        $uibModalInstance.close($scope.group);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('ModalEditGroupCtrl', function ($scope, $uibModalInstance, params) {
    $scope.operation="编辑";
    $scope.group = params.group;
    $scope.groups=params.groups;

    $scope.ok = function () {
        $uibModalInstance.close($scope.group);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});