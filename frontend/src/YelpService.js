import axios from 'axios';

const apiKey = 'Ubf1-f0uqsJUnssqPMGo-tiFeZTT85oFmKfznlPmjDtX8s83jYMoAb-ApuD63wgq6LDZNsUXG6gurZIVYaj2jzxJmmLdCdXbDqIHU_b6KiCEVi8v-YB0OSsW6MWaY3Yx'; // Replace with your Yelp API key

const apiClient = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/',
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
});

export default {
    /**
     * Api to call all categories data
     * @param {*} term 
     * @param {*} location 
     * @returns 
     */
    getCategories() {
        return apiClient.get('/categories', {
            params: {
            },
        });
    },

    searchBusinesses(params = {
        term: '',
        location: '',
        limit: 20,
        offset: 0
    }) {
        return apiClient.get('/businesses/search', {
            params: {
                term: params.term,
                location: params.location,
                limit: params.limit,
                offset: params.offset,
            },
        });
    },

    getBusinessDetail(alias) {
        return apiClient.get(`/businesses/${alias}`, {
            params: {
            },
        });
    },

    getBusinessReviews(alias) {
      return apiClient.get(`/businesses/${alias}/reviews`, {
          params: {
          },
      });
  },
};