(function() {
    'use strict';
    angular.module('scale')
            .factory('SelectedTowken', SelectedTowken);

    function SelectedTowken($resource, Configurations, localStorageService) {
        return $resource(Configurations.Hostserver + 'towken/select/:towken_id/:business_id?access_token=:UserToken', {"towken_id":"@towken_id", "UserToken":"@UserToken", "business_id":"@business_id"}, {});
    }
    ;
})();