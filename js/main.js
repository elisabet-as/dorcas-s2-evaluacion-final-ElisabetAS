'use strict';
//Recojo los elementos del html
var searcherInput = document.querySelector('.searcher');
var searchButton = document.querySelector('.search');
var list = document.querySelector('.list');

//funcion para mostrar una lista de series
function showList() {
  //recojo el valor del input
  var searchedElement = searcherInput.value;
  //limpio la búsqueda anterior
  list.innerHTML = '';
  //Accedo a la búsqueda del input mediante la api
  fetch('http://api.tvmaze.com/search/shows?q=' + searchedElement)
    .then(function(response) {
      return response.json();
    })
  //recojo el array y lo recorro para recoger el nombre y la imagen de cada objeto (serie)
    .then(function(json) {
      var result = json;
      for (var i = 0; i < result.length; i++) {
        var nameSerie = result[i].show.name;
        var imageSerie = result[i].show.image;

        //creo etiquetas para la lista, el titulo y la imagen de la serie y lo meto en la lista del html
        var elementList = document.createElement('li');
        var titleSerieContainer = document.createElement('h2');
        var titleSerie = document.createTextNode(nameSerie);
        //añado una etiqueta img y a esta le añado un atributo src
        var tagImage = document.createElement('img');
        tagImage.setAttribute('src', imageSerie);

        //creo un condicional para que las series que no tengan imagen adquieran la imagen de placeholder
        if (imageSerie === null) {
          tagImage.src = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
        }
        else {
          tagImage.src = result[i].show.image.medium;
        }

        //voy metiendo cada cosa dentro de otra
        titleSerieContainer.appendChild(titleSerie);
        elementList.appendChild(titleSerie);
        elementList.appendChild(tagImage);
        list.appendChild(elementList);
        console.log(list);
      }
    });
}

searchButton.addEventListener('click', showList);
