  (function() {
      'use strict';
      angular.module('scale')
          .factory('CountTowken', CountTowken);

      function CountTowken(Configurations, $q, $ionicLoading, SelectedTowkensCount, localStorageService, ApiError) {
          var service = {};
          service.SelectedTowkenCountApi = function() {
              $ionicLoading.show();
              var q = $q.defer();
              var query = SelectedTowkensCount.get({
                  UserToken: localStorageService.get("UserToken").token
              });
              query.$promise.then(function(data) {
                 $ionicLoading.hide();
                  q.resolve(data);
              }).catch(function(err) {
                 $ionicLoading.hide();
                ApiError.Alert();
            });
            return q.promise;;
          };


          service.DecideUseType = function(response) {
             var AccountType;
             if(response.data.selectedTowkensCount < 100){
                 AccountType = {
                  type : "bronze",
                  remaining : 100 - response.data.selectedTowkensCount,
                  upgradedTo : "silver",
                  heading : "Congratulations!",
                  msg: "You are now a Bronze member. Collect "+ (100 - response.data.selectedTowkensCount) +" towkens to upgrade to a silver member. you can do it!",
                  img: "bronze.png"
                }
             
             }else if(response.data.selectedTowkensCount >= 100 && response.data.selectedTowkensCount < 500){
                AccountType = {
                  type : "silver",
                  remaining : 500 - response.data.selectedTowkensCount,
                  upgradedTo : "gold",
                  heading : "Well done!",
                  msg: "You are now a Silver member. Collect "+ (500 - response.data.selectedTowkensCount) +" towken to upgrade to a Gold member. you can do it!",
                  img: "silver.png"
                }
             

             }else if(response.data.selectedTowkensCount >= 500 && response.data.selectedTowkensCount < 1000){
                AccountType = {
                  type : "gold",
                  remaining : 1000 - response.data.selectedTowkensCount,
                   heading : "Cheers!",
                   img: "gold.png",
                  msg: "You are now a Gold member. Collect "+ (1000 - response.data.selectedTowkensCount) +" towkens more to upgrade to a Platinum member. Just one more stage and you will be a Platinum member"
                }
             

             }
             else if(response.data.selectedTowkensCount >= 1000){
                AccountType = {
                  type : "platinum",
                  remaining : response.data.selectedTowkensCount,
                   heading : "Wohoo!",
                   img: "platinum.png",
                  msg: "You are now a Platinum member!"
                }
            

             }
            return AccountType;
          }


          return service;
      }


  })();