(function() {
    'use strict';

    angular.module('scale')
        .controller('ForgotPasswordController', ForgotPasswordController);
    function ForgotPasswordController(forgotPassword, ApiError, tostService, $ionicLoading) {
        var self = this;
        this.recover=function(){
            $ionicLoading.show();
        	   var query = forgotPassword.save({
                    email:self.email,
                });
        	     query.$promise.then(function(data) {
                    $ionicLoading.hide();
                    if(data.status == 0){
                        tostService.notify('Invalid email', 'top');
                    }
                    else{
                        tostService.notify('Check your email, to recover account');
                    }

        	     	
        	     }).catch(function(err){
                     $ionicLoading.hide();
                    ApiError.Alert();
            }); 
        }  
    }
})();