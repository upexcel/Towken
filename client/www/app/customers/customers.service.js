(function() {
    'use strict';
    angular.module('scale')
        .factory('customersService', customersService);
    function customersService($q, towkensFactory, tostService, $ionicLoading, staticTowkenApi, Configurations, ApiError, TowkenLatLng, localStorageService) {
        var service = {};
        service.mapMarkers = function(lat, lng) {
            var q = $q.defer();
            var k = 0;
            var icon;
            var ionIcon;
            var query = TowkenLatLng.get({
                "UserToken": localStorageService.get("UserToken").token,
                'lat':lat,
                'lng': lng
            });
            var k = 0;
            query.$promise.then(function(response) {
                if (response.status == 0) {
                    $ionicLoading.hide();
                    tostService.notify('Towken not available', 'top');
                } else{
                   var data1 = service.AddMarkerIcon(response)
                    localStorageService.set('ApiData', data1);
                    q.resolve(data1);
                }
                
            }).catch(function(err) {
                ApiError.Alert();
            });
            return q.promise;
        };

        service.AddMarkerIcon = function(markerData){
             var icon;
            var ionIcon;
              var k = 0;
                 var data1 = markerData.data;
                     _.forEach(data1, function(i) {
                        if(i.type_of_token){
                          if(i.type_of_token == "Restaurent"){
                              icon = Configurations.restaurentMarker;
                              ionIcon = Configurations.restaurentIcon;
                          }
                          if(i.type_of_token == 'Shopping') {
                            icon = Configurations.shoppingMarker;
                            ionIcon = Configurations.shoppingIcon;
                          }
                          if(i.type_of_token == 'Saloon') {
                            icon = Configurations.saloonMarker;
                            ionIcon = Configurations.saloonIcon;
                          }   
                        }   
                        i.icon = icon;
                        i.latitude =  i.geo_location[1];
                        i.longitude  = i.geo_location[0];
                        i.id = k++;
                        i.ionIcon = ionIcon;
                        i.OldIcon = icon;
                        i.Kms= (i.Distance*1.609344).toFixed(2);
                     });
            return data1;
        }
        return service;
    };
})();