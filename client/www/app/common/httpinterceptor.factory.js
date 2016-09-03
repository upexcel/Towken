(function() {
    'use strict';	
angular.module('scale')
  .factory('timeoutHttpIntercept', timeoutHttpIntercept);
  function timeoutHttpIntercept() {
    return {
      'request': function(config) {
        config.timeout = 15000;
        return config;
      }
    };
 }
})();
