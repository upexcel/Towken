(function() {
    'use strict';
    angular.module('scale')
            .factory('forgotPassword', forgotPassword);

    function forgotPassword($resource, Configurations) {
        return $resource(Configurations.Hostserver + 'customer/forgot_password', {}, {});
    }
    ;
})();