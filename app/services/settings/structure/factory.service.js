'use strict';
app.factory('FactoryService', function($http) {  
    return {  
        getAllFactories:function(callback){
            $http.get(getAPI()+'factories')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });
        },
        searchFactories: function(query, callback) {  
            $http.get(getAPI()+'factoriess', { params: { q: query } })  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        addFactory: function(factory, callback) {  
            $http.post(getAPI()+'factories',{data:factory})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        editFactory: function(factory, callback) {  
            $http.put(getAPI()+'factories/'+factory.id,{data:factory})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        deleteFactory: function(factory, callback) {  
            $http.delete(getAPI()+'factories/'+factory.id)  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        getFactoriesByCompanyID: function(id, callback) {  
            $http.get(getAPI()+'companies/'+id+'/factories')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        }
    };
});  