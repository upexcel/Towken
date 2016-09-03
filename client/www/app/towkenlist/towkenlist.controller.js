(function() {
    'use strict';

    angular.module('scale')
        .controller('towkenlistController', towkenlistController);

    function towkenlistController(localStorageService, Configurations, ApiError,  tostService,  $ionicPopover, $ionicLoading, geoService, ShortType, ShortDiscount, ShortRating, ShortDistance, customersService, $scope, $state, typeConversion, $rootScope) {
        var self = this;
        var lan;
        var lat;
        self.ImageUrl = Configurations.ImageUrl;
        $ionicPopover.fromTemplateUrl('templates/popover.html', {
            scope: $scope,
        }).then(function(popover) {
            self.popover = popover;
        });
        $ionicLoading.show();
        geoService.nearBy().then(function(position) {
            lan = position.coords.latitude;
            lat = position.coords.longitude;
            customersService.mapMarkers(lan, lat).then(function(response) {
                if (response.length == 0) {
                    self.DataNotAvailable = true;
                } else {
                    self.towkens = typeConversion.toNumber(response);
                }
                $ionicLoading.hide();
            });

        }).catch(function(err) {
            $ionicLoading.hide();
        });

        self.selectedTowken = function(data) {
           if(!data.timefinished){
            localStorageService.set('selectedTowken', data);
            $state.go('app.selectedtowkenlist');
           }else{
              tostService.notify("Towken Expired", 'top');
           } 
          
        }

        $ionicPopover.fromTemplateUrl('templates/popover.html', {
            scope: $scope,
        }).then(function(popover) {
            $scope.popover = popover;
        });

        var i=1;
        self.ShortDistance = function() {
            self.DistanceClicked = true;
            $ionicLoading.show();
            var query = ShortDistance.get({
                "UserToken": localStorageService.get("UserToken").token,
                'lan': lan,
                'lat': lat
            });
            query.$promise.then(function(response) {
                checkForNull(response);
            if(response.status == 1) 
                if(i%2 == 0){
                     self.DistanceAsc = true;
                    self.towkens = typeConversion.toNumber(customersService.AddMarkerIcon(response));
                }else{
                    self.DistanceAsc = false;
                     self.towkens = typeConversion.toNumber(customersService.AddMarkerIcon(response)).reverse();
                }
                i = i+1;
                $ionicLoading.hide();
            }).catch(function(err) {
                 $ionicLoading.hide();
                ApiError.Alert();
            }); 

        }

        var l=1;
        self.ShortRating = function() {
            self.RatingClicked = true;
            $ionicLoading.show();
            var query = ShortRating.get({
                "UserToken": localStorageService.get("UserToken").token,
                'lan': lan,
                'lat': lat
            });
            query.$promise.then(function(response) {
                checkForNull(response);
            if(response.status == 1)   
                if(l%2 == 0){
                    self.RatingAsc = true;
                    self.towkens = typeConversion.toNumber(customersService.AddMarkerIcon(response));
                }else{
                     self.RatingAsc = false;
                     self.towkens = typeConversion.toNumber(customersService.AddMarkerIcon(response)).reverse();
                }
                l = l+1;
                $ionicLoading.hide();
            }).catch(function(err) {
                 $ionicLoading.hide();
                ApiError.Alert();
            });

        }
       
        var k=1;
        self.ShortDiscount = function() {
            self.DiscountClicked = true;
            $ionicLoading.show();
            var query = ShortDiscount.get({
                "UserToken": localStorageService.get("UserToken").token,
                'lan': lan,
                'lat': lat
            });
            query.$promise.then(function(response) {
                checkForNull(response);
               if(response.status == 1)    
               if(k%2 == 0){
                    self.DiscountAsc = true;
                    self.towkens = typeConversion.toNumber(customersService.AddMarkerIcon(response));
                }else{
                     self.DiscountAsc = false;
                     self.towkens = typeConversion.toNumber(customersService.AddMarkerIcon(response)).reverse();
                }
                k = k+1;
                $ionicLoading.hide();
            }).catch(function(err) {
                 $ionicLoading.hide();
                ApiError.Alert();
            });;

        }

        self.ShortType = function(type) {
            self.popover.hide();
            $ionicLoading.show();
            var query = ShortType.get({
                "UserToken": localStorageService.get("UserToken").token,
                'lan': lan,
                'lat': lat,
                'type':type
            });
            query.$promise.then(function(response) {
                checkForNull(response);
                self.towkens = typeConversion.toNumber(customersService.AddMarkerIcon(response));
                $ionicLoading.hide();
            }).catch(function(err) {
                 $ionicLoading.hide();
                ApiError.Alert();
            });;

        }

        function checkForNull(data) {
            if (data.status == 0) {
                self.DataNotAvailable = true;
            } else {
                self.DataNotAvailable = false;
            }

        }

         self.Timerfinished = function(data){
            data.timefinished = true;
            $scope.$apply();
          }

    }

})();