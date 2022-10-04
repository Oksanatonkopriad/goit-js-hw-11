import axios from "axios";

const axios = require('axios');

export default class FetchImages {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.per_page = 40;
    }

    fetchArticles() {
    const options = {
    headers: {
        Authorization: '14595272-b438f74d87c5b1f828750b62e',
    },
};
    const url =
        `https://pixabay.com/api/everything?q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

return fetch(url, options)
    .then(r => r.json())
    .then(data => {
        this.nextPage();
        return data.articles;
    });
    }

    nextPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}

