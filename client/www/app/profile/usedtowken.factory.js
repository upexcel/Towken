(function() {
    'use strict';
    angular.module('scale')
            .factory('UsedTowken', UsedTowken);

    function UsedTowken($resource, Configurations, localStorageService) {
        // return $resource(Configurations.Hostserver + 'towken/used?access_token='+localStorageService.get("UserToken"), {}, {});
        return $resource(Configurations.Hostserver + 'towken/used/:lan/:lng?access_token=:UserToken', {"UserToken":"@UserToken", "lan":"@lan", "lng":"@lng"}, {});
    }
    ;
})();