(function() {
    'use strict';

    angular.module('scale')
        .controller('signupController', signupController);

    function signupController($state, tostService, googleLogin, $stateParams, facebookLogin, signupApi, $ionicLoading, localStorageService) {
        var self = this;
        self.signup = function() {  
                signupApi.fireApi(
                    self.fullname, 
                    self.email, 
                    self.password,
                    self.userType
                    );
        }
       
         self.userType = $stateParams.type;
         if(self.userType=='User'){
            self.user = true;
         }else{
             self.business = true;
             self.userType=='Business'
         }

      self.checkbox1 = function(selected) {
           if (selected == true)
           self.userType = "User";
          else
            self.userType = "Business";
       }
    
        
        self.GoGoogle = function() {
            googleLogin.startLogin().then(function(response) {
                signupApi.fireApi(
                    response.name.substring(0, response.name.indexOf(' ')),
                    response.email,
                    "",//password field is blank for gmail id
                    self.userType,
                    "", //fb id blank for for gmail id 
                    response.google_id,
                    response.picture
                    );
            });
        }
        self.GoFb = function() {
            facebookLogin.login().then(function(fbData) {
                var response;
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

         self.FbLogin=function(response){
            var picture='http://graph.facebook.com/' + response.id + '/picture?type=large';
              signupApi.fireApi(
                    response.name.substring(0, response.name.indexOf(' ')),
                    response.email,
                    "",//password field is blank for fb id
                    self.userType,
                    response.id, 
                    "",// gmail id field blank for fb id
                    picture
                    );
        }

       
    }
})();