'use strict';
app.factory('PartService', function($http) {  
    return {  
        getAllParts:function(callback){
            $http.get(getAPI()+'parts')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });
        },
        searchParts: function(query, callback) {  
            $http.get(getAPI()+'parts', { params: { q: query } })  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        addPart: function(part, callback) {  
            $http.post(getAPI()+'parts',{data:part})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        editPart: function(part, callback) {  
            $http.put(getAPI()+'parts/'+part.id,{data:part})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        deletePart: function(part, callback) {  
            $http.delete(getAPI()+'parts/'+part.id)  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        getPartsByComplexID: function(id, callback) {  
            $http.get(getAPI()+'complexes/'+id+'/parts')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        }
    };
});  