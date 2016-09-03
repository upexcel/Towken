 (function() {
    'use strict';
    angular.module('scale')
            .factory('signupApi', signupApi);
    function signupApi(signupFactory, tostService, $ionicLoading, $state, timeStorage, ApiError) {
        var service = {};
        service.fireApi=function( fullname,  email, password, userType, facebook_id, google_id, picture){
            $ionicLoading.show();
             var query = signupFactory.save({
                    fullname:fullname,
                    password:password,
                    email:email,
                    facebook_id: facebook_id,
                    google_id:google_id,
                    type: userType
                });
             
                query.$promise.then(function(data) {
                    if(data.status==1){
                      timeStorage.set("UserToken", {token: data.data, name :fullname, "location":[]}, 1);
                      timeStorage.set("UserType", userType.toLowerCase(), 1);
                      timeStorage.set("UserEmail", email, 1);
                      if(angular.isDefined(picture)){
                        timeStorage.set("UserPic", picture, 1);
                      }else{
                        timeStorage.set("UserPic", "app/assets/img/Profile_Default.jpg", 1);
                      }
                      $state.go('app.'+ userType.toLowerCase());
                    }else if(data.message=="User already registered"){  
                      tostService.notify(data.message, 'top');
                      $state.go('login');
                    }else if(data.status==0){ 
                      tostService.notify(data.message, 'top');
                    }
                     $ionicLoading.hide(); 
                }).catch(function(err){
                     ApiError.Alert();
                     $ionicLoading.hide(); 
                });

        } 
       return service;
    }
 })();

 