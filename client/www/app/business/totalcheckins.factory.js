(function() {
    'use strict';

    angular.module('scale')
        .factory('TotalCheckins', TotalCheckins);
        function TotalCheckins($resource, Configurations, localStorageService){
             return $resource(Configurations.Hostserver + 'customer/getTotalCheckIn?access_token=:UserToken', {'UserToken':'@UserToken'}, {});
        }

})();        
