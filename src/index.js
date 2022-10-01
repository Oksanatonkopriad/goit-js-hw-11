import getRefs from "./js/getRefs";
import fetchImages from './js/fetch-images';
import getRefs from "./js/getRefs";
import { Notify } from 'notiflix';
import cardTemplate from './templates/card-template.hbs';

const refs = getRefs();

refs.searchForm.addEventListener(`submit`, onSearchForm);
// console.log(refs.searchForm);

let currentPage = 1;
let currentHits = 0;
let searchQuery = '';

async function onSearchForm(e) {
    e.preventDefault();
    searchQuery = e.currentTarget.elements.searchQuery.value;
    currentPage = 1;

    if (searchQuery === '') {
        return;
    }

    const response = await fetchImages(searchQuery, currentPage);
    currentHits = response.hits.length;

    if (response.totalHits > 40) {
        refs.moreBtn.classList.remove('is-hidden');
    } else {
        refs.moreBtn.classList.add('is-hidden');
    };
    try {
        if (response.totalHits === 0) {
        refs.imageGallery.innerHTML = '';
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        refs.moreBtn.classList.add('is-hidden');
        refs.endCollectionText.add('is-hidden');
    } 
     } catch (error) {
        console.log(error);
    };
};

function renderCardImage(e) {
    const markup = e.map(item => cardTemplate(item)).join('');
    refs.imageGallery.insertAdjacentHTML('beforeend', markup);
}