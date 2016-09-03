    (function() {
        'use strict';

        angular.module('scale')
            .controller('customersController', customersController);

        function customersController($state, $scope, ChekinFactory, SetChekinFactory, $q, typeConversion, $rootScope, tostService, geoService, ApiError, GeoCoderFactory, $window, $ionicLoading, $ionicPopover, localStorageService, customersService, Configurations) {
            var self = this;
            self.UserName = localStorageService.get('UserToken').name;
            var latitude;
            var longitude;
            self.ImageUrl = Configurations.ImageUrl;
            $rootScope.isActiveFooter='user';
            //angular.element(document.querySelector('#TowkenMap .angular-google-map-container'))[0].style.height = $window.innerHeight + 'px';
            function LatLng() {
                var defer = $q.defer();
                $ionicLoading.show();
                geoService.nearBy().then(function(position) {
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
                return defer.promise;
            }

            function mapLoader() {
                LatLng().then(function() {
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
                        id: 'MyLocation',
                        coords: {
                            latitude: latitude,
                            longitude: longitude
                        }
                    };
                    customersService.mapMarkers(latitude, longitude).then(function(response) {
                        self.randomMarkers = response;
                        $ionicLoading.hide();
                    });
                });
            }

            var temporaryMarker = -1;
            self.closeClick = function(marker, event, model) {
                if (temporaryMarker == model.id) {
                    self.randomMarkers[temporaryMarker].icon = self.randomMarkers[temporaryMarker].OldIcon;
                    temporaryMarker = -1;
                    angular.element(document.querySelector('#TowkenMap .angular-google-map-container'))[0].style.height = $window.innerHeight + 'px';
                    self.selectedMarkerData = '';
                } else {
                    temporaryMarker = model.id;
                    self.randomMarkers[temporaryMarker].OldIcon = self.randomMarkers[temporaryMarker].icon;
                    self.randomMarkers[temporaryMarker].icon = Configurations.yellowMarker;
                    for (var i = 0; i < self.randomMarkers.length; i++) {
                        if (i !== temporaryMarker) {
                            self.randomMarkers[i].icon = self.randomMarkers[i].OldIcon;
                        }
                    }
                    angular.element(document.querySelector('#TowkenMap .angular-google-map-container'))[0].style.height = $window.innerHeight - 250 + 'px';
                    self.selectedMarkerData = typeConversion.toNumber([self.randomMarkers[temporaryMarker]])[0];
                }

            }
            var TotalCheckins;
            self.checkIn = function() {
                LatLng().then(function() {
                    var query = ChekinFactory.save({
                        "UserToken": localStorageService.get("UserToken").token,
                        'latitude': latitude,
                        'longitude': longitude
                    });
                    query.$promise.then(function(response) {
                        TotalCheckins = response;
                        var SetCheckin = SetChekinFactory.save({
                            "UserToken": localStorageService.get("UserToken").token
                        });
                        SetCheckin.$promise.then(function(data) {
                            localStorageService.set('ChekedIn', TotalCheckins.data);
                            mapLoader();
                            self.mapEnable = true;
                            self.checkin = true;
                            angular.element(document.querySelector('#TowkenMap .angular-google-map-container'))[0].style.height = $window.innerHeight + 'px';
                        }).catch(function(err) {
                            ApiError.Alert();
                        });
                    }).catch(function(err) {
                        ApiError.Alert();
                    }).catch(function(err) {
                        ApiError.Alert();
                    });;

                })

            };

            var ChekedIn = localStorageService.get('ChekedIn');
            if (ChekedIn) {
                mapLoader();
                self.mapEnable = true;
                self.checkin = true;
                angular.element(document.querySelector('#TowkenMap .angular-google-map-container'))[0].style.height = $window.innerHeight - 90 + 'px';
            }

            self.selectedTowken = function(data) {
                if (!data.timefinished) {
                    localStorageService.set('selectedTowken', data);
                    $state.go('app.selectedtowkenlist');
                } else {
                    tostService.notify("Towken Expired", 'top');
                }

            }

            self.Timerfinished = function(data) {
                data.timefinished = true;
                $scope.$apply();
            }
        }
    })();