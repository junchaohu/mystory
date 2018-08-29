'use strict';
app.factory('MachineService', function($http) {  
    return {  
        getAllMachines:function(callback){
            $http.get(getAPI()+'machines')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });
        },
        searchMachines: function(query, callback) {  
            $http.get(getAPI()+'machines', { params: { q: query } })  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        addMachine: function(machine, callback) {  
            $http.post(getAPI()+'machines',{data:machine})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        editMachine: function(machine, callback) {  
            $http.put(getAPI()+'machines/'+machine.id,{data:machine})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        deleteMachine: function(machine, callback) {  
            $http.delete(getAPI()+'machines/'+machine.id)  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        getMachinesByLineID: function(id, callback) {  
            $http.get(getAPI()+'lines/'+id+'/machines')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        }
    };
});  