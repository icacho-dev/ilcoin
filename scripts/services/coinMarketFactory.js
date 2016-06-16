(function(angular) {
  'use strict';
  angular.module('myApp.services')
  .factory('coinMarketFactory', ['$http', '$q', function($http, $q) {
    var path = ''
    var params = [];
    return {
      getTmpNode : function () {
              return params;
      },
      setTmpNode:function(value){
          console.log('setTmpNode',params);
          return params.push(value);
      },
      getGlobalData: function() {
        console.log('[-] getGlobalData');
        var path = 'https://api.coinmarketcap.com/v1/global/';
        return $http.get(path)
        .then(function(response) {
          console.log('[0] getGlobalData',response);
          if (typeof response.data === 'object') {
            console.log('[1] getGlobalData -> ', response.data);
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
        console.info('getPage -> params',params);
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

  }])
  .factory('dataFactory', ['$http', function($http) {

    var dataFactory = {};

    dataFactory.getGlobalData = function (url) {
      return $http.get(url);
    };

    dataFactory.getFirstDataSet = function (url) {

      return $http.get(url).then(function(response) {
        if (typeof response.data === 'object') {
          return response.data.results;
        } else {
          return $q.reject(response.data);
        }
      }, function(response) {
        return $q.reject(response.data);
      });
    };

    dataFactory.getPageDataSet = function (page) {
      console.log('fac:getPageDataSet ->',page);
      return $http.get('https://api.import.io/store/connector/6cc86d93-9a64-4068-b9e2-8dc6c3239bfe/_query?input=webpage/url:http%3A%2F%2Fcoinmarketcap.com%2Fall%2F'+page+      '&&_apikey=1ecdbfaa5b6a4e99b4ac28e155faad363521bf2ee092218e5230734bd9af72c0a58ff2dcaeeefaf76b86d608e507439d2c4a387961de01947a6c9592f4d19bb23b47c25d666d1541bd6e7f892d7ac2c1').then(function(response) {
        if (typeof response.data === 'object') {
          return response.data.results;
        } else {
          return $q.reject(response.data);
        }
      }, function(response) {
        return $q.reject(response.data);
      });
    };
    //
    // dataFactory.insertCustomer = function (cust) {
    //   return $http.post(urlBase, cust);
    // };
    //
    // dataFactory.updateCustomer = function (cust) {
    //   return $http.put(urlBase + '/' + cust.ID, cust)
    // };
    //
    // dataFactory.deleteCustomer = function (id) {
    //   return $http.delete(urlBase + '/' + id);
    // };
    //
    // dataFactory.getOrders = function (id) {
    //   return $http.get(urlBase + '/' + id + '/orders');
    // };

      return dataFactory;
   }])
   .service('dataService', function (dataFactory) {

        this.globalData = function(gulr) {
               return dataFactory.getGlobalData(gulr);
        }

        this.firstDataSet = function(gulr) {
               return dataFactory.getFirstDataSet(gulr);
        }

        this.pageDataSet = function(page) {
          console.log('ser:getPageDataSet ->',page);
          return dataFactory.getPageDataSet(page);
        }

        this.allData = function(data) {

            // var active_assets = data.active_assets;
            // var active_currencies = data.active_currencies;
            // var length = active_assets + active_currencies;
            // var lPage = Math.ceil(length/100);
            //
            // var defer = $q.defer();
            // var promises = [];
            //
            // angular.forEach(resources, function(value) {
            //     promises.push(MyApi.details(resources[i].key));
            // });
            // for (var i=1; i<lPage; i++) {
            //   promises.push(i);
            // }
            //
            // $q.all(promises).then(function() {
            //     $scope.total = $scope.results.reduce(function(a, b) { return a + b; }, 0);
            // })
            //
            // console.log('allData');
            return dataFactory.getPageDataSet(data);
        }
        // this.getCustomer = function (id) {
        //     return $http.get(urlBase + '/' + id);
        // };
        //
        // this.insertCustomer = function (cust) {
        //     return $http.post(urlBase, cust);
        // };
        //
        // this.updateCustomer = function (cust) {
        //     return $http.put(urlBase + '/' + cust.ID, cust)
        // };
        //
        // this.deleteCustomer = function (id) {
        //     return $http.delete(urlBase + '/' + id);
        // };
        //
        // this.getOrders = function (id) {
        //     return $http.get(urlBase + '/' + id + '/orders');
        // };
    });
})(window.angular);