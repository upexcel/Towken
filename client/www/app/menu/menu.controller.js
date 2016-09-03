(function() {
    'use strict';

    angular.module('scale')
        .controller('menuController', menuController);

    function menuController($state, $ionicPlatform, $localStorage, localStorageService, $ionicHistory, tostService, $timeout, $rootScope, $ionicSideMenuDelegate) {
        var self = this;
     
        self.active = 'user';
        self.setActive = function(type) {
            self.active = type;
            $state.go('app.' + type)
        };

        self.isActive = function(type) {
            return type === self.active;
        };
     

        self.mapTab = true;
        self.dataTab = false;
        self.menutabs = true;
        self.img = localStorageService.get("UserPic");
       
        if (localStorageService.get('UserType') == "business") {
            self.customer = false;
            self.navMapListOption=false; 
        } else {
            self.customer = true;
            self.navMapListOption=true; 
        }
        var count = 0;
     
        // $ionicPlatform.registerBackButtonAction(function() {
        //     console.log("uper",count)
        //     var view = $ionicHistory.currentView();
        //     if (count == 0) {
        //         console.log("if",count)
        //         tostService.notify('Press Back Again To Exit App', 'top');
        //         count++;
        //         $timeout(function() {
        //             count = 0;
        //         }, 3000);
        //     } else if (count == 1) {
        //          console.log("else",count)
        //         navigator.app.exitApp();
        //         count = 0;
        //     } 
        // }, 100);

        self.go = function(state) {
            $state.go(state);
        }
        
         $rootScope.$on('$stateChangeStart',
                        function(event, toState, toParams, fromState, fromParams) {
                            var userData = localStorageService.get('UserType');
                                if(toState.name == 'app.user' || toState.name == 'app.towkenlist'){
                                    self.navMapListOption=true;
                                }else{
                                    self.navMapListOption=false;
                                }
                             
                        });
    }
})();