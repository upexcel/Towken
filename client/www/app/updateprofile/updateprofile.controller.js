    (function() {
        'use strict';

        angular.module('scale')
            .controller('UpdateProfileController', UpdateProfileController);

        function UpdateProfileController($state, GetLatLng, BusinessLocation, ChekinFactory, SetChekinFactory, $q, typeConversion, $rootScope, tostService, geoService, ApiError, GeoCoderFactory, $window, $ionicLoading, $ionicPopover, localStorageService, customersService, Configurations) {
            var self = this;
            self.UserName = localStorageService.get('UserToken').name;
            var latitude;
            var longitude;
            mapLoader();
            angular.element(document.querySelector('#TowkenMap .angular-google-map-container'))[0].style.height = $window.innerHeight + 'px';

            function LatLng() {
                var defer = $q.defer();
                $ionicLoading.show();
                if (localStorageService.get('UserToken').location.length == 0) {
                    geoService.nearBy().then(function(position) {
                        console.log(position);
                        latitude = position.coords.latitude;
                        longitude = position.coords.longitude;
                        defer.resolve();
                    }, function(error) {
                        $ionicLoading.hide();
                        self.mapEnable = false;
                        defer.reject();
                        console.log(error);
                    }).catch(function(err) {
                        defer.reject();
                        $ionicLoading.hide();

                    });
                } else {

                    latitude = localStorageService.get('UserToken').location[1],
                    longitude = localStorageService.get('UserToken').location[0]
                    defer.resolve();
                }
                return defer.promise;
            }

            function mapLoader() {
                LatLng().then(function() {
                    var query = GeoCoderFactory.get({
                        "lat": latitude,
                        "lng": longitude
                    });
                    query.$promise.then(function(data) {
                        self.CurrentLocation = data.results[2].formatted_address;
                    });
                    $ionicLoading.hide();
                    FormMap();
                });
            }

            function FormMap() {
                self.map = {
                    center: {
                        latitude: latitude,
                        longitude: longitude
                    },
                    option: {
                        scrollwheel: true
                    },
                    events: {
                        dragend: function(marker) {
                            // console.log('lat=', marker.center.lat())
                            // console.log('lng=', marker.center.lng())
                        }
                    },
                    zoom: 16
                };

                self.marker = {
                    id: 0,
                    coords: {
                        latitude: latitude,
                        longitude: longitude
                    }
                };
            }


            self.GO = function(location) {
                $state.go(location);
            }

            self.edit = function() {
                self.edit = !self.edit;
            }

            self.update = function() {
                $ionicLoading.show();
                console.log(self.CurrentLocation);
                var query = GetLatLng.get({
                    "address": self.CurrentLocation
                });
                query.$promise.then(function(response) {
                    console.log(response);
                    latitude = response.results[0].geometry.location.lat,
                    longitude = response.results[0].geometry.location.lng
                    var query = BusinessLocation.save({
                        UserToken: localStorageService.get("UserToken").token,
                        latitude: latitude,
                        longitude: longitude

                    });
                    query.$promise.then(function(response) {
                        console.log(response);
                        if (response.status == 1) {
                            self.edit = !self.edit;
                            tostService.notify('Address updated successfully', 'top');
                            localStorageService.get('UserToken').location[1] = latitude;
                             localStorageService.get('UserToken').location[0] = longitude;
                            FormMap();
                        } else {
                            tostService.notify('Unable to update address, try again', 'top');
                        }
                        $ionicLoading.hide();

                    })

                });
            }

        }
    })();