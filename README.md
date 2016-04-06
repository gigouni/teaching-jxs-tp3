# Pokédex & AngularJS

![Pokémons](http://i.imgur.com/oJkBNgX.jpg "Let's find them all !")

Ce TP a été réalisé par le binôme Quentin LAGADEC et Nicolas GIGOU dans le cadre des TP du cours de SIR. L'objectif de ce projet était de développer un pokédex en AngularJS en récupérant les informations nécessaires via l'API du site Pokeapi.co.

*Les paragraphes suivants permettent une meilleure compréhension de ce qui a été demandé pendant le TP. Suite à la motivation ressentie par le binôme vis-à-vis du sujet, certains éléments non demandés ont été rajoutés et d'autres retirés au fur et à mesure du développement pour améliorer le design de l'application ou pour nettoyer le code de fonctionnalités inutiles. Afin de profiter pleinement de l'expérience, nous vous proposons de tirer le projet en lançant la commande :*

                                   `$ git clone https://github.com/gigouni/teaching-jxs-tp3.git`

## Fonctionnement de l'application

![Fonctionnement](http://vamers.com/wp-content/uploads/2013/10/Vamers-Gaming-Pokemon-X-Y-Laungh-Trailer-Pokemon-Mega-Evolutions-Banner.jpg "How does it work ?")

Lors de l'arrivée sur la page d'accueil de l'application, un message apparaît afin de prévenir l'utilisateur qu'une requête est en cours (celle qui récupère la liste de tous les pokémons). Une fois la requête terminée, le message disparaît. Vous verrez un champ texte au centre de l'image vous permettant de saisir le nom ou l'ID du pokémon qui vous intéresse si toutefois vous le connaissez. Si vous n'êtes pas sûr de son nom ou si vous voulez vérifier avant de lancer une recherche, utilisez le filtre dans le bandeau supérieur. 

Toute saisie effectuée dans le champ "Filtre" lancera une requête pour récupérer la liste des pokémons correspondant à votre recherche, que ça soit en se basant sur le nom ou sur le numéro. Une fois que votre pokémon apparaît dans la liste à droite du champ texte, sélectionnez le et son nom ira directement se rajouter au champ texte du centre de l'image. La requête se lancera également automatiquement.

## Évolutions du pokédex

![Pokédex](https://lh6.googleusercontent.com/-rXlgsy3Pkis/UzWZdcE14LI/AAAAAAAAE1M/XaCcIJJ3otI/w650-h200-no/pokedex+project+banner3.png "Evolution of the Pokedex")

### Recherche d'un pokémon via son numéro
#### Q1. Définition d'une balise `<input>`

```html
<form>
    <div class="form-group col-xs-4">
        <input ng-model="id" name="id" class="form-control input-md" id="id" placeholder="ID du pokémon">
    </div>
</form>
```

#### Q2. Affichage de la valeur de l'ID dans la balise `<input>` précédente

```html
<div class="col-xs-4">
    <pre>Identifiant renseigné = <span ng-bind="id"></span></pre>
</div>
```

### Recherche dans une liste
#### Q3. Création d'un contrôleur et appel depuis la vue

Dans le contrôleur

```javascript
function SearchController($scope, $http)
 {
     // Nouveau controleur
 }
```

et dans la vue

```html
<div class="row">
  Liste des pokémons donnée par l'API :
  <select ng-controller="SearchCtrl">
    <option ng-repeat="pokemon in pokemons" value="{{pokemon.name}}">{{pokemon.name}}</option>
  </select>
</div> <!-- end .row -->
```

#### Q4. Ajout manuel d'une variable contenant une liste de pokémons et à injecter dans le $scope

Il y a eu une mauvaise lecture de ma part à ce moment du projet. Je pensais qu'il fallait faire appel directement à l'API. 

```javascript
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
```

Or en les entrant en dur, nous aurions eu quelque chose sous la forme ...

```javascript
function SearchController($scope, $http)
 {
    $scope.pokemons = [ {objet_pokemon_1}, {objet_pokemon_2}, {objet_pokemon_3}, {objet_pokemon_4}, {objet_pokemon_5} ]
 }
```

#### Q5. Affichage de la liste des pokémons entrés manuellement

Contenu à venir ...

#### Q6. Récupération du choix du dresseur en liant la balise `<select>` au modèle *ng-model*

Contenu à venir ...

#### Q7. Ajout d'un filtre

Contenu à venir ...

#### Q8. Ajout d'un bouton à la page

Contenu à venir ...

#### Q9. Tester la recherche fonctionnelle en logant le nom du pokémon recherché

Contenu à venir ...


### Accès à une API
#### Q10. Récupération de la liste exhaustive des pokémons via l'API

Contenu à venir ...

#### Q11. Création d'un service $resource pour accéder aux informations d'un pokémon

Contenu à venir ...

#### Q12. Création d'un nouveau contrôleur pour l'affichage des informations concernant un pokémon

Contenu à venir ...


### Communication entre contrôleurs
#### Q13. Création d'un service contenant le nom et l'ID du pokémon

Contenu à venir ...

#### Q14. Utilisation du service $watch pour mettre à jour l'affichage

Contenu à venir ...


### Création d'une directive
#### Q15. Création d'une directive de référence de vues

Contenu à venir ...

#### Q16. Ajout des sprites des pokémons

Contenu à venir ...
