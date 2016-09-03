(function() {
    'use strict';
    angular.module('scale')
            .factory('redeemFactory', redeemFactory);

    function redeemFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver + 'towken/redeem?access_token=:UserToken', {'UserToken':'@UserToken'}, {});
    };
})();