
(function() {
    'use strict';
    angular.module('scale')
            .factory('ShortRating', ShortRating);

    function ShortRating($resource, Configurations, localStorageService) {
         return $resource(Configurations.Hostserver + 'towken/list/sortedbyRating/:lan/:lat?access_token=:UserToken', {'lat':'@lat', 'lng':'@lng', 'UserToken':'@UserToken'}, {});
    }
    ;
})();


