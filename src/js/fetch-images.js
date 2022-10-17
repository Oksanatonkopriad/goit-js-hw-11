import axios from "axios";

const axios = require('axios');

export default class FetchImages {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.per_page = 40;
    }

    async fetchArticles() {
    const key = '14595272-b438f74d87c5b1f828750b62e';
    const url = 'https://pixabay.com/api/';
        const response = await axios.get(`${url}`, {
            params: {
                key: key,
                q: this.searchQuery,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                per_page: this.per_page,
                page: this.page,
            }
        });
        return response.data;
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

