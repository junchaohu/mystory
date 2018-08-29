'use strict';
app.factory('MailService', function($http) {  
    return {  
        getAllRecipients:function(callback){
            $http.get(getAPI()+'emailrecipients')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });
        },
        addRecipient: function(recipient, callback) {  
            $http.post(getAPI()+'emailrecipients',{data:recipient})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        editRecipient: function(recipient, callback) {  
            $http.put(getAPI()+'emailrecipients/'+recipient.id,{data:recipient})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        deleteRecipient: function(recipient, callback) {  
            $http.delete(getAPI()+'emailrecipients/'+recipient.id)  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },

        getAllConfigs:function(callback){
            $http.get(getAPI()+'smtpconfigs')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });
        },
        editConfig: function(config, callback) {  
            $http.put(getAPI()+'smtpconfigs/'+config.id,{data:config})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        }
        
    };
});  