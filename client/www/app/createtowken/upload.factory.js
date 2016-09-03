(function() {
    'use strict';
    angular.module('scale')
            .factory('upload', upload);

    function upload($resource, Configurations, localStorageService) {
        //return $resource(Configurations.Hostserver + 'towken/list/:lat/:lng?access_token='+localStorageService.get("UserToken"), {'lat':'@lat', 'lng':'@lng'}, {});
        return $resource(Configurations.Hostserver + 'towken/upload', {}, {});
    }
    ;
})();