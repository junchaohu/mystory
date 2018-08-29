'use strict';

app.controller('UserController', function($scope,$uibModal, UserService,toaster,SweetAlert) {
	
	
	$scope.getAllUsers = function() {
		UserService.getAllUsers(function(error, data) {
			if (!error) {
				$scope.users = data;
			} else {
				$scope.users = [];
			}
		});
		
	};

	$scope.addUser = function() {
		var modalInstance = $uibModal.open({
			templateUrl: 'views/users/user/user.model.html',
			controller: 'ModalAddUserCtrl',
			windowClass: "animated fadeIn",
		});
		modalInstance.result.then(function(user) {
			UserService.addUser(user, function(error, status) {
				if (angular.isDefined(status) && status == 201) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'add user success.',
						showCloseButton: true,
					});
					$scope.getAllUsers();
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'add user faliure.',
						showCloseButton: true,
					});
				}
			});
		}, function() {

		});
	};

	$scope.editUser=function(user){
		var modalInstance = $uibModal.open({
		    windowClass: "animated fadeIn",
		    templateUrl: 'views/users/user/user.model.html',
		    controller: 'ModalEditUserCtrl',
		    resolve: {
		        params:function(){
                    return {
                        user:angular.copy(user),
                    };
                }
		    }
		});

		modalInstance.result.then(function (modifiedUser) {
	        UserService.editUser(modifiedUser,function(error,status){
	            if(angular.isDefined(status) && status==200){
	                toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'update user success.',
						showCloseButton: true,
					});
	                $scope.getAllUsers();
	            }else{
	                toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'update user faliure.',
						showCloseButton: true,
					});
	            }
	        });
		}, function () {
	        //do nothing;
		});
	};

	$scope.deleteUser=function(user){
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
		            UserService.deleteUser(user, function(error, status) {
		            	if (angular.isDefined(status) && status == 204) {
		            		toaster.pop({
		            			type: 'success',
		            			title: 'Success',
		            			body: 'delete user success.',
		            			showCloseButton: true,
		            		});
		            		$scope.getAllUsers();
		            	} else {
		            		toaster.pop({
		            			type: 'error',
		            			title: 'Failure',
		            			body: 'delete user faliure.',
		            			showCloseButton: true,
		            		});
		            	}
		            });
		        } 
		    });
	};
	
	$scope.getAllUsers();
	

});

app.controller('ModalAddUserCtrl', function ($scope, $uibModalInstance) {

    $scope.operation="添加";
    $scope.ok = function () {
        $uibModalInstance.close($scope.user);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('ModalEditUserCtrl', function ($scope, $uibModalInstance, params) {
    $scope.operation="编辑";
    $scope.user = params.user;

    $scope.ok = function () {
        $uibModalInstance.close($scope.user);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});