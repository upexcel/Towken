(function() {
    'use strict';
    angular.module('scale')
            .factory('tokenAdminFactory', tokenAdminFactory);

    function tokenAdminFactory($resource, Configurations, localStorageService) {
       // return $resource(Configurations.Hostserver + 'towken/business/list?access_token=' + localStorageService.get("UserToken"), {}, {});
         return $resource(Configurations.Hostserver + 'towken/business/list?access_token=:UserToken' , {'UserToken':'@UserToken'}, {});
    }
    ;
})();