'use strict';
app.factory('AuxiliarySystemService', function($http) {  
    return {  
        getAllAuxiliarySystems:function(callback){
            $http.get(getAPI()+'auxiliarysystems')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });
        },
        searchAuxiliarySystems: function(query, callback) {  
            $http.get(getAPI()+'auxiliarysystems', { params: { q: query } })  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        addAuxiliarySystem: function(auxiliarysystem, callback) {  
            $http.post(getAPI()+'auxiliarysystems',{data:auxiliarysystem})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        editAuxiliarySystem: function(auxiliarysystem, callback) {  
            $http.put(getAPI()+'auxiliarysystems/'+auxiliarysystem.id,{data:auxiliarysystem})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        deleteAuxiliarySystem: function(auxiliarysystem, callback) {  
            $http.delete(getAPI()+'auxiliarysystems/'+auxiliarysystem.id)  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        getAuxiliarySystemsByFactoryID: function(id, callback) {  
            $http.get(getAPI()+'factories/'+id+'/auxiliarysystems')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        }
    };
});  