(function() {
    'use strict';
    angular.module('scale')
        .factory('userValidate', userValidate);

    function userValidate(localStorageService, $state, $stateParams, $rootScope, $location) {
        return {
            validUser: function() {
                $rootScope.$on('$stateChangeStart',
                    function(event, toState, toParams, fromState, fromParams) {
                        var userData = localStorageService.get('UserType');
                        if (userData) {
                            if (toState.url == '/customers'  || toState.url == '/profile' || toState.url == '/payment' ||
                                toState.name == 'app.createtowken' || toState.url == '/business' || toState.url == "/selectedtowkenlist" 
                                || toState.name == "app.thankyou" || toState.name == "app.mytowkens" ||
                                 toState.name == "app.towkenlist" || toState.name == "app.watchtowken" ||
                                  toState.name == "app.redeem" || toState.name == "app.account" || 
                                  toState.name == "app.changepassword" ||  toState.name == 'app.businessrating' ||
                                 toState.name == 'app.profilephoto' || toState.name == 'app.socialaccounts'|| toState.name ==  'app.updateProfile') {

                            } else {
                                $state.transitionTo("app." + userData.toLowerCase());
                                event.preventDefault();
                            }
                        } else {
                            if (toState.url == '/' || toState.url == '/signup/:type' || toState.url == '/ForgotPassword') {

                            } else {
                                $state.transitionTo("login");
                                event.preventDefault();
                            }
                        }
                    })
            }
        }
    }

})();