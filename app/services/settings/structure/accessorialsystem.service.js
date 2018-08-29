'use strict';
app.factory('AccessorialSystemService', function($http) {  
    return {  
        getAllAccessorialSystems:function(callback){
            $http.get(getAPI()+'accessorialsystems')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });
        },
        searchAccessorialSystems: function(query, callback) {  
            $http.get(getAPI()+'accessorialsystems', { params: { q: query } })  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        addAccessorialSystem: function(accessorialsystem, callback) {  
            $http.post(getAPI()+'accessorialsystems',{data:accessorialsystem})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        editAccessorialSystem: function(accessorialsystem, callback) {  
            $http.put(getAPI()+'accessorialsystems/'+accessorialsystem.id,{data:accessorialsystem})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        deleteAccessorialSystem: function(accessorialsystem, callback) {  
            $http.delete(getAPI()+'accessorialsystems/'+accessorialsystem.id)  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        getAccessorialSystemsByFactoryID: function(id, callback) {  
            $http.get(getAPI()+'factories/'+id+'/accessorialsystems')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        }
    };
});  