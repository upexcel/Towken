(function(){
	'use strict';
	angular.module('scale')
	.controller('ProfilePhotoController', ProfilePhotoController);
	function ProfilePhotoController(localStorageService, $state, Image, $ionicModal, $scope, tostService, Upload, $ionicLoading){
        var self = this;	
        self.UserPic=localStorageService.get('UserPic');
        var api = 'customer/profilePicUpload?access_token='+localStorageService.get("UserToken").token;
  
        self.GO = function(path){
        	$state.go(path);
        }
        self.select = function() {
                      Image.takePhoto1('Profile photo').then(function (blob) {
                      self.UserPic = "data:image/jpeg;base64," + Image.binary;
                      self.upload(blob);
                   });
        }
           
         self.upload = function(blob) {
          $ionicLoading.show();
         var query = Image.upload({
                file: blob   
               }, api);
               query.then(function(data) {
                 $ionicLoading.hide();
                  if(data.status == 200 && data.statusText == "OK"){
                    localStorageService.set("UserPic", self.UserPic);
                    tostService.notify('Picture uploaded', 'top');
                  }
                  else{
                    tostService.notify('Failed to upload image, Please try again', 'top');
                     self.UserPic=localStorageService.get('UserPic'); 
                  }
               }).catch(function(e){
                 console.log(e);
                 $ionicLoading.hide();
                  tostService.notify('Failed to upload image, Please try again', 'top');
                   self.UserPic=localStorageService.get('UserPic');
               })
        }

        

	}

})();