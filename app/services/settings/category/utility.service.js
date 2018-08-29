'use strict';
app.factory('UtilityService', function($http) {  
    return {  
        getAllUtilities:function(callback){
            $http.get(getAPI()+'energyitems')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });
        },
        searchUtilities: function(query, callback) {  
            $http.get(getAPI()+'energyitems', { params: { q: query } })  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        addUtility: function(utility, callback) {  
            $http.post(getAPI()+'energyitems',{data:utility})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        editUtility: function(utility, callback) {  
            $http.put(getAPI()+'energyitems/'+utility.id,{data:utility})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        deleteUtility: function(utility, callback) {  
            $http.delete(getAPI()+'energyitems/'+utility.id)  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        getUtility: function(id, callback) {  
            $http.get(getAPI()+'energyitems/'+id)  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        }
    };
});  