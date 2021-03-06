var pokeApp = angular.module('pokedex', []);

// -------------------------------------------------
// Directives
// -------------------------------------------------
pokeApp.directive('navbar', function() {
    return { templateUrl: 'templates/navbar.html' };
});


// -------------------------------------------------
// Utilities
// -------------------------------------------------

// The URL to access to the API providing the Pokemon list
var pokeApiUrl = "http://pokeapi.co/";

// The loader p tag
var $loader = $('p#p_loader');

// The input ID field
var $inputIDField = $("input#id");

// The div which contains the information concerning the selected Pokemon
var pokeInfoResult = $("#pokeInfoResult");

// Conversion to have french data
function getRealWeight(weight) { return weight / 10; }
function getRealHeight(height) { return height * 10; }


// -------------------------------------------------
// Services
// -------------------------------------------------
pokeApp.service('getPokemonInfoSrv', function($http, $q)
{
    this.getPoke = function( IDGiven )
    {
        // URI to get the information about the pokemon
        var pokeApiUrlPoke = pokeApiUrl + "api/v2/pokemon/" + IDGiven;

        // The defer function is usefull to have synchronous results
        var deferred = $q.defer();
        $http
            .get(pokeApiUrlPoke)
            .success( function( response, status, headers, config )
            {
                deferred.resolve(response, status, headers, config);
            })
            .error(function (response, status, headers, config) {
                deferred.reject(response, status, headers, config);
            });

        return deferred.promise;
    }
});


// -------------------------------------------------
// Controllers
// -------------------------------------------------
pokeApp.controller('SearchCtrl', function( $scope, $http, $log, getPokemonInfoSrv )
{
    // Clear the ID field if not empty (just to be sure)
    $inputIDField.val('');

    // Hide the useless div by default - Clean the interface
    pokeInfoResult.hide();

    // Disable the Go button
    $("#btn_go").addClass("disabled");

    var pokeApiUrlListTotal = pokeApiUrl + "api/v2/pokedex/1/";
    $log.log("LOG : CONTROLLER : URL fournissant la liste des pokémons : " + pokeApiUrlListTotal);

    // Get the list of all the Pokemons
    $http({
        method: 'GET',
        url: pokeApiUrlListTotal
    }).then(function successCallback(response)
    {
        $log.log("LOG : CONTROLLER : ILS ARRIVENNT !! - Qui ça ? - LES POKÉMOOOOOONS !");
        $scope.data = {
            // To display the name of the selected pokemon
            selectedPoke: null,
            // To provide the list of pokemons
            pokemons: response.data.pokemon_entries
        };

        // Hide the loader
        $loader.hide();

        // Enable the Go button
        $("#btn_go").removeClass("disabled");
    });

    // Clear the filter input after a click on the cross - Hide the cross after
    $scope.clear = function() {

        // Empty the input content
        $("input#filter").val('');
        $("span#clear").addClass("hidden");

    };

    // Display the cross if there is something erasable
    $scope.displayTheCross = function() {

        console.log("log appel");

        // If the filter field is not empty
        if( $("input#filter").val().length > 0 )
        {
            // Show the cross
            $("span#clear").removeClass("hidden");
        }

    };

    // Change the value into the input ID field by the new selected one
    $scope.onChangeOption = function () {

        // Get the value of the ID of the Pokemon
        var optionSelected = $("select#pokemonList option:selected").val();

        // Append this value in the ID input
        $inputIDField.val(optionSelected);

        // Search the information concerning the new Pokemon
        // Equivalent of the watch service
        $scope.go();

    };


    // Run a search in the database about a Pokemon in particular
    $scope.go = function () {

        // Hide the div containing the result
        // Hide it at the beginning of each request and show it when the request is ok
        pokeInfoResult.hide();

        // Get the ID given by the user (JQuery Powaaa)
        var IDGiven = $inputIDField.val();
        $log.info("INFO : CONTROLLER : Vous avez choisi " + IDGiven + "? Allons l'attraper en base alors !");

        if( IDGiven.length > 0 )
        {
            // Disable the Go button
            $("#btn_go").addClass("disabled");

            // Show the loader
            $loader.show();

            // Call to the service
            this.getPoke = getPokemonInfoSrv
                .getPoke(IDGiven)
                .then(function (response) {

                    // Log it
                    $log.log("LOG : CONTROLLER : GO : Informations récupérées.");

                    // Hide the loader
                    $loader.hide();

                    // Show the div containing the result
                    pokeInfoResult.show();

                    // Return data
                    return $scope.poke = {
                        "ID": response.id + " ème Pokémon de votre Pokédex préféré !",
                        "Nom": response.name,
                        "XP": response.base_experience + " points d'expérience",
                        "Taille": getRealHeight(response.height) + " cm",
                        "Poids": getRealWeight(response.weight) + " kilogrammes"
                    };
                })
                .catch(function (response) {
                    $log.error("ERROR : CONTROLLER : GO : Ta MasterBall a échouée et t'a envoyée un message : " + JSON.stringify(response));

                    return $scope.poke = {
                        "Error": "Erreur lors de la récupération des informations. Consultez les logs pour plus d'informations (CTRL + MAJ + I)"
                    };
                });

            // Enable the Go button
            $("#btn_go").removeClass("disabled");
        }
        else
        {
            alert("Si tu essayes d'avoir les infos d'un Pokémon sans dire lequel (dans le champ ID), ça ne va pas être évident ... Essaye encore ^-^")
        }
    };
});
