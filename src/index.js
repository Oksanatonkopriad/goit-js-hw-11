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

    fetchImages.query = e.currentTarget.elements.searchQuery.value.trim();
    fetchImages.resetPage();
    fetchImages.fetchArticles().then(articles => console.log(articles));
    
    
}

function onLoadMore() {
  fetchImages.fetchArticles().then(articles => console.log(articles));
}

