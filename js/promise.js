'use strict';
angular.module('showcase.withPromise', ['datatables', 'ngResource']).controller('WithPromiseCtrl', WithPromiseCtrl);

function WithPromiseCtrl(DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, $resource, $filter) {
    var vm = this;
    vm.dtOptions = DTOptionsBuilder.fromFnPromise(function() {

        return $resource('http://swfideas.com/ilcoin/data.json').query().$promise;
    })
    .withPaginationType('full_numbers')
    .withOption('responsive', true);
    /*{
        "id": "bitcoin",
        "name": "Bitcoin",
        "symbol": "BTC",
        "rank": 1,
        "price_usd": 690.628,
        "24h_volume_usd": 231930000.0,
        "market_cap_usd": 10811919466.0,
        "available_supply": 15655200.0,
        "total_supply": 15655200.0,
        "percent_change_1h": -0.63,
        "percent_change_24h": 2.27,
        "percent_change_7d": 17.76
    }
    */

    vm.dtColumns = [
        DTColumnBuilder.newColumn('rank').withTitle('#'),
        DTColumnBuilder.newColumn('name').withTitle('Name').renderWith(imgCellLabel).withClass('font-bold'),
        DTColumnBuilder.newColumn('market_cap_usd').withTitle('Market Cap').renderWith(currencyIntWithCommas).withClass('text-right '),
        DTColumnBuilder.newColumn('price_usd').withTitle('Price').renderWith(currencyWithCommas).withClass('text-right text-bold'),
        DTColumnBuilder.newColumn('available_supply').withTitle('Avaiable Supply').renderWith(supplyWithCommas).withClass('text-right'),
        DTColumnBuilder.newColumn('24h_volume_usd').withTitle('Volume (24h)').renderWith(numberWithCommas).withClass('text-right'),
        DTColumnBuilder.newColumn('percent_change_24h').withTitle('% Change (24h)').renderWith(percentLabel).withClass('text-right pct-col'),
    ];

    vm.dtColumnDefs = [
        // DTColumnDefBuilder.newColumnDef(2).withOption('type', 'currency')
    ];



    function imgCellLabel(data, type, full, meta) {
      return '<img src="./static/icons/16x16/'+ full.id +'.png" alt="' + full.id + '-logo" class="currency-logo"/>' + ' ' + data ;
    }

    function numberWithCommas(data, type, full, meta) {
      var result;

      if(data !== null){


        if (angular.isNumber(data)) {
          result = $filter('number')(data,0);

          return result;
        } else {
          return data;
        }

      } else {
        return null;
      }
    }

    function currencyWithCommas(data, type, full, meta) {
      var result;
      var fractionSize = 4;
      var parts;

      if(data !== null){
        parts=data.toString().split(".");
        fractionSize = (parts[1] !== undefined && parts[1].length > 3)? parts[1].length : 2;

        if (angular.isNumber(data)) {
          result = $filter('currency')(data, '$ ', fractionSize);

          return result;
        } else {
          return data;
        }

      } else {
        return null;
      }

    }

    function currencyIntWithCommas(data, type, full, meta) {
      var result;

      if(data !== null){

        if (angular.isNumber(data)) {
          result = $filter('currency')(data, '$ ', 0);

          return result;
        } else {
          return data;
        }

      } else {
        return null;
      }

    }

    function supplyWithCommas(data, type, full, meta) {
      //full.symbol;
      var result;

      if(data !== null){


        if (angular.isNumber(data)) {
          result = $filter('number')(data,0) + ' ' + full.symbol;

          return result;
        } else {
          return data;
        }

      } else {
        return null;
      }
    }

    function percentLabel(data, type, full, meta) {

      var result = ( parseFloat(data) > 0 )? "pct-positive" : "pct-negative";
      var htmlStr = "<span class='"+result+"'>"+data+" %</span>";
      return htmlStr ;
    }



    // function percentClass(data, type, full, meta) {
    //
    //   var result = ( parseFloat(data) > 0 )? "pct-positive" : "pct-negative";
    //
    //   return 'text-right ' + result ;
    // }

}