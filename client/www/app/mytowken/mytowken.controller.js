  (function() {
      'use strict';

      angular.module('scale')
          .controller('mytowkenController', mytowkenController);

      function mytowkenController(UsedTowken, mytowkenapi, $rootScope, Configurations, $scope, localStorageService, typeConversion, $state) {
          var self = this;
          var i = 0;
          self.business = localStorageService.get('UserType');
          self.ImageUrl = Configurations.ImageUrl;
          self.DataAvailable = true;
          self.ImageUrl = Configurations.ImageUrl;
          // self.ImageUrlBusiness = Configurations.PlaceholderImg;
          $rootScope.isActiveFooter = 'mytowken';
          mytowkenapi.FireApi().then(function(response) {
            if(response.status == 1){
              self.towkens = response.data;
              self.towkens = typeConversion.toNumber(response.data);
              self.towkens = typeConversion.formatData(self.towkens);
              if (self.business == 'user'){
                  GetRatings(self.towkens);
              }
            }else{
              self.DataAvailable = false;
            }
          });

          function GetRatings(data) {
              if (i == data.length) {} else {
                  var obj = data[i];
                  mytowkenapi.getRating(data, obj).then(function(response) {
                    if(response.status == 1 && response.data.length !==0){
                        data[i].rating = response.data[0].rating;
                        i = i + 1;
                         GetRatings(data);
                    }
                     
                  });
              }

          }

          self.TowkenEdit = function(towken) {
              $state.go('app.createtowken', {
                  'business_name': towken.business_name,
                  'duration': towken.time_remaining,
                  'distance': towken.mile,
                  'discount': towken.discount,
                  'quantity': towken.token_quantity,
                  'type': towken.type_of_token,
                  'details': towken.token_details,
                  'time_remaining': towken.time_remaining,
                  'id': towken._id,
                  'image':towken.towken_pic
              });
          }

          self.Timerfinished = function(data){
            data.timefinished = true;
            $scope.$apply();
          }

      }
  })();