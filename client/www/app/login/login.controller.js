(function() {
   'use strict';

   angular.module('scale')
       .controller('loginController', loginController);

   function loginController($state, tostService, $timeout,  loginApi, facebookLogin, googleLogin, $ionicLoading, localStorageService) {
       var self = this;
       self.user = true;
       self.userType = "User";
       self.checkbox1 = function(selected) {
           if (selected == true)
           self.userType = "User";
          else
            self.userType = "Business";
       }
       self.signIn = function() {
               loginApi.fireApi(
                   self.userType.toLowerCase(),
                   self.email,
                   self.password
               );
       }
       self.GoGoogle = function() {
        
           googleLogin.startLogin().then(function(response) {
               loginApi.fireApi(
                   self.userType.toLowerCase(),
                   response.email,
                   "", //password field is blank for gmail id
                   "", //fb id blank for for gmail id 
                   response.google_id,
                   response.picture,
                   response
               );
           });
       }

       self.GoFb = function() {
         $ionicLoading.show();
           facebookLogin.login().then(function(fbData) {
             $ionicLoading.hide();
               if (fbData.id) {
                   self.FbLogin(fbData);
               }
               if (fbData == 'unknown') {
                   facebookLogin.fbLoginSuccess().then(function(fbData1) {
                       self.FbLogin(fbData1);
                   }, function(data) {
                       console.log(data);
                   });
               }
           }, function(data) {
               console.log(data);
           });
       };

       self.FbLogin = function(response) {
         var picture='http://graph.facebook.com/' + response.id + '/picture?type=large';
           loginApi.fireApi(
               self.userType.toLowerCase(),
               response.email,
               "", //password field is blank for fb id
               response.id,
               "" ,//google id blank for for fb,
               picture,
               response

           );
       }

        self.GoSignup=function(type){
           $state.go('signup',{"type": type});
       }
   }
})();