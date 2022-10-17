import getRefs from "./js/getRefs";
import FetchImages from './js/fetch-images';
import { Notify } from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import './css/styles.css';
// import cardTemplate from './templates/card-template.hbs';

const refs = getRefs();
const fetchImages = new FetchImages();
let totalPages = 0;

refs.searchForm.addEventListener(`submit`, onSearchForm);
refs.moreBtn.addEventListener(`click`, onLoadMore);


async function onSearchForm(e) {
  e.preventDefault();
  clearGallery();
  totalPages = 0;
  fetchImages.form = e.currentTarget;
  fetchImages.query = e.currentTarget.elements.searchQuery.value.trim();
  fetchImages.resetPage();

  if (fetchImages.query === '') {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    btnHidden();
    return;
  }

  fetchImages
    .fetchArticles()
    .then(({ hits, totalHits }) => {
      if (hits.length === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        btnHidden();
        return;
      }
      appendHitsMarkup(hits);
      Notify.success(`Hooray! We found ${totalHits} images.`);
      btnVisible();
      simpleLightBox.refresh();
      totalPages = Math.ceil(totalHits / 40);

      if (fetchImages.page === totalPages) {
        Notify.info('We re sorry, but you have reached the end of search results.');
        btnHidden();
      }
    })
    .catch()
    .finally(() => e.target.reset());
}


function btnHidden() {
  refs.moreBtn.classList.add('is-hidden');
}

function btnVisible() {
  refs.moreBtn.classList.remove('is-hidden');
}

function clearGallery() {
  refs.imageGallery.innerHTML = '';
}
function appendHitsMarkup(elements) {
  const markup = elements.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
    return `<div class="photo-card">
  <a href='${largeImageURL}'>
    <img src='${webformatURL}' alt='${tags}' loading="lazy" />
    </a>
    
    <div class="info">
    <p class="info-item">
    <b>Likes:  ${likes}</b>
    </p>
    <p class="info-item">
    <b>Views: ${views}</b>
    </p>
    <p class="info-item">
    <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
    <b>Downloads: ${downloads}</b>
    </p>
    </div>
    </div>`;
  }).join('');
  refs.imageGallery.insertAdjacentHTML('beforeend', markup);
  let simpleLightBox = new SimpleLightbox('.photo-card a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  });
}

function onLoadMore() {
  fetchImages.nextPage();
  fetchImages.fetchArticles()
    .then(({ hits, totalHits }) => {
      console.log(totalHits);
      appendHitsMarkup(hits);
      simpleLightBox.refresh();

      if (fetchImages.page === totalPages) {
        btnHidden();
        Notify.failure(`We're sorry, but you've reached the end of search results`);
      }
    })
    .catch(error => console.log(error));