'use strict';
app.factory('ComplexService', function($http) {  
    return {  
        getAllComplexes:function(callback){
            $http.get(getAPI()+'complexes')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });
        },
        searchComplexes: function(query, callback) {  
            $http.get(getAPI()+'complexes', { params: { q: query } })  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        addComplex: function(complex, callback) {  
            $http.post(getAPI()+'complexes',{data:complex})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        editComplex: function(complex, callback) {  
            $http.put(getAPI()+'complexes/'+complex.id,{data:complex})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        deleteComplex: function(complex, callback) {  
            $http.delete(getAPI()+'complexes/'+complex.id)  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        getComplex: function(id, callback) {  
            $http.get(getAPI()+'complexes/'+id)  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        }
    };
});  