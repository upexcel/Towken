(function() {
    'use strict';

    angular.module('scale')
        .controller('businessController', businessController);

    function businessController($state, $rootScope, showCustomer, TotalCheckins, ApiError, tostService, tokenAdminFactory, CreateTowken, GetLatLng, GeoCoderFactory, $window, geoService, $scope, $interval, $ionicLoading, $ionicModal, $ionicPopover, localStorageService, customersService, Configurations) {

        var self = this;
        $rootScope.checkin = true;
        $rootScope.isActiveFooter = 'business';
        self.email = localStorageService.get('UserData');
        self.Selectbutton = false;
        self.mapEnable = true;
        mapLoader();
        var TotalCheckinsApi = TotalCheckins.get({
            UserToken: localStorageService.get("UserToken").token
        });
        TotalCheckinsApi.$promise.then(function(response) {
            self.lastDayCheckin = response.data[0].lastDayCheckIn;
            self.lastMonthCheckin = response.data[0].lastMonthCheckIn;
        });


        function mapLoader() {
            $ionicLoading.hide();
            if (localStorageService.get('UserToken').location.length == 0) {
                geoService.nearBy().then(function(position) {
                    FormMap(position.coords.latitude, position.coords.longitude);
                    $ionicLoading.hide();

                }, function(error) {
                    console.log(error);
                    $ionicLoading.hide();
                });
            } else {
                FormMap(
                    localStorageService.get('UserToken').location[1],
                    localStorageService.get('UserToken').location[0]
                );
            }

        }

        function FormMap(latitude, longitude) {
            self.map = {
                center: {
                    latitude: latitude,
                    longitude: longitude
                },
                zoom: 18
            };
            self.marker = {
                id: 0,
                coords: {
                    latitude: latitude,
                    longitude: longitude
                }
            };
                angular.element(document.querySelector('#BusinessMap .angular-google-map-container'))[0].style.height = $window.innerHeight + 'px';
        }

        self.ShowCustomer = function(show) {
            if (show == true) {
                $ionicLoading.show();
                var id = 0
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
                        });
                        self.randomMarkers = data.data;
                    }

                    $ionicLoading.hide();
                }).catch(function(err) {
                    $ionicLoading.hide();
                    ApiError.Alert();

                });
            } else {
                self.randomMarkers = '';

            }
        }
        self.CreateTowken = function() {
            $state.go('app.createtowken');
        }
    }
})();