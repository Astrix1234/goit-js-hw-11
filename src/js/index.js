'use strict';

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

let searchQuestion = '';
let currentPage = 1;

const fetchImages = async () => {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '38606414-d1218f221fd8daceb76c83e1a',
        q: searchQuestion,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: currentPage,
        per_page: 40,
      },
    });
    console.log('response:', response);
    if (response.data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      createImagesGallery(response.data.hits);
      Notiflix.Notify.success(
        `Hooray! We found ${response.data.totalHits} images.`
      );
      console.log(`Success, we found ${response.data.totalHits} images`);
      btnLoadMore.style.display = 'block';
    }
  } catch (error) {
    console.log('error:', error);
  }
};
console.log(fetchImages());

const createImagesGallery = images => {
  const markup = images
    .map(
      image => `<div class="photo-card">
  <a class="photo-card__link" href="${image.largeImageURL}"><img class="photo-card__image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${image.likes}
    </p>
    <p class="info-item">
      <b>Views</b>${image.views}
    </p>
    <p class="info-item">
      <b>Comments</b>${image.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${image.downloads}
    </p>
  </div>
</div>`
    )
    .join('');
  gallery.innerHTML = markup;
  console.log('Show gallery:', gallery);
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
};
