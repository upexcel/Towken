(function() {
    'use strict';
    angular.module('scale')
            .factory('RateFactory', RateFactory);

    function RateFactory($resource, Configurations, localStorageService) {
         return $resource(Configurations.Hostserver + 'towken/rating?access_token=:UserToken', {'UserToken':'@UserToken'}, {});
    }
    ;
})();