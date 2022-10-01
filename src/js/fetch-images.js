import axios from "axios";

const axios = require('axios');

export default async function fetchImages(value, page) {
    const url = 'https://pixabay.com/api/';
    const key = '14595272-b438f74d87c5b1f828750b62e';
    const filter = `?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per-page=40&page=${page}`;

    return await axios.get(`${url}${filter}`)
        .then(response => response.data);

}