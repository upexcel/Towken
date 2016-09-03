 (function() {
     'use strict';
     angular.module('scale')
         .factory('loginApi', loginApi);

     function loginApi(loginFactory, tostService, signupApi, $ionicLoading, $state, timeStorage, ApiError, Configurations) {
         var service = {};
         service.fireApi = function(userType, email, password, facebook_id, google_id, picture, UserData) {
             $ionicLoading.show();
             var query = loginFactory.save({
                 email: email,
                 password: password,
                 facebook_id: facebook_id,
                 google_id: google_id,
                 type: userType
             });
             query.$promise.then(function(data) {
                 if (data.status == 1) {
                     timeStorage.set("UserToken", data.data, 1);
                     timeStorage.set("UserType", userType, 1);
                     timeStorage.set("UserEmail", email, 1);
                     if(data.data.profile_pic){
                        timeStorage.set("UserPic", Configurations.ImageUrl + data.data.profile_pic, 1);
                     }else{
                     if (angular.isDefined(picture)) {
                         timeStorage.set("UserPic", picture, 1);
                     } else {
                         timeStorage.set("UserPic", "app/assets/img/Profile_Default.jpg", 1);
                     }
                     }
                         $state.go('app.' + userType);

                 } else if (data.status == 0) {
                     if (facebook_id) {
                         signupApi.fireApi(
                             UserData.name,//fullname
                             UserData.email,
                             "", //password field is blank for fb 
                             userType,
                             facebook_id, 
                             '',//fb id blank for for fb id 
                             UserData.picture
                         );

                     } else if (google_id) {
                         signupApi.fireApi(
                             UserData.name,//fullname
                             UserData.email,
                             "", //password field is blank for gmail 
                             userType,
                             "", //fb id blank for for gmail id 
                             UserData.google_id,
                             UserData.picture
                         );

                     } else {
                         tostService.notify("Invalid Email or Password, Plaese try again", 'top');
                     }
                 } 
                $ionicLoading.hide(); 
             }).catch(function(err){
               $ionicLoading.hide();
               ApiError.Alert();

            });
         }
         return service;
     }
 })();