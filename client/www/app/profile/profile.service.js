(function () {
  'use strict';
   
   angular.module('scale')
      .factory('profileService', profileService);
   function profileService(updateProfileFactory, $q, ApiError, $ionicLoading, tostService, changeProfilePasswordFactory, localStorageService) {
    var service = {};
    service.changeProfilePassword = function(oldPassword, newPassword){
      var q = $q.defer();
      $ionicLoading.show();
      var query = changeProfilePasswordFactory.save({
        UserToken: localStorageService.get("UserToken").token,
        password: newPassword
      });
      query.$promise.then(function(data) {
        q.resolve(data);
         if(data.status==1){
         tostService.notify('Password updated', 'top');  
        }else{
          tostService.notify(data.message, 'top');  
        }
        $ionicLoading.hide();
      }).catch(function(err){
          ApiError.Alert();
      });
      return q.promise;
    };
    return service;
};
})();