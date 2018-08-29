'use strict';
app.factory('MasterMeterService', function($http) {  
    return {  
        getAllMasterMeters:function(callback){
            $http.get(getAPI()+'mastermeters')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });
        },
        searchMasterMeters: function(query, callback) {  
            $http.get(getAPI()+'mastermeters', { params: { q: query } })  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        addMasterMeter: function(mastermeter, callback) {  
            $http.post(getAPI()+'mastermeters',{data:mastermeter})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        editMasterMeter: function(mastermeter, callback) {  
            $http.put(getAPI()+'mastermeters/'+mastermeter.id,{data:mastermeter})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        deleteMasterMeter: function(mastermeter, callback) {  
            $http.delete(getAPI()+'mastermeters/'+mastermeter.id)  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        getMasterMeter: function(id, callback) {  
            $http.get(getAPI()+'mastermeters/'+id)  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        }
    };
});  