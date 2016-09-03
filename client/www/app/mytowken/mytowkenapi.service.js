(function() {
    'use strict';
    angular.module('scale')
        .factory('mytowkenapi', mytowkenapi);

    function mytowkenapi(geoService, UsedTowken, businessListFactory, $timeout, getRating, localStorageService, $q, $ionicLoading, ApiError) {
        var service = {};
        var i = 0;
        service.FireApi = function(callback) {
            var defer = $q.defer();
            $ionicLoading.show();
          if(localStorageService.get('UserType') == 'user'){  
            geoService.nearBy().then(function(position) {
                var query = UsedTowken.get({
                    "lan": position.coords.latitude,
                    "lng": position.coords.longitude,
                    "UserToken": localStorageService.get("UserToken").token
                });
                query.$promise.then(function(data) {
                    $ionicLoading.hide();
                   
                        defer.resolve(data);
                   
                }).catch(function(err) {
                    ApiError.Alert();
                    $ionicLoading.hide();
                });
            })
        }else{
              var query = businessListFactory.get({
                    "UserToken": localStorageService.get("UserToken").token
                });
                query.$promise.then(function(data) {
                    $ionicLoading.hide();
                    if (data.status == 1) {
                        data.data.reverse();
                        
                    }
                    defer.resolve(data);
                }).catch(function(err) {
                    ApiError.Alert();
                    $ionicLoading.hide();
                });
         
            
        }
        return defer.promise;
        }

        service.getRating = function(data, obj) {
            var defer = $q.defer();
            var query = getRating.save({
                    UserToken: localStorageService.get('UserToken').token,
                    towken_owner: obj.towken_owner
                })
                .$promise
                .then(function(response) {
                    defer.resolve(response);

                });
            return defer.promise;
        }
        return service;
    };
})();