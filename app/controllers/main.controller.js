'use strict';
app.controller('MainController', [
    '$rootScope', '$timeout',
    function($rootScope, $timeout) {
        $rootScope.$on("handleStateChange",function(event,args){
            $rootScope.pageTitle=args;
        });
        
    }
]);