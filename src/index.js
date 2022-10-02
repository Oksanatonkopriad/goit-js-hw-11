import getRefs from "./js/getRefs";
import fetchImages from './js/fetch-images';
import getRefs from "./js/getRefs";
import { Notify } from 'notiflix';
import cardTemplate from './templates/card-template.hbs';

const refs = getRefs();

refs.searchForm.addEventListener(`submit`, onSearchForm);