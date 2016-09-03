(function() {
    'use strict';
    angular.module('scale')
            .factory('ChekinFactory', ChekinFactory);

    function ChekinFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver + 'customer/checkIn?access_token=:UserToken', {'UserToken':'@UserToken'}, {});
    }
    ;
})();