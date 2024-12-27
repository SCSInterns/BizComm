// index.js (or your root component)
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; // Import Provider
import { createStore } from "redux"; // Import createStore
import rootReducer from "../src/components/reducers"; // Import your root reducer
import { FileProvider } from "./contexts/FileContext";
import App from "./App"; // Your root component
import axios from "axios";
import { ToastContainer } from "react-toastify";

// Create Redux store
const store = createStore(rootReducer);

// axios.defaults.baseURL = "https://largely-touching-lab.ngrok-free.app";
axios.defaults.baseURL = "http://localhost:5000";
// axios.defaults.baseURL = "https://ae1f-223-178-103-231.ngrok-free.app";
axios.defaults.headers.common["ngrok-skip-browser-warning"] = true;
axios.interceptors.request.use(
	(config) => {
		config.headers["Authorization"] = `Bearer ${localStorage.getItem(
			"access_token"
		)}`;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Wrap your root component with Provider and pass the Redux store
ReactDOM.render(
	<Provider store={store}>
		<FileProvider>
			<App />
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
			/>
		</FileProvider>
	</Provider>,
	document.getElementById("root")
);
