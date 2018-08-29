'use strict';
app.factory('VirtualMeterService', function($http) {  
    return {  
        getAllVirtualMeters:function(callback){
            $http.get(getAPI()+'virtualmeters')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });
        },
        searchVirtualMeters: function(query, callback) {  
            $http.get(getAPI()+'virtualmeters', { params: { q: query } })  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        addVirtualMeter: function(virtualmeter, callback) {  
            $http.post(getAPI()+'virtualmeters',{data:virtualmeter})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        editVirtualMeter: function(virtualmeter, callback) {  
            $http.put(getAPI()+'virtualmeters/'+virtualmeter.id,{data:virtualmeter})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        deleteVirtualMeter: function(virtualmeter, callback) {  
            $http.delete(getAPI()+'virtualmeters/'+virtualmeter.id)  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        getVirtualMetersByShopID: function(id, callback) {  
            $http.get(getAPI()+'virtualmeters/'+id)  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        }
    };
});  