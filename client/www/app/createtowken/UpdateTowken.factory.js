(function() {
    'use strict';
    angular.module('scale')
            .factory('UpdateTowken', UpdateTowken);

    function UpdateTowken($resource, Configurations) {
        return $resource(Configurations.Hostserver + 'towken/update/token?access_token=:UserToken', {'UserToken':'@UserToken'}, {});
    }
    ;
})();