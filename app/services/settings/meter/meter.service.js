'use strict';
app.factory('MeterService', function($http) {  
    return {  
        getAllMeters:function(callback){
            $http.get(getAPI()+'meters')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });
        },
        searchMeters: function(query, callback) {  
            $http.get(getAPI()+'meters', { params: { q: query } })  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        addMeter: function(meter, callback) {  
            $http.post(getAPI()+'meters',{data:meter})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        editMeter: function(meter, callback) {  
            $http.put(getAPI()+'meters/'+meter.id,{data:meter})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        deleteMeter: function(meter, callback) {  
            $http.delete(getAPI()+'meters/'+meter.id)  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        getMeter: function(id, callback) {  
            $http.get(getAPI()+'meters/'+id)  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        }
    };
});  