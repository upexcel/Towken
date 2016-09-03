(function() {
    'use strict';
    angular.module('scale')
        .factory('ApiError', ApiError);

    function ApiError(tostService, $ionicLoading) {
        var service = {};
        service.Alert = function() {
            $ionicLoading.hide();
            tostService.notify('Error! Connection Timeout','top');
        };
        return service;
    }
})();