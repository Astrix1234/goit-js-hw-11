'use strict';
console.log('Starting script');
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import axios from 'axios';

import 'notiflix/dist/notiflix-3.2.6.min.css';

axios.defaults.headers.common['x-api-key'] =
  'live_3lTUbnsiQLqLHwor1OkURf0BxrWKldmY8O4eLcJhAwpw3fGyOnoPU2CwsNDvABgI';

function fetchBreeds() {
  console.log('fetchBreeds called');
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      console.log('axios get completed', response.data);
      return response.data;
    })
    .catch(error => {
      console.log('fetchBreeds error', error.response);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      throw error;
    });
}

function fetchCatByBreed(breedId) {
  console.log('displayCatInfo', breedId);
  console.log(`Fetching cat for breed: ${breedId}`);
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0])
    .catch(error => {
      console.log('fetchCatByBreed error', error.response);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      throw error;
    });
}

export { fetchBreeds, fetchCatByBreed };
