(function() {
    'use strict';
    angular.module('scale')
            .factory('ShowCommentBusiness', ShowCommentBusiness);

    function ShowCommentBusiness($resource, Configurations, localStorageService) {
         return $resource(Configurations.Hostserver + 'towken/business/showComment?access_token=:UserToken', {'UserToken':'@UserToken'}, {});
    }
    ;
})();