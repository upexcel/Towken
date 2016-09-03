(function() {
    'use strict';

    angular.module('scale')
        .controller('CreateTowkenController', CreateTowkenController);

    function CreateTowkenController($state, $stateParams, $q, UpdateTowken,  $rootScope, $cordovaCamera,  ApiError, cameraService, $ionicPopup, tostService, tokenAdminFactory, CreateTowken, GetLatLng, GeoCoderFactory, $window, geoService, $scope, $interval, $ionicLoading, $ionicModal, $ionicPopover, localStorageService, customersService, Configurations) {
        var self = this;
        self.laterselected = false;
        self.duration = '1 Minutes';
        self.distance = '5 Miles';
        var query1;
        var latitude;
        var longitude;
        self.create = function() {
            if (angular.isDefined(self.discount) && angular.isDefined(self.details) && angular.isDefined(self.type) && angular.isDefined(self.businessname) && self.businessname.length <= 30) {
                $ionicLoading.show();
                var time_remaining;
                var spaceInDuration = _.findIndex(self.duration, function(o) {
                    return o == ' ';
                });
                var spaceInDistance = _.findIndex(self.distance, function(o) {
                    return o == ' ';
                });
                var Distance = self.distance.substring(0, spaceInDistance);
                var Discount = self.discount.substring(0, self.discount.length - 1);

                if (!self.DurationUpdate) {
                    var TimeUnit = self.duration.substring(spaceInDuration + 1, self.duration.length - 1);
                    if (TimeUnit == 'Da') {
                        TimeUnit = 'Day';
                    }
                    time_remaining = moment().add(self.duration.substring(0, spaceInDuration), TimeUnit).unix();
                } else {
                    time_remaining = $stateParams.time_remaining;
                }
                if (localStorageService.get('UserToken').location.length == 0) {
                    geoService.nearBy().then(function(position) {
                        latitude = position.coords.latitude;
                        longitude = position.coords.longitude
                        fireCreateApi(time_remaining, Distance, Discount);
                    });
                } else {
                    latitude = localStorageService.get('UserToken').location[1];
                    longitude = localStorageService.get('UserToken').location[0];
                    fireCreateApi(time_remaining, Distance, Discount);
                }


            } else {
                if (self.businessname && self.businessname.length > 30) {
                    tostService.notify('Business name should not be greater then 30 charcter', 'top');
                } else {
                    tostService.notify('Please fill all details ', 'top');
                }

            }
        }


        function fireCreateApi(time_remaining, Distance, Discount) {
            if (self.SubmitButton == "CREATE") {
                query1 = CreateTowken.save({
                    UserToken: localStorageService.get("UserToken").token,
                    start_time: moment().unix(),
                    business_name: self.businessname,
                    time_remaining: time_remaining,
                    mile: Distance,
                    discount: Discount,
                    latitude: latitude,
                    longitude: longitude,
                    token_details: self.details,
                    type_of_token: self.type,
                    token_quantity: self.quantity
                });
            } else {
                query1 = UpdateTowken.save({
                    UserToken: localStorageService.get("UserToken").token,
                    towken_id: $stateParams.id,
                    business_name: self.businessname,
                    time_remaining: time_remaining,
                    mile: Distance,
                    discount: Discount,
                    latitude: latitude,
                    longitude: longitude,
                    token_details: self.details,
                    type_of_token: self.type,
                    token_quantity: self.quantity
                });

            }
            query1.$promise.then(function(data) {
                if (data.status == 1) {
                    if (self.SubmitButton == "CREATE") {
                            $ionicLoading.hide();
                            $state.go('app.thankyou', {
                                "text": 'Your Towken successfully added',
                                'type': '',
                                'lat': latitude,
                                'lng': longitude,
                                'discount': Discount,
                                'time': time_remaining,
                                'des': self.details
                            });
                    } else {
                              $state.go('app.mytowkens');
                        
                      }

                } else {
                    tostService.notify('Invalid input please try again ', 'top');
                }

            }).catch(function(err) {
                $ionicLoading.hide();
                ApiError.Alert();

            });
        }

       

        self.cancel = function() {
            if (self.SubmitButton == 'CREATE')
                $state.go('app.business');
            else
                $state.go('app.mytowkens');
        }
        $scope.created = {
            model: ''
        }

        self.distancePopup = function() {
            generatePopup("distancedropdown.html", "Distance").then(function(res) {
                self.distance = res;
                if (!self.distance) {
                    self.distance = '5 Miles';
                }
            });
        };

        self.durationPopup = function() {
            generatePopup("durationdropdown.html", "Duration").then(function(res) {
                self.duration = res;
                self.DurationUpdate = null;
                if (!self.duration) {
                    if ($stateParams.business_name) {
                        self.duration = ($stateParams.duration - moment().unix());
                        self.DurationUpdate = true;
                    } else {
                        self.duration = '1 Minutes';
                        self.DurationUpdate = false;
                    }
                }
            });
        }

        self.discountPopup = function() {
            generatePopup("discountdropdown.html", "Discount").then(function(res) {
                self.discount = res;

            });

        }

        self.typePopup = function() {
            generatePopup("typedropdown.html", "Type").then(function(res) {
                self.type = res;

            });

        }

        self.quantityPopup = function() {
            generatePopup("quantitydropdown.html", "Quantity").then(function(res) {
                self.quantity = res;

            });

        }


        function generatePopup(htmlFile, title) {
            $scope.created = {
                model: '',
                first: true
            }
            var defer = $q.defer();
            var myPopup = $ionicPopup.show({
                templateUrl: 'app/createtowken/template/' + htmlFile,
                title: title,
                scope: $scope,
                buttons: [{
                    text: 'CANCEL',
                }, {
                    text: '<span class="color">DONE</span>',
                    type: 'button-default',
                    onTap: function(e) {
                        if (!$scope.created.model) {
                            e.preventDefault();
                        } else {
                            return $scope.created.model;
                        }
                    }
                }]
            });
            myPopup.then(function(res) {
                defer.resolve(res);

            });
            return defer.promise;
        }


        if ($stateParams.business_name) {
            self.businessname = $stateParams.business_name;
            self.duration = ($stateParams.duration - moment().unix());
            self.distance = $stateParams.distance + " Miles";
            self.discount = $stateParams.discount;
            self.quantity = $stateParams.quantity;
            self.type = $stateParams.type;
            self.details = $stateParams.details;
            self.SubmitButton = "UPDATE";
            self.DurationUpdate = true;
        } else {
            self.SubmitButton = "CREATE";
        }

    }
})();