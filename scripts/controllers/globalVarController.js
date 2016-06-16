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
    'GLOBALS_URL' : 'https://api.coinmarketcap.com/v1/global/',
    'GLOBALS_URLPRE' : 'https://api.import.io/store/connector/6cc86d93-9a64-4068-b9e2-8dc6c3239bfe/_query?input=webpage/url:http%3A%2F%2Fcoinmarketcap.com%2Fall%2F',
    'GLOBALS_URLPOS' : '&&_apikey=1ecdbfaa5b6a4e99b4ac28e155faad363521bf2ee092218e5230734bd9af72c0a58ff2dcaeeefaf76b86d608e507439d2c4a387961de01947a6c9592f4d19bb23b47c25d666d1541bd6e7f892d7ac2c1'
  })
  .controller('GlobalVarController', ['$scope', 'CONFIG', function($scope, CONFIG) {
    //console.log(CONFIG);
    $scope.config = CONFIG;
  }]);
})(window.angular);