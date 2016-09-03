    (function() {
        'use strict';

        angular.module('scale')
            .controller('thankyouController', thankyouController);

        function thankyouController($state, $rootScope, typeConversion, $cordovaSocialSharing, $stateParams, tostService, geoService, ApiError, $window, GeoCoderFactory, $ionicLoading, $ionicPopover, localStorageService, customersService, Configurations) {
            var self = this;
            console.log($stateParams)
            self.text = $stateParams.text;
            self.type = $stateParams.type;
            self.reedum_code = $stateParams.redum_code;
            if ($stateParams.time_remaining) {
                self.remaining_time = typeConversion.toNumber([{
                    time_remaining: $stateParams.time_remaining
                }])[0].remaining_time;
            }

            self.watch = function() {
                $state.go('app.watchtowken', {
                    'lat': $stateParams.lat,
                    'lng': $stateParams.lng,
                    'discount': $stateParams.discount,
                    'time': $stateParams.time,
                    'des': $stateParams.des,
                    'image': $stateParams.image
                });
            }

            self.fbShare = function() {
                window.plugins.socialsharing.shareViaFacebook('Got 20% discount on Towken app', "http://loyalkng.com/wp-content/uploads/2010/08/Read-Only-Memory-Volume-1-Presented-by-GoNintendo-Shamoozal-Featuring-Turnips-In-Love-Pizza-Links-The-Return-of-Captain-N-Simons-Supper.jpg" /* img */ , null /*url*/ , null, function(errormsg) {
                    tostService.notify('Facebook app is not installed in your device', 'top');
                    console.log(errormsg)
                });
            }


            self.twitterShare = function() {
                window.plugins.socialsharing.shareViaTwitter('Got 20% discount on Towken app', "http://loyalkng.com/wp-content/uploads/2010/08/Read-Only-Memory-Volume-1-Presented-by-GoNintendo-Shamoozal-Featuring-Turnips-In-Love-Pizza-Links-The-Return-of-Captain-N-Simons-Supper.jpg" /* img */ , null /*url*/ , null, function(errormsg) {
                    tostService.notify('Twitter app is not installed in your device', 'top');
                    console.log(errormsg)
                });
            }


        }
    })();