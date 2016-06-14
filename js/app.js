(function(){
	//para hacer uso de $resource debemos colocarlo al crear el modulo
	angular.module('showCase', ['datatables','showcase.withPromise']);
	//https://api.coinmarketcap.com/v1/global/
	//con dataResource inyectamos la factoría
	// app.controller("appController", function ($scope, $http, dataResource, DTOptionsBuilder, DTColumnDefBuilder) {
	//
	//
	//
	//     $http.get('https://api.coinmarketcap.com/v1/ticker/').then(function successCallback(response) {
	// 	    // this callback will be called asynchronously
	// 	    // when the response is available
	// 			console.log("fin api get")
	// 			var ilcoin = { "id": "dash",
	// 			"name": "Ilcoin",
	// 			"symbol": "ILCOIN",
	// 			"rank": 6,
	// 			"price_usd": 7.7184,
	// 			"24h_volume_usd": 744727,
	// 			"market_cap_usd": 50320197,
	// 			"available_supply": 6519511,
	// 			"total_supply": 6519511,
	// 			"percent_change_1h": 1.24,
	// 			"percent_change_24h": -1.25,
	// 			"percent_change_7d": 0.32 };
	//
	// 			$scope.data = (response.data);
	//
	// 			$scope.data.splice(3,0,ilcoin);
	//
	//
	// 	  }, function errorCallback(response) {
	// 	    // called asynchronously if an error occurs
	// 	    // or server returns response with an error status.
	// 			console.log("fin api getError")
	//
	// 	  });
	//     //datosResource lo tenemos disponible en la vista gracias a $scope
	//     //$scope.datosResource = dataResource.get();
	// })
	//
	// //de esta forma tan sencilla consumimos con $resource en AngularJS
	// app.factory("dataResource", function ($resource) {
	//     return $resource("https://api.coinmarketcap.com/v1/ticker/", //la url donde queremos consumir
	//         {}, //aquí podemos pasar variables que queramos pasar a la consulta
	//         //a la función get le decimos el método, y, si es un array lo que devuelve
	//         //ponemos isArray en true
	//         {
	// 					get: { method: "GET", isArray: true }
	//     })
	// })


})();