(function(angular) {
  'use strict';
  angular.module('myApp.services')
  .factory('coinMarketFactory', ['$http', '$q', function($http, $q) {

    var params = [];
    return {
      getTmpNode : function () {
              return params;
      },
      setTmpNode:function(value){
          params.push(value);
          console.log('setTmpNode',params);
          return params;
      },
      getGlobalData: function() {
        var path = 'https://api.coinmarketcap.com/v1/global/';

        return $http.get(path)
        .then(function(response) {
          if (typeof response.data === 'object') {
            console.log('getGlobalData -> ', response.data);
            return response.data;
          } else {
            console.log('invalid response');
            return $q.reject(response.data);
          }
        }, function(response) {
          console.log('something went wrong');
          return $q.reject(response.data);
        });
      },
      getPage: function(pageNumber) {
        // var path = 'https://api.coinmarketcap.com/v1/global/';
        var path = 'https://api.import.io/store/connector/6cc86d93-9a64-4068-b9e2-8dc6c3239bfe/_query?input=webpage/url:http%3A%2F%2Fcoinmarketcap.com%2Fall%2F'+pageNumber+'&&_apikey=1ecdbfaa5b6a4e99b4ac28e155faad363521bf2ee092218e5230734bd9af72c0a58ff2dcaeeefaf76b86d608e507439d2c4a387961de01947a6c9592f4d19bb23b47c25d666d1541bd6e7f892d7ac2c1';
        // var path = 'http://swfideas.com/ilcoin/data-v2.json';
        console.info('params',params);
        return $http.get(path)
        .then(function(response) {
          if (typeof response.data === 'object') {
            //response.data.results.splice(params[0][0]);
            //response.data.results.insert(params[0][0],params[0][1]);
            response.data.results.splice(params[0][0],1,params[0][1]);
            return response.data.results;
          } else {
            console.log('invalid response');
            return $q.reject(response.data);
          }
        }, function(response) {
          console.log('something went wrong');
          return $q.reject(response.data);
        });
      }
    };

  }]);
})(window.angular);