(function(angular) {
  'use strict';
  angular.module('myApp.controllers')
  .constant('CONFIG', {
    'APP_NAME' : 'Crypto Currency App',
    'APP_VERSION' : '1.1.3',
    'GOOGLE_ANALYTICS_ID' : '',
    'BASE_URL' : 'http://swfideas.com/ilcoin/',
    'SYSTEM_LANGUAGE' : 'en',
    'DEBUG' : true,
  })
  .controller('GlobalVarController', ['$scope', 'CONFIG', function($scope, CONFIG) {
    console.log(CONFIG);
    $scope.config = CONFIG;
  }]);
})(window.angular);