import React from 'react'
import axios from 'axios';
import queryString from 'query-string';

const baseURL = "https://127.0.0.1:5050/api/v1";

const publicClient = axios.create({
    baseURL,
    paramsSerializer: {
        encode: params => queryString.stringify(params)
    }
});

publicClient.interceptors.request(async config => {
    return {
        ...config,
        headers: {
            ...config.headers,
            'Content-Type': 'application/json'
        }
    }
});

publicClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    throw error.response.data;
});

export default publicClient;