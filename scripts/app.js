(function(angular) {
  console.info('myApp loaded');
  'use strict';
  angular.module('myApp', [
    'datatables',
    'ngResource',
    'myApp.controllers',
    'myApp.services'
  ])
  .config(['$compileProvider', function ($compileProvider) {
    $compileProvider.debugInfoEnabled(true);
  }]);
})(window.angular);