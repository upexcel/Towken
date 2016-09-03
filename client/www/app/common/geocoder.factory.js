(function() {
    'use strict';
    angular.module('scale')
            .factory('GeoCoderFactory', GeoCoderFactory);

    function GeoCoderFactory($resource, Configurations) {
        return $resource(Configurations.GeoCoder + 'latlng=:lat,:lng&key='+ Configurations.googleApiKey, {}, {});

    }
    ;
})();