import api from '../../../config/secret';
import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const key = api.API_KEY;
        const url = api.API_URL;
        const proxy = api.CORS_PROXY;
        const finalLink = `${proxy}${url}/api/search?key=${key}&q=${this.query}`;
        try {
            const res = await axios(finalLink);
            this.result = res.data.recipes;
        } catch (err) {
            console.log(err);
        }
    }
}