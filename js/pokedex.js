var pokeApp = angular.module('pokedex', ['ngResource'])
    .controller('SearchCtrl', SearchController);

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

// The URL to access to the API providing the Pokemon list
var pokeApiUrl = "http://pokeapi.co/";



// -------------------------------------------------
// Controllers
// -------------------------------------------------
function SearchController($scope, $http)
{
    console.log("LOG : CONTROLLER : Controller SearchController OK");

    var pokeApiUrlListTotal = pokeApiUrl + "api/v2/pokemon/";
    console.log("LOG : CONTROLLER : URL fournissant la liste des pokémons : " + pokeApiUrlListTotal);

    // GET request
    $http({
        method: 'GET',
        url: pokeApiUrlListTotal
    }).then(function successCallback(response) {
        console.log("LOG : CONTROLLER : Requête HTTP réussit avec succès");
        $scope.data = {
            // To display the name of the selected pokemon
            selectedPoke: null,
            // To provide the list of pokemons
            pokemons: response.data
        };
    });
}