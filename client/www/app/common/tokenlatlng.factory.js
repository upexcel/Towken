(function() {
    'use strict';
    angular.module('scale')
            .factory('TowkenLatLng', TowkenLatLng);

    function TowkenLatLng($resource, Configurations, localStorageService) {
        //return $resource(Configurations.Hostserver + 'towken/list/:lat/:lng?access_token='+localStorageService.get("UserToken"), {'lat':'@lat', 'lng':'@lng'}, {});
        return $resource(Configurations.Hostserver + 'towken/list/:lat/:lng?access_token=:UserToken', {'lat':'@lat', 'lng':'@lng', "UserToken":"@UserToken"}, {});
    }
    ;
})();