(function() {
    'use strict';

    angular.module('scale')
        .factory('SelectedTowkensCount', SelectedTowkensCount);
        function SelectedTowkensCount($resource, Configurations, localStorageService){
             return $resource(Configurations.Hostserver + 'towken/selectedTowkensCount?access_token=:UserToken', {'UserToken':'@UserToken'}, {});
        }

})();        
