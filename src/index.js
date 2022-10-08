import getRefs from "./js/getRefs";
import FetchImages from './js/fetch-images';
import { Notify } from 'notiflix';
import cardTemplate from './templates/card-template.hbs';

const refs = getRefs();

refs.searchForm.addEventListener(`submit`, onSearchForm);
refs.moreBtn.addEventListener(`click`, onLoadMore);

const fetchImages = new FetchImages();

function onSearchForm(e) {
    e.preventDefault();

  clearGallery();
    fetchImages.query = e.currentTarget.elements.searchQuery.value.trim();
    fetchImages.resetPage();
    fetchImages.fetchArticles().then(appendHitsMarkup);
    
    
}

function onLoadMore() {
  fetchImages.fetchArticles().then(appendHitsMarkup);
}

function appendHitsMarkup(hits) {
  const markup = hits.map(item => cardTemplate(item)).join('');
  refs.imageGallery.insertAdjacentHTML('beforeend', markup);
}

function clearGallery() {
  refs.imageGallery.innerHTML = '';
}