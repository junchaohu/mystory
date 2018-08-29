'use strict';
app.factory('PartShiftService', function($http) {  
    return {  
        getAllPartShifts:function(callback){
            $http.get(getAPI()+'partshifts')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });
        },
        searchPartShifts: function(query, callback) {  
            $http.get(getAPI()+'partshifts', { params: { q: query } })  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        addPartShift: function(partshift, callback) {  
            $http.post(getAPI()+'partshifts',{data:partshift})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        editPartShift: function(partshift, callback) {  
            $http.put(getAPI()+'partshifts/'+partshift.id,{data:partshift})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        deletePartShift: function(partshift, callback) {  
            $http.delete(getAPI()+'partshifts/'+partshift.id)  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        }
        
    };
});  