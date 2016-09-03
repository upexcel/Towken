(function() {
    'use strict';

    angular.module('scale')
        .controller('redeemController', redeemController);
        function redeemController(tostService, ApiError, redeemFactory, $rootScope,  localStorageService, $ionicLoading){
        	var self=this;
          $rootScope.isActiveFooter = 'redeem';
        	self.create=function(){
                $ionicLoading.show();
                  var query=redeemFactory.save({
                   UserToken:localStorageService.get('UserToken').token,
                    redeem_code:self.code
                  });
                  query.$promise.then(function(res){
                    if(res.status == 1){
                          self.clicked = true;
                          self.cust_name= res.data[0].user_id.fullname;
                          self.cust_email = res.data[0].user_id.email;
                    }else{
                        tostService.notify("Invalid Code", 'top');
                    }
                     $ionicLoading.hide();
                  }).catch(function(err){
                     $ionicLoading.hide();
                    ApiError.Alert();
                  }) 
        		
        	}

            self.another=function(){
                self.clicked = false;
                self.code ='';
            }

        }

})();