var pokeApp = angular.module('pokedex', ['ngResource']);

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

// The URL to access to the API providing the Pokemon list
var pokeApiUrl = "http://pokeapi.co/";

// Hide the loader p tag
$loader = $('p#p_loader');
$loader.hide();


// -------------------------------------------------
// Services
// -------------------------------------------------
pokeApp.service('getPokemonInfoSrv', function($q, $http){

    this.getPoke = function(IDGiven)
    {
        // Need to be there ... Why ? Gooq question ..
        var promise = null;

        // URI to get the information about the pokemon
        var pokeApiUrlPoke = pokeApiUrl + "api/v2/pokemon/" + IDGiven;

        // Get request
        $http({
            method: 'GET',
            url: pokeApiUrlPoke
        }).then(function successCallback(response) {
            console.log("LOG : CONTROLLER : Requête HTTP (information du pokémon) réussit avec succès.");
            console.log(JSON.stringify(response));
            promise = response.data;
        });

        // Return data
        return promise;
    };
});


// -------------------------------------------------
// Controllers
// -------------------------------------------------
pokeApp.controller('SearchCtrl', function( $scope, $http, getPokemonInfoSrv )
{
    // Show the loader p tag
    var $loader = $('p#p_loader');
    $loader.show();

    // Clean the ID field if not empty (just to be sure)
    var $inputIDField = $("input#id");
    $inputIDField.val('');

    var pokeApiUrlListTotal = pokeApiUrl + "api/v2/pokedex/1/";
    console.log("LOG : CONTROLLER : URL fournissant la liste des pokémons : " + pokeApiUrlListTotal);

    // GET request
    $http({
        method: 'GET',
        url: pokeApiUrlListTotal
    }).then(function successCallback(response) {
        console.log("LOG : CONTROLLER : ILS ARRIVENNT !! - Qui ça ? - LES POKÉMOOOOOONS !");
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
            var $loader = $('p#p_loader');
            $loader.show();

            // Call to the factory
            $scope.poke = getPokemonInfoSrv.getPoke(IDGiven);


            //$scope.poke = function(IDGiven)
            //{
            //    console.log("Je suis à l'entrée de la fonction de récup");
            //    // Call the async method and then do stuff with what is returned inside our own then function
            //    getPokemonInfo.async(IDGiven).then(function(d) {
            //        $scope.data = d;
            //    });
            //};

            // Hide the loader p tag
            $loader.hide();
        }
        else
        {
            alert("Si tu essayes d'avoir les infos d'un Pokémon sans dire lequel (dans le champ ID), ça ne va pas être évident ... Essaye encore ^-^")
        }
    }
});