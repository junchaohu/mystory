'use strict';
app.factory('OfflineMeterService', function($http) {  
    return {  
        getAllOfflineMeters:function(callback){
            $http.get(getAPI()+'offlinemeters')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });
        },
        searchOfflineMeters: function(query, callback) {  
            $http.get(getAPI()+'offlinemeters', { params: { q: query } })  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        addOfflineMeter: function(offlinemeter, callback) {  
            $http.post(getAPI()+'offlinemeters',{data:offlinemeter})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        editOfflineMeter: function(offlinemeter, callback) {  
            $http.put(getAPI()+'offlinemeters/'+offlinemeter.id,{data:offlinemeter})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        deleteOfflineMeter: function(offlinemeter, callback) {  
            $http.delete(getAPI()+'offlinemeters/'+offlinemeter.id)  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        getOfflineMeter: function(id, callback) {  
            $http.get(getAPI()+'offlinemeters/'+id)  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        }
    };
});  