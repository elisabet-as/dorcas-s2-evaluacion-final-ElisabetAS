'use strict';

var searcherInput = document.querySelector('.searcher');
var searchButton = document.querySelector('.search');

function showList() {
  var searchedElement = searcherInput.value;

  fetch('http://api.tvmaze.com/search/shows?q=' + searchedElement)
    .then(function(response) {
      return response.json();
    })

    .then(function(json) {
      var result = json;
      console.log(result);
      for (var i = 0; i < result.length; i++) {
      result[i].show.name;
      result[i].show.image.medium;
      console.log(result[i].show.name);
      console.log(result[i].show.image.medium);
      }
    });
}




searchButton.addEventListener('click', showList);