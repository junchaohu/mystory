'use strict';
app.factory('GroupService', function($http) {  
    return {  
        getAllGroups:function(callback){
            $http.get(getAPI()+'groups')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });
        },
        searchGroups: function(query, callback) {  
            $http.get(getAPI()+'groups', { params: { q: query } })  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        addGroup: function(group, callback) {  
            $http.post(getAPI()+'groups',{data:group})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        editGroup: function(group, callback) {  
            $http.put(getAPI()+'groups/'+group.id,{data:group})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        deleteGroup: function(group, callback) {  
            $http.delete(getAPI()+'groups/'+group.id)  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        getGroup: function(id, callback) {  
            $http.get(getAPI()+'groups/'+id)  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        }
    };
});  