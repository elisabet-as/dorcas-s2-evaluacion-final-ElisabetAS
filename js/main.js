'use strict';
//Recojo los elementos del html
var searcherInput = document.querySelector('.searcher');
var searchButton = document.querySelector('.search');
var list = document.querySelector('.list');
var array = [];
var counter = 0;
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
      var getLocalArray = JSON.parse(localStorage.getItem('array'));
      //si no hay resultados frase auxiliar
      if (result.length === 0) {
        list.classList.add('notresult');
        list.innerHTML = ('No hay resultados que coincidan con esta búsqueda');
      }
      else {
        list.classList.remove('notresult');
      }
      for (var i = 0; i < result.length; i++) {
        var nameSerie = result[i].show.name;
        var imageSerie = result[i].show.image;
        var idSerie = result[i].show.id;
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
          tagImage.src = result[i].show.image.medium;
        }
        elementList.setAttribute('id', idSerie);


  //voy metiendo cada cosa dentro de otra
        titleSerieContainer.appendChild(titleSerie);
        elementList.appendChild(titleSerieContainer);
        elementList.appendChild(tagImage);
        list.appendChild(elementList);

        if (getLocalArray !== null) {
          for (var j = 0; j < getLocalArray.length; j++) {
            if (getLocalArray[j].id == result[i].show.id) {
              elementList.classList.add('favouriteSerie');
            }
          }
        }
      }
    });
}


function createObject(idSerie) {
  console.log(idSerie);
  var object = {};
  object.id = idSerie;
  console.log(object.id);
  saveObject(object);
}

function saveObject(obj) {
  array[counter] = obj;
  localStorage.setItem('array', JSON.stringify(array));
}

function favourite(event) {
  var addClass = event.currentTarget;
  console.dir(addClass);
  if (addClass.classList.contains('favouriteSerie')) {
    addClass.classList.remove('favouriteSerie');
    //addClass.classList.add('favouriteImage');
  }
  else {
    addClass.classList.add('favouriteSerie');
  }
  var id = addClass.id;
  createObject(id);
  counter++;
}


searchButton.addEventListener('click', showList);
