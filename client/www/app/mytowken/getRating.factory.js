(function() {
    'use strict';
    angular.module('scale')
            .factory('getRating', getRating);

    function getRating($resource, Configurations) {
        return $resource(Configurations.Hostserver + 'towken/getRating?access_token=:UserToken', {'UserToken':'@UserToken'}, {});
    }
    ;
})();