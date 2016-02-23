var pokeApp = angular.module('pokedex', ['ngResource'])
    .controller('SearchCtrl', SearchController);

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

var pokeApiUrl = "http://pokeapi.co/";

// Controller for search usage
function SearchController($scope, $http)
{
    console.log("LOG : CONTROLLER : Controller SearchController OK");

    var pokeApiUrlListTotal = "http://pokeapi.co/api/v2/pokemon/";
    console.log("LOG : CONTROLLER : URL fournissant la liste des pokémons : " + pokeApiUrlListTotal);

    // GET request
    $http({
        method: 'GET',
        url: pokeApiUrlListTotal
    }).then(function successCallback(response) {
        console.log("LOG : CONTROLLER : Requête HTTP réussit avec succès");
        $scope.pokemons = response.data;
    });
}