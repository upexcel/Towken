
(function() {
    'use strict';
    angular.module('scale')
            .factory('ShortType', ShortType);

    function ShortType($resource, Configurations, localStorageService) {
         return $resource(Configurations.Hostserver + 'towken/list/:type/:lan/:lat?access_token=:UserToken', {'lat':'@lat', 'lng':'@lng', 'UserToken':'@UserToken', 'type':'@type'}, {});
    }
    ;
})();


