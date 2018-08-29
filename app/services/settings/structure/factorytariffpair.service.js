'use strict';
app.factory('FactoryTariffPairService', function($http) {  
    return {  
        addPair: function(factoryID,tariffID,callback) {  
            $http.post(getAPI()+'factories/'+factoryID+'/tariffs',{data:{'tariff_id':tariffID}})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        
        deletePair: function(factoryID,tariffID, callback) {  
            $http.delete(getAPI()+'factories/'+factoryID+'/tariffs/'+tariffID)  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        getTariffsByFactoryID: function(id, callback) {  
            $http.get(getAPI()+'factories/'+id+'/tariffs')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        }
    };
});  