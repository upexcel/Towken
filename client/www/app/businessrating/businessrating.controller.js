(function(){
	'use strict';
	angular.module('scale')
	.controller('BusinessRatingController', BusinessRatingController);
	function BusinessRatingController(ShowCommentBusiness, $state, ApiError, localStorageService, $ionicLoading){
		var self =this;
		$ionicLoading.show();
          var query = ShowCommentBusiness.get({
          	UserToken: localStorageService.get('UserToken').token+'b'
          });
          query.$promise.then(function(response){
          	if(response.status == 1){
          	   self.RedemptionData = response.data;
               self.DataNotAvailable = false;
          	}else{
               self.DataNotAvailable = true;  
          	}
           $ionicLoading.hide();
          }).catch(function(er){
          	self.DataNotAvailable = true;  
          	ApiError.Alert();
          });

          self.GO = function(location){
          	$state.go(location);
          }
	}
})();