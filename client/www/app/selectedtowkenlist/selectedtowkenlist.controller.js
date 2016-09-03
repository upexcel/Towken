    (function() {
        'use strict';

        angular.module('scale')
            .controller('selectedtowkenlistController', selectedtowkenlistController);

        function selectedtowkenlistController($state, showComment, RateFactory, $rootScope, $ionicModal, $scope, typeConversion, checkTowken, tostService, geoService, ApiError, $window, GeoCoderFactory, $ionicLoading, $ionicPopover, localStorageService, customersService, Configurations) {
            var self = this;
            self.rate = 1;
            self.ImageUrl = Configurations.ImageUrl;
            self.towkens = typeConversion.toNumber([localStorageService.get('selectedTowken')], 'decideImg')[0];
            ShowRating();
            self.AddTowken = function() {
                if (self.towkens) {
                    checkTowken.check(self.towkens).then(function(data) {
                          //localStorageService.set('selectedTowken', null);
                        $state.go('app.thankyou', {
                            "text": 'You get ' + self.towkens.discount + '% OFF towken from',
                            'type': self.towkens.business_name,
                            'time_remaining': self.towkens.time_remaining,
                            'redum_code': data.data[0],
                            'discount': self.towkens.discount
                        });
                    });
                } else {
                    tostService.notify('Click on towken to select', 'top');
                    $state.go('app.user');
                }
            }
            $scope.rating = 5;
            $scope.rateFunction = function(rating) {
                self.rate=rating;
            };
            $ionicModal.fromTemplateUrl('app/selectedtowkenlist/partials/rateandcomment.html', function($ionicModal) {
                self.rateAndComment = $ionicModal;
            }, {
                scope: $scope
            });

            self.submit = function() {
                if (angular.isDefined(self.comments)) {
                    $ionicLoading.show();
                    var query = RateFactory.save({
                        UserToken:localStorageService.get('UserToken').token,
                        rating: self.rate,
                        comment: self.comments,
                        token_id:localStorageService.get('selectedTowken')._id
                    });
                       query.$promise.then(function(data) {
                        $ionicLoading.hide();
                        if(data.status==0)
                            tostService.notify('Something going wrong please try again', 'top');
                        else
                             tostService.notify('Rating Successfull', 'top');
                             ShowRating();
                            self.rateAndComment.hide();


                    }).catch(function(err){
                        $ionicLoading.hide();
                        ApiError.Alert();
                    });

                } else {
                    tostService.notify('Enter comments', 'top');
                }
            }

          function ShowRating(){
            var query1 = showComment.save({
                   "UserToken": localStorageService.get("UserToken").token,
                   "token_id":  self.towkens._id
            });
              query1.$promise.then(function(response) {
               if(response.status == 1){
                  self.RateAndReviews = response.data;
               } 
               
            });
          }

          self.Timerfinished = function(){
           self.timeFinished = true;
            $scope.$apply();
           
          }


        }
    })();