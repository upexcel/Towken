(function() {
    'use strict';
    angular.module('scale')
            .factory('CreateTowken', CreateTowken);

    function CreateTowken($resource, Configurations, localStorageService) {
         return $resource(Configurations.Hostserver + 'towken/create?access_token=:UserToken', {'UserToken':'@UserToken'}, {});
    }
    ;
})();