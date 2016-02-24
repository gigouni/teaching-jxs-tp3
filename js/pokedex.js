var pokeApp = angular.module('pokedex', ['ngResource']);

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

// The URL to access to the API providing the Pokemon list
var pokeApiUrl = "http://pokeapi.co/";

// Hide the loader p tag
$loader = $("p#p_loader");
$loader.hide();


// -------------------------------------------------
// Factories
// -------------------------------------------------
pokeApp.factory('getPokemonInfo', function($http)
{
    // URI to get the information about the pokemon
    /*var pokeApiUrlPoke = pokeApiUrl + "api/v2/pokemon/" + IDGiven;

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
     });
     */

    console.log("Je suis dans la fonction de récup");

    var promise;
    return {
        async: function(IDGiven) {
            if ( !promise ) {
                // URL too access to the entity
                var pokeApiUrlPoke = pokeApiUrl + "api/v2/pokemon/" + IDGiven;
                // $http returns a promise, which has a then function, which also returns a promise
                promise = $http.get(pokeApiUrlPoke).then(function successCallback(response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response;
                });
            }
            // Return the promise to the controller
            return promise;
        }
    };
    // return getPokemonInfo;
});


// -------------------------------------------------
// Controllers
// -------------------------------------------------
pokeApp.controller('SearchCtrl', function( $scope, $http, getPokemonInfo )
{
    // Show the loader p tag
    // var $loader = $("p#p_loader");
    $loader.show();

    console.log("LOG : CONTROLLER : Controller SearchController et logs OK");

    var pokeApiUrlListTotal = pokeApiUrl + "api/v2/pokedex/1/";
    console.log("LOG : CONTROLLER : URL fournissant la liste des pokémons : " + pokeApiUrlListTotal);

    // GET request
    $http({
        method: 'GET',
        url: pokeApiUrlListTotal

    }).then(function successCallback(response) {
        console.log("LOG : CONTROLLER : Requête HTTP (liste des pokémons) réussit avec succès.");
        // console.log("Avec : " + JSON.stringify(response.data.pokemon_entries));
        $scope.data = {
            // To display the name of the selected pokemon
            selectedPoke: null,
            // To provide the list of pokemons
            pokemons: response.data.pokemon_entries
        };

        // Hide the loader p tag
        $loader.hide();

    });

    $scope.onChangeOption = function () {

        // Get the value of the ID of the Pokemon
        var optionSelected = $("select#pokemonList option:selected").val();

        // Append this value in the ID input
        $("input#id").val(optionSelected);

    };

    $scope.go = function () {

        // Get the ID given by the user (JQuery Powaaa)
        var IDGiven = $('input#id').val();
        console.log("Valeur de l'identifiant choisi : " + IDGiven);

        if( IDGiven.length > 0 )
        {
            // Show the loader p tag
            // var $loader = $('p#p_loader');
            $loader.show();

            console.log("Loader affiché, lancement de la requete de récupération d'informations");

            // Call to the factory
            $scope.poke = function(IDGiven)
            {

                console.log("Je suis à l'entrée de la fonction de récup");
                // Call the async method and then do stuff with what is returned inside our own then function
                getPokemonInfo.async(IDGiven).then(function(d) {
                    $scope.data = d;
                });
            };

            // Hide the loader p tag
            // $("p#p_loader").hide();
            $loader.hide();
        }
        else
        {
            alert("Si tu essayes d'avoir les infos d'un Pokémon sans dire lequel (dans le champ ID), ça ne va pas être évident ... Essaye encore ^-^")
        }
    }
});