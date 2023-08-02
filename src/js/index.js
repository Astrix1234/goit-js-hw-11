'use strict';
console.log('Starting script');

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const catInfo = document.querySelector('.cat-info');
console.log('Cat info:', catInfo);
let select;
Notiflix.Loading.standard('Loading...', {
  backgroundColor: 'rgba(0,0,0,0.8)',
});

window.onload = () => {
  console.log('Window loaded');
  Notiflix.Loading.standard('Loading data, please wait...', {
    backgroundColor: 'rgba(0,0,0,0.8)',
  });
  fetchBreeds()
    .then(breeds => {
      Notiflix.Loading.remove();
      const breedSelect = document.querySelector('.breed-select');
      select = new SlimSelect({
        select: breedSelect,
        data: breeds.map(breed => ({
          text: breed.name,
          value: breed.id,
        })),
      });
      breedSelect.addEventListener('change', event => {
        console.log('onChange event', event);
        console.log('onChange event - selected value', event.target.value);
        displayCatInfo(event.target.value);
      });
      console.log('SlimSelect initialized: ', select);
      console.log('SlimSelect data: ', select.data.getData());
    })
    .catch(error => {
      Notiflix.Loading.remove();
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
};

function displayCatInfo(breedId) {
  console.log('About to fetch cat by breed');
  console.log('displayCatInfo', breedId);
  Notiflix.Loading.standard('Loading data, please wait...', {
    backgroundColor: 'rgba(0,0,0,0.8)',
  });
  fetchCatByBreed(breedId)
    .then(cat => {
      console.log('Fetched cat info', cat);
      Notiflix.Loading.remove();
      console.log(cat);
      catInfo.innerHTML = `
                <img src="${cat.url}" alt="${cat.breeds[0].name}">
    <div class="description">
        <h2>${cat.breeds[0].name}</h2>
        <p>${cat.breeds[0].description}</p>
        <p>${cat.breeds[0].temperament}</p>
    </div>
            `;
      console.log(catInfo);
    })
    .catch(error => {
      console.log(error.response);
      Notiflix.Loading.remove();
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}
