(function() {
    'use strict';

    angular.module('scale')

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/',
                cache: false,
                templateUrl: 'app/login/login.html',
                controller: 'loginController',
                controllerAs: 'login'
            })
            .state('signup', {
                url: '/signup/:type',
                cache: false,
                templateUrl: 'app/signup/signup.html',
                controller: 'signupController',
                controllerAs: 'signup'
            })
            .state('ForgotPassword', {
                url: '/ForgotPassword',
                cache: false,
                templateUrl: 'app/forgotpassword/forgotpassword.html',
                controller: 'ForgotPasswordController',
                controllerAs: 'forgot'
            })
            .state('app', {
                url: '/app',
                cache: false,
                abstract: true,
                templateUrl: 'app/menu/menu.html',
                controller: 'menuController',
                controllerAs: 'menu'
            })
            .state('app.user', {
                url: '/customers',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'app/customers/customers.html',
                        controller: 'customersController',
                        controllerAs: 'customers'
                    }
                }
            })
            .state('app.businessrating', {
                url: '/businessrating',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'app/businessrating/businessrating.html',
                        controller: 'BusinessRatingController',
                        controllerAs: 'BR'
                    }
                }
            })
             .state('app.towkenlist', {
                url: '/towkenlist',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'app/towkenlist/towkenlist.html',
                        controller: 'towkenlistController',
                        controllerAs: 'towkenlist'
                    }
                }
            })
              .state('app.redeem', {
                url: '/redeem',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'app/redeem/redeem.html',
                        controller: 'redeemController',
                        controllerAs: 'redeem'
                    }
                }
            })
            .state('app.mytowkens', {
                url: '/mytowken',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'app/mytowken/mytowken.html',
                        controller: 'mytowkenController',
                        controllerAs: 'mytowken'
                    }
                }
            })
             .state('app.updateProfile', {
                url: '/updateProfile',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'app/updateprofile/updateprofile.html',
                        controller: 'UpdateProfileController',
                        controllerAs: 'UP'
                    }
                }
            })
             .state('app.account', {
                url: '/account',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'app/account/account.html',
                        controller: 'accountController',
                        controllerAs: 'account'
                    }
                }
            })
              .state('app.profilephoto', {
                url: '/profilephoto',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'app/profilephoto/profilephoto.html',
                        controller: 'ProfilePhotoController',
                        controllerAs: 'pp'
                    }
                }
            })
           .state('app.watchtowken', {
                url: '/watchtowken/:lat/:lng/:discount/:time/:des/:image',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'app/watchtowken/watchtowken.html',
                        controller: 'watchTowkenController',
                        controllerAs: 'watchtowken'
                    }
                }
            })
             .state('app.selectedtowkenlist', {
                url: '/selectedtowkenlist',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'app/selectedtowkenlist/selectedtowkenlist.html',
                        controller: 'selectedtowkenlistController',
                        controllerAs: 'selectedtowkenlist'
                    }
                }
            }) .state('app.thankyou', {
                url: '/thankyou/:text/:type:/:lat/:lng/:discount/:time/:time_remaining/:des/:redum_code/:image ',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'app/thankyou/thankyou.html',
                        controller: 'thankyouController',
                        controllerAs: 'thankyou'
                    }
                }
            })
            .state('app.profile', {
                url: '/profile',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'app/profile/profile.html',
                        controller: 'profileController',
                        controllerAs: 'profile'
                    }
                }
            })
             .state('app.changepassword', {
                url: '/changepassword',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'app/changepassword/changepassword.html',
                        controller: 'ChangePasswordController',
                        controllerAs: 'cp'
                    }
                }
            })
              .state('app.socialaccounts', {
                url: '/socialaccounts',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'app/socialaccounts/socialaccounts.html',
                        controller: 'socialaccountsController',
                        controllerAs: 'SA'
                    }
                }
            })
           
            .state('app.createtowken', {
                url: '/createtowken/:business_name/:duration:/:distance/:discount/:quantity/:type/:details/:time_remaining/:id/:image',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'app/createtowken/createtowken.html',
                        controller: 'CreateTowkenController',
                        controllerAs: 'create'
                    }
                }
            })
            .state('app.business', {
                url: '/business',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'app/business/business.html',
                        controller: 'businessController',
                        controllerAs: 'business'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise(function($injector, $location) {
            var $state = $injector.get("$state");
            $state.go('login');
        });
    });
})();