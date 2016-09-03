(function() {
    'use strict';
    angular.module('scale')
            .factory('GetLatLng', GetLatLng);

    function GetLatLng($resource, Configurations) {
        return $resource(Configurations.GeoCoder + 'address=:address&key='+ Configurations.googleApiKey, {}, {});

    }
    ;
})();