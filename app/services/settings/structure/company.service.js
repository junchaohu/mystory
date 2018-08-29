'use strict';
app.factory('CompanyService', function($http) {  
    return {  
        getAllCompanies:function(callback){
            $http.get(getAPI()+'companies')  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });
        },
        searchCompanies: function(query, callback) {  
            $http.get(getAPI()+'companies', { params: { q: query } })  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        addCompany: function(company, callback) {  
            $http.post(getAPI()+'companies',{data:company})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        editCompany: function(company, callback) {  
            $http.put(getAPI()+'companies/'+company.id,{data:company})  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        deleteCompany: function(company, callback) {  
            $http.delete(getAPI()+'companies/'+company.id)  
                .success(function (response, status, headers, config) {  
                    callback(null, status);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        },
        getCompany: function(id, callback) {  
            $http.get(getAPI()+'companies',{params:{id:1}})  
                .success(function (response, status, headers, config) {  
                    callback(null, response);  
                })  
                .error(function (e) {  
                    callback(e);  
                });  
        }
    };
});  