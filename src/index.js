import getRefs from "./js/getRefs";
import FetchImages from './js/fetch-images';
import { Notify } from 'notiflix';
// import cardTemplate from './templates/card-template.hbs';

const refs = getRefs();

refs.searchForm.addEventListener(`submit`, onSearchForm);
refs.moreBtn.addEventListener(`click`, onLoadMore);

const fetchImages = new FetchImages();

function onSearchForm(e) {
  e.preventDefault();
  
  clearGallery();
  fetchImages.query = e.currentTarget.elements.searchQuery.value.trim();
  fetchImages.resetPage();
  if (fetchImages.query === '') {
    refs.moreBtn.disable();
    return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }

  fetchImages.fetchArticles().then(appendHitsMarkup);
  
  // const response = await fetchImages(query, page)
  e.target.reset();
}

function onLoadMore() {
  fetchImages.fetchArticles().then(appendHitsMarkup);
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
function appendHitsMarkup(hits) {
  const markup = hits.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
    return `<div class="photo-card">
  <a href='${largeImageURL}'>
    <img src='${webformatURL}' alt='${tags}' loading="lazy" width="480" />
  </a>
  
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
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
</div>`
  }).join('');
  refs.imageGallery.insertAdjacentHTML('beforeend', markup);
}