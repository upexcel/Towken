        (function() {
            'use strict';

            angular.module('scale')
                .controller('profileController', profileController);

            function profileController($scope, $ionicModal, $rootScope, $localStorage, showBusinessRating, showRedeemCode, $state, ApiError, localStorageService, tostService, profileService, $ionicLoading, UsedTowken) {
                var self = this;
                var UserType = localStorageService.get('UserType');
                 $rootScope.isActiveFooter = 'setting';

                if (localStorageService.get("UserType") == 'user') {
                    self.customer = true;
                } else {
                    self.customer = false;
                }


                $ionicModal.fromTemplateUrl('app/profile/templates/myreviews.html', function($ionicModal) {
                    self.myReviews = $ionicModal;
                }, {
                    scope: $scope
                });

                $ionicModal.fromTemplateUrl('app/profile/templates/RedemptionCode.html', function($ionicModal) {
                    self.RedemptionCode = $ionicModal;
                }, {
                    scope: $scope
                });


                self.img = localStorageService.get("UserPic");


                self.logout = function() {
                    $localStorage.$reset();
                    $state.go('login');
                }
                if (UserType == 'business') {
                    self.business = true;
                    var query = showBusinessRating.get({
                        UserToken: localStorageService.get("UserToken").token
                    })
                    query.$promise.then(function(data) {
                        if (data.status == 1 && data.data.length!=0)
                            self.StarData = Math.ceil(data.data[0].rating);
                        else
                            self.StarData = 1;
                    });


                    var query1 = showRedeemCode.get({
                        UserToken: localStorageService.get("UserToken").token
                    })
                    query1.$promise.then(function(data) {
                       if(data.status == 1) 
                        self.RedemptionData = data.data;
                       

                    });

                }

                self.GO = function(location) {
                    $state.go('app.' + location);
                }



            }
        })();