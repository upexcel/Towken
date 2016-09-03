(function(){
	'use strict';
	angular.module('scale')
	.controller('ChangePasswordController', ChangePasswordController);
	function ChangePasswordController(profileService, $state){
        var self = this;	
         self.changeProfilePassword = function($state){
                profileService.changeProfilePassword(self.currentPassword, self.newPassword).then(function(response){
                    self.currentPassword == "";
                    self.newPassword == "";
                    self.verifyPassword == "";
                })
        };

        self.GO = function(path){
            $state.go(path);
        }
        
	}

})();