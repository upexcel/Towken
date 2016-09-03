(function() {
    'use strict';
    angular.module('scale')
            .factory('showBusinessRating', showBusinessRating);

    function showBusinessRating($resource, Configurations) {
        return $resource(Configurations.Hostserver + 'towken/showBusinessRating?access_token=:UserToken', {'UserToken':'@UserToken'}, {});
    }
    ;
})();