'use strict';
app.factory('TeamService', function($http) {  
    return {  
        getAllTeams:function(callback){
            $http.get(getAPI()+'teams')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });
        },
        searchTeams: function(query, callback) {  
            $http.get(getAPI()+'teams', { params: { q: query } })  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        addTeam: function(team, callback) {  
            $http.post(getAPI()+'teams',{data:team})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        editTeam: function(team, callback) {  
            $http.put(getAPI()+'teams/'+team.id,{data:team})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        deleteTeam: function(team, callback) {  
            $http.delete(getAPI()+'teams/'+team.id)  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        getTeamsByLineID: function(id, callback) {  
            $http.get(getAPI()+'lines/'+id+'/teams')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        }
    };
});  