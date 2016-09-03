(function() {
    'use strict';
    angular.module('scale')
            .factory('PopupModel', PopupModel);

    function PopupModel($resource, Configurations, $rootScope, localStorageService, $ionicPopup) {
         var service={}
         service.GenrateModel=function(){
        var myPopup = $ionicPopup.show({
         templateUrl: 'app/createtowken/template/durationdropdown.html',
         title: 'Distance',
         scope: "abcd",
			
         buttons: [
            { text: 'CANCEL' }, {
               text: '<span class="color">DONE</span>',
               type: 'button-default',
                  onTap: function(e) {
                     if (!self.model) {
                        //don't allow the user to close unless he enters model...
                           e.preventDefault();
                     } else {
                        return self.model;
                     }
                  }
            }
         ]
      });

      myPopup.then(function(res) {
         console.log('Tapped!', res);
      });   
         }
         return service;
    }
    ;
})();