import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

const newsAPI = axios.create({
    baseURL: 'https://api.nytimes.com/svc/search/v2/',
    params: {
        'api-key': API_KEY,
    },
});

export const fetchArticles = async (query) => {
    try {
        const response = await newsAPI.get('articlesearch.json', {
            params: {
                q: query,
                sort: 'newest',
            },
        });
        return response.data.response.docs;
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;
        
    }
};
