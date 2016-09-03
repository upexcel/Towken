(function() {
    'use strict';
    angular.module('scale')
            .factory('showComment', showComment);

    function showComment($resource, Configurations, localStorageService) {
         return $resource(Configurations.Hostserver + 'towken/showComment?access_token=:UserToken', {'UserToken':'@UserToken'}, {});
    }
    ;
})();