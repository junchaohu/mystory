'use strict';

app.controller('SMSController', function($scope,$uibModal, SMSService,toaster,SweetAlert) {
	
	
	$scope.getAllRecipients = function() {
		SMSService.getAllRecipients(function(error, data) {
			if (!error) {
				$scope.recipients = data;
			} else {
				$scope.recipients = [];
			}
		});
		
	};

	$scope.getConfig = function() {
		SMSService.getAllConfigs(function(error, data) {
			if (!error) {
				if(data.length>0){
					$scope.config = data[0];
				}else{
					$scope.config = {};
				}
			} else {
				$scope.config = {};
			}
		});
	};
	$scope.editConfig = function() {
		var modalInstance = $uibModal.open({
			windowClass: "animated fadeIn",
			templateUrl: 'views/settings/mailsms/smsconfig.model.html',
			controller: 'ModalEditSMSConfigCtrl',
			resolve: {
				params: function() {
					return {
						config: angular.copy($scope.config),
					};
				}
			}
		});

		modalInstance.result.then(function(modifiedConfig) {
			SMSService.editConfig(modifiedConfig, function(error, status) {
				if (angular.isDefined(status) && status == 200) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'update GSM success.',
						showCloseButton: true,
					});
					$scope.getConfig();
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'update GSM faliure.',
						showCloseButton: true,
					});
				}
			});
		}, function() {
			//do nothing;
		});
	};

	$scope.addRecipient = function() {
		var modalInstance = $uibModal.open({
			templateUrl: 'views/settings/mailsms/smsrecipient.model.html',
			controller: 'ModalAddSMSRecipientCtrl',
			windowClass: "animated fadeIn",
		});
		modalInstance.result.then(function(recipient) {
			SMSService.addRecipient(recipient, function(error, status) {
				if (angular.isDefined(status) && status == 201) {
					toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'add recipient success.',
						showCloseButton: true,
					});
					$scope.getAllRecipients();
				} else {
					toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'add recipient faliure.',
						showCloseButton: true,
					});
				}
			});
		}, function() {

		});
	};

	$scope.editRecipient=function(recipient){
		var modalInstance = $uibModal.open({
		    windowClass: "animated fadeIn",
		    templateUrl: 'views/settings/mailsms/smsrecipient.model.html',
		    controller: 'ModalEditSMSRecipientCtrl',
		    resolve: {
		        params:function(){
                    return {
                        recipient:angular.copy(recipient),
                        recipients:angular.copy($scope.recipients)
                    };
                }
		    }
		});

		modalInstance.result.then(function (modifiedRecipient) {
	        SMSService.editRecipient(modifiedRecipient,function(error,status){
	            if(angular.isDefined(status) && status==200){
	                toaster.pop({
						type: 'success',
						title: 'Success',
						body: 'update recipient success.',
						showCloseButton: true,
					});
	                $scope.getAllRecipients();
	            }else{
	                toaster.pop({
						type: 'error',
						title: 'Failure',
						body: 'update recipient faliure.',
						showCloseButton: true,
					});
	            }
	        });
		}, function () {
	        //do nothing;
		});
	};

	$scope.deleteRecipient=function(recipient){
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
		            SMSService.deleteRecipient(recipient, function(error, status) {
		            	if (angular.isDefined(status) && status == 204) {
		            		toaster.pop({
		            			type: 'success',
		            			title: 'Success',
		            			body: 'delete recipient success.',
		            			showCloseButton: true,
		            		});
		            		$scope.getAllRecipients();
		            	} else {
		            		toaster.pop({
		            			type: 'error',
		            			title: 'Failure',
		            			body: 'delete recipient faliure.',
		            			showCloseButton: true,
		            		});
		            	}
		            });
		        } 
		    });
	};
	
	$scope.getAllRecipients();
	$scope.getConfig();
	

});

app.controller('ModalAddSMSRecipientCtrl', function ($scope, $uibModalInstance) {

    $scope.operation="添加";
    $scope.ok = function () {
        $uibModalInstance.close($scope.recipient);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('ModalEditSMSRecipientCtrl', function ($scope, $uibModalInstance, params) {
    $scope.operation="编辑";
    $scope.recipient = params.recipient;
    $scope.recipients=params.recipients;

    $scope.ok = function () {
        $uibModalInstance.close($scope.recipient);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('ModalEditSMSConfigCtrl', function($scope, $uibModalInstance, params) {
	$scope.operation = "编辑";
	$scope.config = params.config;

	$scope.ok = function() {
		$uibModalInstance.close($scope.config);
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});