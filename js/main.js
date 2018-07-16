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
  fetch('http://api.tvmaze.com/search/people?q=' + searchedElement)
    .then(function(response) {
      return response.json();
    })
  //recojo el array y lo recorro para recoger el nombre y la imagen de cada objeto (serie)
    .then(function(json) {
      var result = json;
      console.log(result);
      //si no hay resultados frase auxiliar
      if (result.length === 0) {
        list.classList.add('notresult');
        list.innerHTML = ('No hay resultados que coincidan con esta búsqueda');
      }
      else {
        list.classList.remove('notresult');
      }
      for (var i = 0; i < result.length; i++) {
        var nameSerie = result[i].person.name;
        var imageSerie = result[i].person.image;
  //creo etiquetas para la lista, el titulo y la imagen de la serie y lo meto en la lista del html
        var elementList = document.createElement('li');
        elementList.classList.add('list--item');

        var titleSerieContainer = document.createElement('h2');
        var titleSerie = document.createTextNode(nameSerie);
        titleSerieContainer.classList.add('subtitles');
  //creo el evento para hacerlos favoritos
        elementList.addEventListener('click', favourite);
  //añado una etiqueta img y a esta le añado un atributo src
        var tagImage = document.createElement('img');
        tagImage.setAttribute('src', imageSerie);
  //creo un condicional para que las series que no tengan imagen adquieran la imagen de placeholder
        if (imageSerie === null) {
          tagImage.src = 'https://via.placeholder.com/210x295/cccccc/666666/?text=No image';
        }
        else {
          tagImage.src = result[i].person.image.medium;
        }
  //voy metiendo cada cosa dentro de otra
        titleSerieContainer.appendChild(titleSerie);
        elementList.appendChild(titleSerieContainer);
        elementList.appendChild(tagImage);
        list.appendChild(elementList);
      }
      var textResultsNumber = document.querySelector('.results--number');
      textResultsNumber.innerHTML = 'Hay ' + result.length + ' resultados para la búsqueda ' + searchedElement;
    });
}

function favourite(event) {
  var addClass = event.currentTarget;
  if (addClass.classList.contains('favouriteSerie')) {
    addClass.classList.remove('favouriteSerie');
    //addClass.classList.add('favouriteImage');
  }
  else {
    addClass.classList.add('favouriteSerie');
  }
}



searchButton.addEventListener('click', showList);
