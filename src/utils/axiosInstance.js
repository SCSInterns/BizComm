import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api', // Ensure this matches your backend URL
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor to include the token in every request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (!error.response) {
            // Network error
            console.error('Network error:', error.message);
            // Optionally, notify the user about the network issue
        } else {
            // Handle specific HTTP errors
            const { status, data } = error.response;
            if (status === 401) {
                console.error('Unauthorized access - possibly due to invalid or expired token');
                // Optionally, remove the token and redirect to the login page
                localStorage.removeItem('token');
                window.location.href = '/login';
            } else if (status === 404) {
                console.error('Resource not found:', data);
                // Handle 404 errors gracefully, maybe redirect or display a message
            } else if (status >= 500) {
                console.error('Server error:', data);
                // Handle server errors (500+)
            } else {
                console.error('HTTP error:', data);
                // Handle other HTTP errors with appropriate messages or actions
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
