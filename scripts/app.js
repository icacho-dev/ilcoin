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
  }])
  .run(function(DTDefaultOptions) {
    DTDefaultOptions.setDOM('ip');
  });
})(window.angular);