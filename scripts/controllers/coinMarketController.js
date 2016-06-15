(function(angular) {
  'use strict';
  angular.module('myApp.controllers')
  .controller('coinMarketController', [
    '$scope','$resource', '$filter', 'DTOptionsBuilder', 'DTColumnBuilder', 'coinMarketFactory',
    function($scope, $resource, $filter, DTOptionsBuilder, DTColumnBuilder, coinMarketFactory) {

      console.log('coinMarketController');

      $scope.ilcoinTmp;
      $scope.ilcoinTmpIndex;
      $scope.ilcoinTmpParams = setTempNode();
      $scope.pageNumber = 1;
      $scope.pageLength = 100;
      $scope.totalEl = 100;
      $scope.globalData = setGlobalData();

      $scope.$watch('globalData', function() {
        alert('hey, myVar has changed!');
      });

      var vm = this;
      vm.authorized = false;

      vm.dtInstance = {};
      vm.dtInstanceCallback = function(_dtInstance) {
        vm.dtInstance = _dtInstance;
        vm.dtInstance.reloadData(); //or something else....
      };

      vm.dtOptions = DTOptionsBuilder.fromFnPromise(function(){
        return coinMarketFactory.getPage($scope.pageNumber);
      }).withOption('responsive', true)
      // .withPaginationType('full_numbers')
      .withOption('sDom', '<"toolbar">rt<"bottom"i><"clear">')
      .withOption('pageLength', $scope.pageLength)
      .withOption('authorized', true)
      ;

      vm.dtColumns = [
        DTColumnBuilder.newColumn('number/_source').withTitle('#'),
        DTColumnBuilder.newColumn('name_link/_text').withTitle('Name').renderWith(imgCellLabel).withClass('font-bold'),
        DTColumnBuilder.newColumn('marketcap_price/_source').withTitle('Market Cap').withClass('no-wrap text-right').withOption('defaultContent', defaultValue()),
        DTColumnBuilder.newColumn('price_link/_text').withTitle('Price').withClass('no-wrap text-right text-bold').withOption('defaultContent', defaultValue()),
        DTColumnBuilder.newColumn('available_link/_text').withTitle('Avaiable Supply').withClass('no-wrap text-right').withOption('defaultContent', defaultValue()),
        DTColumnBuilder.newColumn('volume24h_link/_text').withTitle('Volume (24h)').withClass('no-wrap text-right').withOption('defaultContent', defaultValue()),
        DTColumnBuilder.newColumn('change24h_value').withTitle('% Change (24h)').renderWith(percentLabel).withClass('no-wrap text-right').withOption('defaultContent', defaultValue()),
        DTColumnBuilder.newColumn('pricegraph7d_image').withTitle('Price Graph (7d)').renderWith(imgCellGraph).withClass('no-wrap').notSortable(),
      ];


      // -------------------------------------------------
      function setTempNode() {
        console.log('[1] setTempNode');
        $scope.ilcoinTmpIndex = getRandomInt(5,15);
        $scope.ilcoinTmp = {
          "marketcap_price/_currency": "USD",
          "available_link_numbers/_source": "104,755,184,269",
          "marketcap_price/_source": "$ 33,555,914",
          "number": $scope.ilcoinTmpIndex,
          "name_link/_text": "ILCoin",
          "name_link/_source": "/currencies/ilcoin/",
          "number/_source": $scope.ilcoinTmpIndex.toString(),
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
        console.log('coinMarketFactory.setTmpNode->');
        coinMarketFactory.setTmpNode([$scope.ilcoinTmpIndex,$scope.ilcoinTmp]);
        return coinMarketFactory.getTmpNode;
      }

      function setGlobalData(){ return coinMarketFactory.getGlobalData; };

      function reloadData() {
        var resetPaging = false;
        vm.dtInstance.reloadData(callback, resetPaging);
      };

      function callback(json) { console.log(json); };

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

      function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; };

    }]);
  })(window.angular);