(function() {
    'use strict';
    angular.module('scale')
            .factory('signupFactory', signupFactory);

    function signupFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver + 'customer/register', {}, {});
    }
    ;
})();