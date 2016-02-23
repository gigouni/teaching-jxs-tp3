var pokeApp = angular.module('pokedex', ['ngResource'])
    .controller('SearchCtrl', SearchController);

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

// The URL to access to the API providing the Pokemon list
var pokeApiUrl = "http://pokeapi.co/";

// Hide the loader p tag
$("p#p_loader").hide();


// -------------------------------------------------
// Controllers
// -------------------------------------------------
function SearchController($scope, $http, $log)
{
    // Show the loader p tag
    $("p#p_loader").show();

    $scope.$log = $log;
    console.log("LOG : CONTROLLER : Controller SearchController et logs OK");

    var pokeApiUrlListTotal = pokeApiUrl + "api/v2/pokedex/1/";
    console.log("LOG : CONTROLLER : URL fournissant la liste des pokémons : " + pokeApiUrlListTotal);

    // GET request
    $http({
        method: 'GET',
        url: pokeApiUrlListTotal,

    }).then(function successCallback(response) {
        console.log("LOG : CONTROLLER : Requête HTTP (liste des pokémons) réussit avec succès.");
        // console.log("Avec : " + JSON.stringify(response.data.pokemon_entries));
        $scope.data = {
            // To display the name of the selected pokemon
            selectedPoke: null,
            // To provide the list of pokemons
            pokemons: response.data.pokemon_entries
        }

        // Hide the loader p tag
        $("p#p_loader").hide();

    });

    $scope.go = function () {

        // Get the ID given by the user (JQuery Powaaa)
        var IDGiven = $("input#id").val();

        // Show the loader p tag
        $("p#p_loader").show();

        // URI to get the information about the pokemon
        var pokeApiUrlPoke = pokeApiUrl + "api/v2/pokemon/" + IDGiven;

        $http({
            method: 'GET',
            url: pokeApiUrlPoke
        }).then(function successCallback(response) {
            console.log("LOG : CONTROLLER : Requête HTTP (information du pokémon) réussit avec succès.");
            $scope.poke = {
                "ID": response.data.id,
                "Nom": response.data.name,
                "XP": response.data.base_experience,
                "Taille": response.data.height,
                "Poids": response.data.weight
            };

            // Hide the loader p tag
            $("p#p_loader").hide();
        });
    }
}