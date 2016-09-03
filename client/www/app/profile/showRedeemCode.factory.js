(function() {
    'use strict';
    angular.module('scale')
            .factory('showRedeemCode', showRedeemCode);

    function showRedeemCode($resource, Configurations) {
        return $resource(Configurations.Hostserver + 'towken/showRedeemCode?access_token=:UserToken', {'UserToken':'@UserToken'}, {});
    }
    ;
})();