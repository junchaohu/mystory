'use strict';
app.factory('ProductService', function($http) {  
    return {  
        getAllProducts:function(callback){
            $http.get(getAPI()+'products')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });
        },
        searchProducts: function(query, callback) {  
            $http.get(getAPI()+'products', { params: { q: query } })  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        addProduct: function(product, callback) {  
            $http.post(getAPI()+'products',{data:product})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        editProduct: function(product, callback) {  
            $http.put(getAPI()+'products/'+product.id,{data:product})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        deleteProduct: function(product, callback) {  
            $http.delete(getAPI()+'products/'+product.id)  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        getProduct: function(id, callback) {  
            $http.get(getAPI()+'products/'+id)  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        }
    };
});  