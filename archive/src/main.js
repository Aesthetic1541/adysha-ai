import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true

// intercept each response and check for token expiration
const myInterceptor = axios.interceptors.response.use(
  response => response,
  async error => {
    // grab the original failed request config 
    const originalRequest = error.config;
    console.log("Error response:", error.response);

    // if the error is due to expired token, refresh the token and retry the request
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.msg === "Token has expired" &&
      !originalRequest._retry
    ) {
      console.log("Token expired. Refreshing token...");

      // to avoid loop if the refresh itself fails
      originalRequest._retry = true;

      // refresh the token
      try {
        await axios.post("/api/auth/refresh", {}, { withCredentials: true });
        console.log("Refreshed token successfully");

        // retry the original request
        return axios(originalRequest);
      } catch (err) {
        console.error("Failed to refresh token.", err);

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);

  }
)


createApp(App)
  .use(router)
  .mount('#app')