'use strict';
angular.module('showcase.withPromise', ['datatables', 'ngResource']).controller('WithPromiseCtrl', WithPromiseCtrl)
.factory('dataService', function ($http, $q) {
        return {
            getAll: function() {

                return $http.get('http://swfideas.com/ilcoin/data-v2.json')
                    .then(function(response) {
                        if (typeof response.data === 'object') {
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
    .withDataProp('tableData');
    /*{
      "marketcap_price/_currency": "USD",
      "available_link_numbers/_source": "15,656,175",
      "marketcap_price/_source": "$ 10,854,363,503",
      "number": 1.0,
      "name_link/_text": "Bitcoin",
      "name_link/_source": "/currencies/bitcoin/",
      "number/_source": "1",
      "price_link/_source": "/currencies/bitcoin/#markets",
      "available_link": "http://blockchain.info",
      "name_image/_source": "/static/img/coins/16x16/bitcoin.png",
      "price_link/_text": "$ 693.30",
      "pricegraph7d_link/_source": "/currencies/bitcoin/#charts",
      "available_link/_text": "15,656,175 BTC",
      "volume24h_link": "http://coinmarketcap.com/currencies/bitcoin/#markets",
      "name_link": "http://coinmarketcap.com/currencies/bitcoin/",
      "name_image": "http://coinmarketcap.com/static/img/coins/16x16/bitcoin.png",
      "marketcap_price": 1.0854363503E10,
      "name_image/_alt": "Bitcoin",
      "available_link_numbers": 1.5656175E7,
      "pricegraph7d_image/_alt": "sparkline",
      "volume24h_link/_text": "$ 216,427,000",
      "pricegraph7d_link": "http://coinmarketcap.com/currencies/bitcoin/#charts",
      "price_link": "http://coinmarketcap.com/currencies/bitcoin/#markets",
      "pricegraph7d_image": "https://files.coinmarketcap.com/generated/sparklines/1.png",
      "volume24h_link/_source": "/currencies/bitcoin/#markets",
      "change24h_value": "0.31 %"
    }
    */

    vm.dtColumns = [
        DTColumnBuilder.newColumn('number/_source').withTitle('#'),
        DTColumnBuilder.newColumn('name_link/_text').withTitle('Name').renderWith(imgCellLabel).withClass('font-bold'),
        DTColumnBuilder.newColumn('marketcap_price/_source').withTitle('Market Cap').withClass('no-wrap text-right').withOption('defaultContent', 'Default value'),
        DTColumnBuilder.newColumn('price_link/_text').withTitle('Price').withClass('no-wrap text-right text-bold').withOption('defaultContent', 'Default value'),
        DTColumnBuilder.newColumn('available_link/_text').withTitle('Avaiable Supply').withClass('no-wrap text-right').withOption('defaultContent', 'Default value'),
        DTColumnBuilder.newColumn('volume24h_link/_text').withTitle('Volume (24h)').withClass('no-wrap text-right').withOption('defaultContent', 'Default value'),
        DTColumnBuilder.newColumn('change24h_value').withTitle('% Change (24h)').renderWith(percentLabel).withClass('no-wrap text-right').withOption('defaultContent', 'Default value'),
        DTColumnBuilder.newColumn('pricegraph7d_image').withTitle('Price Graph (7d)').renderWith(imgCellGraph).withClass('no-wrap'),
    ];

    vm.dtColumnDefs = [];


    function imgCellLabel(data, type, full, meta) {
      console.log(full);
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


}