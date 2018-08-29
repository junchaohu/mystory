'use strict';
app.factory('ShopService', function($http) {  
    return {  
        getAllShops:function(callback){
            $http.get(getAPI()+'shops')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });
        },
        searchShops: function(query, callback) {  
            $http.get(getAPI()+'shops', { params: { q: query } })  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        addShop: function(shop, callback) {  
            $http.post(getAPI()+'shops',{data:shop})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        editShop: function(shop, callback) {  
            $http.put(getAPI()+'shops/'+shop.id,{data:shop})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        deleteShop: function(shop, callback) {  
            $http.delete(getAPI()+'shops/'+shop.id)  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        getShopsByFactoryID: function(id, callback) {  
            $http.get(getAPI()+'factories/'+id+'/shops')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        }
    };
});  