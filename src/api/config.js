import axios from "axios";
import { adminLocalStorage } from "./localService";
import { store } from "../redux/store";
import { SET_LOADING_OFF, SET_LOADING_ON } from "../redux/constant/spinner";

// Environment Variables
export const TOKEN_CYBER = import.meta.env.VITE_TOKEN_CYBERSOFT;
export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const BASE_URL_2 = import.meta.env.VITE_BASE_URL_2;
export const MA_NHOM = "GP04";

// Access Token
const accessToken = adminLocalStorage.get()?.accessToken;

// Configuration for headers
export const configHeaders = () => ({
  TokenCybersoft: TOKEN_CYBER,
});

// Axios instance with loading
export const https = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    TokenCybersoft: TOKEN_CYBER,
  },
});

// Axios instance without loading (No Loading Spinner)
export const httpsNoLoading = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    TokenCybersoft: TOKEN_CYBER,
  },
});

// Axios Interceptors for Loading State
https.interceptors.request.use(
  (config) => {
    store.dispatch({ type: SET_LOADING_ON }); // Trigger loading spinner
    return config;
  },
  (error) => {
    store.dispatch({ type: SET_LOADING_OFF }); // Stop loading spinner on error
    return Promise.reject(error);
  }
);

https.interceptors.response.use(
  (response) => {
    store.dispatch({ type: SET_LOADING_OFF }); // Stop loading spinner on success
    return response;
  },
  (error) => {
    store.dispatch({ type: SET_LOADING_OFF }); // Stop loading spinner on error
    return Promise.reject(error);
  }
);
