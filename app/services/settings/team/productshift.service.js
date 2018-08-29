'use strict';
app.factory('ProductShiftService', function($http) {  
    return {  
        getAllProductShifts:function(callback){
            $http.get(getAPI()+'productshifts')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });
        },
        searchProductShifts: function(query, callback) {  
            $http.get(getAPI()+'productshifts', { params: { q: query } })  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        addProductShift: function(productshift, callback) {  
            $http.post(getAPI()+'productshifts',{data:productshift})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        editProductShift: function(productshift, callback) {  
            $http.put(getAPI()+'productshifts/'+productshift.id,{data:productshift})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        deleteProductShift: function(productshift, callback) {  
            $http.delete(getAPI()+'productshifts/'+productshift.id)  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        }
    };
});  