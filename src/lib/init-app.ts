import axios from "axios";

const initializeApp = () => {
    // Setting base URL for all API requests via axios
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_APP_BASE_URL;

    console.log("Initializing app...");

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // Development code
        console.log("Running in development mode");

        // Optionally set up interceptors for debugging
        axios.interceptors.request.use((config) => {
            console.log(`Request made to: ${config.url} with data:`, config.data);
            return config;
        }, (error) => {
            console.error("Error in request:", error);
            return Promise.reject(error);
        });
    } else {
        // Production build code
        console.log("Running in production mode");

        // Removing console.log from production
        console.log = () => { };

        // Initialize analytics here (for example, Google Analytics)
        initAnalytics();
    }
};

// Function to initialize analytics (replace with actual implementation)
const initAnalytics = () => {
    // Example: Initialize Google Analytics
    // window.ga = window.ga || function() { (ga.q = ga.q || []).push(arguments); };
    // ga.l = +new Date;
    // ga('create', 'YOUR_TRACKING_ID', 'auto');
    // ga('send', 'pageview');
};

export default initializeApp;