(function() {
    'use strict';

    angular.module('scale')
        .controller('watchTowkenController', watchTowkenController);

    function watchTowkenController($stateParams, $rootScope, showCustomer, tostService, tokenAdminFactory, CreateTowken, GetLatLng, GeoCoderFactory, $window, geoService, $scope, $interval, $ionicLoading, $ionicModal, $ionicPopover, localStorageService, customersService, Configurations) {
        var self = this;
        mapLoader();
        self.selectedMarkerData= $stateParams;
        if(localStorageService.get('UserPic') == "app/assets/img/Profile_Default.jpg")
             self.image =  Configurations.PlaceholderImg;
         else
            self.image = localStorageService.get('UserPic');


        
        var now=moment().unix();
        self.difference= parseInt($stateParams.time)-moment().unix();
        if(self.difference < 0){
            self.timeRemains=false;
        }else{
            self.timeRemains=true;
        }
        function mapLoader() {
                self.map = {
                    center: {
                        latitude: $stateParams.lat,
                        longitude: $stateParams.lng
                    },
                    zoom: 18
                };
                self.marker = {
                    id: 0,
                    coords: {
                        latitude: $stateParams.lat,
                        longitude: $stateParams.lng
                    }
                };
                $ionicLoading.hide();

        }
         angular.element(document.querySelector('#TowkenMap .angular-google-map-container'))[0].style.height = $window.innerHeight -250 + 'px';   
        self.randomMarkers = [{
            id: 1,
            icon: Configurations.yellowMarker,
            latitude: $stateParams.lat,
            longitude: $stateParams.lng,
            discount:self.selectedMarkerData.discount
        }];

        self.ShowCustomer = function(show) {
            if (show == true) {
                $ionicLoading.show();
                var id = 2;
                var query1 = showCustomer.get({
                    UserToken: localStorageService.get("UserToken").token
                });
                query1.$promise.then(function(data) {
                    if (data.status == 0) {
                      tostService.notify("Customers not available, Check back soon !", 'top');
                    } else {
                        _.forEach(data.data, function(i) {
                            i.id = id++;
                            i.icon = Configurations.markerWatchTowkenIcon;
                            i.latitude = i.user_id.user_location[0];
                            i.longitude = i.user_id.user_location[1];
                            self.randomMarkers.push(i);
                        });
                    }
                    $ionicLoading.hide();
                })
            } else {
                self.randomMarkers = [{
                    id: 1,
                    icon: Configurations.yellowMarker,
                    latitude: $stateParams.lat,
                    longitude: $stateParams.lng,
                    discount:self.selectedMarkerData.discount
                }];
            }

        }

        geoService.gpsStatuscheck().then(function(status) {
            if (status == true) {
                mapLoader();
                self.mapEnable = true;
            } else {
                self.mapEnable = false;
            }
        });


        self.Timerfinished=function(){
             self.timeRemains=false;
             $scope.$apply();
        }

    }
})();