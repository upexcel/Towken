

(function() {
    'use strict';
    angular.module('scale')
            .factory('setSocialMediaAccount', setSocialMediaAccount);

    function setSocialMediaAccount($resource, Configurations) {
        return $resource(Configurations.Hostserver + 'customer/setSocialMediaAccount?access_token=:UserToken', {'UserToken':'@UserToken'}, {});
    }
    ;
})();