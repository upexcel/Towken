 (function() {
    'use strict';
    angular.module('scale')
            .factory('checkTowken', checkTowken);
    function checkTowken(tostService, SelectedTowken, $q, $ionicLoading, localStorageService, ApiError) {
        var service = {};
        service.check=function(towken){
          var defer=$q.defer();  
           if(towken.remaining_time==0){
              tostService.notify("Towken expired !", 'top');
           }else{
           $ionicLoading.show();
             var query=SelectedTowken.get({
                towken_id:towken._id,
                business_id:towken.user_id._id,
                UserToken:localStorageService.get("UserToken").token
             });
             query.$promise.then(function(data){
                $ionicLoading.hide(); 
                 defer.resolve(data);

             }).catch(function(err){
                ApiError.Alert();
                $ionicLoading.hide();
                defer.reject(false);
            });
           }
          return defer.promise; 
        } 

       return service;

    }
 })();

 