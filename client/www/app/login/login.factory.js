(function() {
    'use strict';
    angular.module('scale')
            .factory('loginFactory', loginFactory);

    function loginFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver + 'customer/login', {}, {});
    }
    ;
})();