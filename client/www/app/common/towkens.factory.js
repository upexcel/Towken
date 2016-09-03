(function() {
    'use strict';
    angular.module('scale')
            .factory('towkensFactory', towkensFactory);

    function towkensFactory($resource, Configurations, localStorageService) {
        // return $resource(Configurations.Hostserver + 'towken/list?access_token=' + localStorageService.get("UserToken"), {}, {});
         return $resource(Configurations.Hostserver + 'towken/list?access_token=:UserToken', {'UserToken':'@UserToken'}, {});
    }
    ;
})();