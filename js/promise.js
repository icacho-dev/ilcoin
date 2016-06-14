'use strict';
angular.module('showcase.withPromise', ['datatables', 'ngResource']).controller('WithPromiseCtrl', WithPromiseCtrl)
.factory('dataService', function ($http, $q) {
        return {
            getAll: function() {
                var path = 'https://api.import.io/store/connector/6cc86d93-9a64-4068-b9e2-8dc6c3239bfe/_query?input=webpage/url:http%3A%2F%2Fcoinmarketcap.com%2F&&_apikey=1ecdbfaa5b6a4e99b4ac28e155faad363521bf2ee092218e5230734bd9af72c0a58ff2dcaeeefaf76b86d608e507439d2c4a387961de01947a6c9592f4d19bb23b47c25d666d1541bd6e7f892d7ac2c1';
                // var path = 'http://swfideas.com/ilcoin/data-v2.json';

                return $http.get(path)
                    .then(function(response) {
                        if (typeof response.data === 'object') {
                          var max = 15;
                          var min = 5;
                          var index = Math.floor(Math.random() * (max - min + 1)) + min;
                          var ilcoin = {
                            "marketcap_price/_currency": "USD",
                            "available_link_numbers/_source": "104,755,184,269",
                            "marketcap_price/_source": "$ 33,555,914",
                            "number": index,
                            "name_link/_text": "ILCoin",
                            "name_link/_source": "/currencies/ilcoin/",
                            "number/_source": index.toString(),
                            "price_link/_source": "/currencies/ilcoin/#markets",
                            "available_link": "http://dogechain.info/chain/ILCoin",
                            "name_image/_source": "/static/img/coins/16x16/ilcoin.png",
                            "price_link/_text": "$ 0.000320",
                            "pricegraph7d_link/_source": "/currencies/ilcoin/#charts",
                            "available_link/_text": "104,755,184,269 ILC",
                            "volume24h_link": "http://coinmarketcap.com/currencies/ilcoin/#markets",
                            "name_link": "http://coinmarketcap.com/currencies/ilcoin/",
                            "name_image": "http://coinmarketcap.com/static/img/coins/16x16/ilcoin.png",
                            "marketcap_price": 33555914,
                            "name_image/_alt": "ILCoin",
                            "available_link_numbers": 104755184269,
                            "pricegraph7d_image/_alt": "sparkline",
                            "volume24h_link/_text": "$ 1,592,390",
                            "pricegraph7d_link": "http://coinmarketcap.com/currencies/ilcoin/#charts",
                            "price_link": "http://coinmarketcap.com/currencies/ilcoin/#markets",
                            "pricegraph7d_image": "https://files.coinmarketcap.com/generated/sparklines/74.png",
                            "volume24h_link/_source": "/currencies/ilcoin/#markets",
                            "change24h_value": "15.60 %"
                          };
                            response.data.results.splice(index, 1);
                            response.data.results.insert(index,ilcoin);
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
    });

function WithPromiseCtrl(DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, $resource, $filter,dataService) {
    var vm = this;
    vm.dtOptions = DTOptionsBuilder.fromFnPromise(function(){
      return dataService.getAll();
    })
    .withPaginationType('full_numbers')
    .withOption('responsive', true)
    .withDisplayLength(100)
    // .withDataProp('data')
    ;

    vm.dtColumns = [
        DTColumnBuilder.newColumn('number/_source').withTitle('#').notSortable(),
        DTColumnBuilder.newColumn('name_link/_text').withTitle('Name').renderWith(imgCellLabel).withClass('font-bold'),
        DTColumnBuilder.newColumn('marketcap_price/_source').withTitle('Market Cap').withClass('no-wrap text-right').withOption('defaultContent', defaultValue()),
        DTColumnBuilder.newColumn('price_link/_text').withTitle('Price').withClass('no-wrap text-right text-bold').withOption('defaultContent', defaultValue()),
        DTColumnBuilder.newColumn('available_link/_text').withTitle('Avaiable Supply').withClass('no-wrap text-right').withOption('defaultContent', defaultValue()),
        DTColumnBuilder.newColumn('volume24h_link/_text').withTitle('Volume (24h)').withClass('no-wrap text-right').withOption('defaultContent', defaultValue()),
        DTColumnBuilder.newColumn('change24h_value').withTitle('% Change (24h)').renderWith(percentLabel).withClass('no-wrap text-right').withOption('defaultContent', defaultValue()),
        DTColumnBuilder.newColumn('pricegraph7d_image').withTitle('Price Graph (7d)').renderWith(imgCellGraph).withClass('no-wrap').notSortable(),
    ];

    vm.dtColumnDefs = [];


    function imgCellLabel(data, type, full, meta) {
      var path = full['name_image/_source'].replace("img/coins", "icons");
      return '<img src=".'+ path +'" alt="' + full['name_image/_alt'] + '-logo" class="currency-logo"/>' + ' ' + data ;
    };

    function imgCellGraph(data, type, full, meta) {
      var path = full['pricegraph7d_image'];
      return '<img class="sparkline" alt="sparkline" src="'+path+'">';
    };

    function percentLabel(data, type, full, meta) {
      var result = ( parseFloat(data) > 0 )? "pct-positive" : "pct-negative";
      var htmlStr = "<span class='"+result+"'>"+data+"</span>";
      return htmlStr ;
    };

    function defaultValue() {
      var htmlStr = "<p class='text-center text-muted'> ? </p>";
      return htmlStr ;
    };

    Array.prototype.insert = function (index, item) {
      this.splice(index, 0, item);
    };

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

}