import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./components/store";
import "./App.css";
import Services from "./pages/services";
import About from "./pages/about";
import Home from "./pages/Home";
import AddContact from "./pages/feature/addcontact";
import HistoryPage from "./pages/historypage";
import UploadPage from "./pages/uploadpage";
import LogoutSection from "./pages/logoutsection";
import ForgotPasswordPage from "./pages/forgetpage";
import ProtectedRoute from "./ProtectedRoute";
import { FileProvider } from "./contexts/FileContext";
import ResetPasswordPage from "./pages/resetPasswordPage";
import axios from "axios";
import AddClientForm from "./pages/AddClientForm";

import MetaHelp from "./pages/MetaHelp";

// Login - Sign Up
import Loginpage from "./pages/loginpage";
import SignUp from "./pages/SignUp";

// Vendor Pages
import VendorLayout from "./components/VendorLayout";
import DashboardPage from "./pages/dashboardpage";
import MetaSettings from "./pages/MetaSettings";
import ContactPage from "./pages/contactpage";
import ProfilePage from "./pages/profilepage";

// Admin Pages
import AdminLayout from "./components/AdminLayout";
import AdminUsersPage from "./pages/AdminPages/AdminUsersPage";
import AdminDashboard from "./pages/AdminPages/AdminDashboard";
import AdminBusinessCategory from "./pages/AdminPages/AdminBusinessCategory";
import AdminClientForm from "./pages/AdminPages/AdminClientForm";
import AdminPackage from "./pages/AdminPages/AdminPackage";
import TemplatePage from "./pages/VendorPages/TemplatePage";

const App = () => {
	useEffect(() => {
		if (
			localStorage.getItem("client_id") === null ||
			localStorage.getItem("client_secret") === null
		) {
			axios
				.get("/api/v1/get_client_id_secret")
				.then((response) => {
					console.log(response);
					localStorage.setItem(
						"client_secret",
						response.data.client_secret
					);
					localStorage.setItem("client_id", response.data.client_id);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);
	return (
		<Router>
			<Provider store={store}>
				<FileProvider>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/home" element={<Home />} />
						<Route path="/login" element={<Loginpage />} />
						<Route path="/sign-up" element={<SignUp />} />
						<Route path="/services" element={<Services />} />
						<Route path="/about" element={<About />} />
						<Route path="/logout" element={<LogoutSection />} />
						<Route path="/forget-password" element={<ForgotPasswordPage />} />
						<Route path="/resetpassword" element={<ResetPasswordPage />} />
						
						<Route path="/meta-help" element={<MetaHelp />} />
						<Route path="/vendor" element={<VendorLayout />}>
							<Route
								path="/vendor/contact"
								element={
									<ProtectedRoute>
										<ContactPage />
									</ProtectedRoute>
								}
							/>
							<Route path="/vendor/contact/add-contact" element={<AddContact />} />
							<Route path="/vendor/dashboard" element={<DashboardPage />} />
							<Route path="/vendor/client-form" element={<AddClientForm />} />
							<Route path="/vendor/templates" element={<TemplatePage />} />
							<Route path="/vendor/history" element={<HistoryPage />} />
							<Route path="/vendor/upload" element={<UploadPage />} />
							<Route path="/vendor/meta-settings" element={<MetaSettings />} />
							<Route path="/vendor/profile" element={<ProfilePage />} />
						</Route>

						{/* Super Admin routes */}
						<Route path="/admin" element={<AdminLayout />}>
							<Route index element={<AdminDashboard />} />
							<Route path="/admin/users" element={<AdminUsersPage />} />
							<Route path="/admin/packages" element={<AdminPackage />} />
							<Route path="/admin/business-categories" element={<AdminBusinessCategory />} />
							<Route path="/admin/client-forms" element={<AdminClientForm />} />
						</Route>
					</Routes>
				</FileProvider>
			</Provider>
		</Router>
	);
};

export default App;
