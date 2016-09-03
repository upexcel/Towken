(function() {
    'use strict';
    angular.module('scale')
            .factory('businessListFactory', businessListFactory);

    function businessListFactory($resource, Configurations, localStorageService) {
        // return $resource(Configurations.Hostserver + 'towken/list?access_token=' + localStorageService.get("UserToken"), {}, {});
         return $resource(Configurations.Hostserver + 'towken/business/list?access_token=:UserToken', {'UserToken':'@UserToken'}, {});
    }
    ;
})();