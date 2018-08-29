'use strict';
app.factory('LineService', function($http) {  
    return {  
        getAllLines:function(callback){
            $http.get(getAPI()+'lines')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });
        },
        searchLines: function(query, callback) {  
            $http.get(getAPI()+'liness', { params: { q: query } })  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        addLine: function(line, callback) {  
            $http.post(getAPI()+'lines',{data:line})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        editLine: function(line, callback) {  
            $http.put(getAPI()+'lines/'+line.id,{data:line})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        deleteLine: function(line, callback) {  
            $http.delete(getAPI()+'lines/'+line.id)  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        getLinesByShopID: function(id, callback) {  
            $http.get(getAPI()+'shops/'+id+'/lines')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        }
    };
});  