(function() {
    'use strict';

    angular.module('scale')

    .run(function(userValidate, $ionicPlatform, $timeout,  $localStorage, $rootScope, $ionicHistory, tostService, localStorageService, $state) {
        userValidate.validUser();
        $localStorage["ChekedIn"] = false;
        $ionicPlatform.ready(function() {
            $rootScope.isAndroid = ionic.Platform.isAndroid();
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);   
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });

        document.addEventListener("deviceready", function() {
            var count = 0;
            $ionicPlatform.registerBackButtonAction(function(event) {
                if($state.current.name == 'app.thankyou'){
                   $state.go('app.' + localStorageService.get('UserType'));
                }else if($state.current.name == 'app.user' || $state.current.name == 'login' || $state.current.name == 'app.business'  ){
                       if (count == 0) {
                        count++;
                        tostService.notify('Press Back Again To Exit App', 'top');
                        $timeout(function() {
                            count = 0;
                        }, 3000);
                    } else if (count == 1) {
                        navigator.app.exitApp();
                        count = 0;
                    }
                   
                } else{
                     $ionicHistory.goBack(); 
                }
            
            }, 100);
        });
    });
})();