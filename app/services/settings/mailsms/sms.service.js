'use strict';
app.factory('SMSService', function($http) {  
    return {  
        getAllRecipients:function(callback){
            $http.get(getAPI()+'smsrecipients')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });
        },
        addRecipient: function(recipient, callback) {  
            $http.post(getAPI()+'smsrecipients',{data:recipient})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        editRecipient: function(recipient, callback) {  
            $http.put(getAPI()+'smsrecipients/'+recipient.id,{data:recipient})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        deleteRecipient: function(recipient, callback) {  
            $http.delete(getAPI()+'smsrecipients/'+recipient.id)  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },

        getAllConfigs:function(callback){
            $http.get(getAPI()+'gsmconfigs')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });
        },
        editConfig: function(config, callback) {  
            $http.put(getAPI()+'gsmconfigs/'+config.id,{data:config})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        }
        
    };
});  