import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./signuppage.css";
import signup from "../image/sign_up.svg";
// import { useRazorpay } from "react-razorpay";
import { toast } from "react-toastify";

const SignUppage = () => {
	const navigate = useNavigate();
	// const [Razorpay] = useRazorpay();

	const [formData, setFormData] = useState({
		username: "",
		email: "",
		mobile: "",
		address: "",
		password: "",
		confirmPassword: "",
		businessCategory: null,
		package: null,
		agreeToTerms: false,
	});

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [errors, setErrors] = useState({});
	const [message, setMessage] = useState("");

	const [businessCategories, setBusinessCategories] = useState([]);
	const [packages, setPackages] = useState([]);

	const handleTogglePassword = () => setShowPassword(!showPassword);

	const handleToggleConfirmPassword = () =>
		setShowConfirmPassword(!showConfirmPassword);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	const validate = () => {
		let errors = {};
		if (!formData.username) errors.username = "Username is required";
		if (!formData.email) {
			errors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			errors.email = "Email address is invalid";
		}
		if (!formData.password) errors.password = "Password is required";
		if (formData.password !== formData.confirmPassword) {
			errors.confirmPassword = "Passwords do not match";
		}
		if (!formData.agreeToTerms) {
			errors.agreeToTerms = "You must agree to the terms and conditions";
		}
		return errors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const errors = validate();
		if (Object.keys(errors).length > 0) {
			setErrors(errors);
			setMessage(errors.username);
			return;
		}
		try {
			const fmData = new FormData();
			fmData.append("user[name]", formData.username);
			fmData.append("user[email]", formData.email);
			fmData.append("user[password]", formData.password);
			fmData.append("user[address]", formData.address);
			fmData.append("user[mobile_number]", formData.mobile);
			fmData.append(
				"user[business_category_id]",
				parseInt(formData.businessCategory)
			);
			fmData.append("user[package_id]", parseInt(formData.package));
			const response = await axios.post("/api/v1/users/", fmData);
			if (response.status === 201) {
				const user = response.data.user;
				localStorage.setItem(
					"access_token",
					response.data.access_token
				);
				localStorage.setItem("user_id", user.id);
				console.log("user : ", user.package_id !== 1);
				if (user.package_id !== 1) {
					handlePayment(user.razorpay_order_id);
				}
				setFormData({
					username: "",
					email: "",
					mobile: "",
					address: "",
					password: "",
					confirmPassword: "",
					businessCategory: null,
					package: null,
					agreeToTerms: false,
				});
			}
		} catch (error) {
			console.log(error);
			setErrors({ form: "Registration failed. Please try again." });
		}
	};

	const handlePayment = (razorpay_order_id) => {
		if (!window.Razorpay) {
			console.error("Razorpay SDK not loaded");
			return;
		}

		const options = {
			key: "rzp_test_To6bgro8lvtQZ4",
			currency: "INR",
			order_id: razorpay_order_id,
			handler: (response) => {
				axios
					.post(`api/v1/razorpay/payment_callback`, {
						order_id: response.razorpay_order_id,
						payment_id: response.razorpay_payment_id,
						razorpay_signature: response.razorpay_signature,
					})
					.then((response) => {
						if (response.status === 200) {
							toast.success(
								"Payment done successfully!! Redirecting to Dashboard."
							);
							navigate("/dashboard");
						}
					})
					.catch((error) => {
						console.log(error.message);
						toast.error(error.message);
						localStorage.clear()
					});
			},
			modal: {
				ondismiss: function () {
					axios.delete(`api/v1/users/${localStorage.getItem("user_id")}`);
					console.log("Payment Modal Dismissed");
					toast.error("Payment was not completed. Please try again.");
					localStorage.clear()
				},
			},
			theme: {
				color: "#1D5B79",
			},
		};
		const razorpay = new window.Razorpay(options);
		razorpay.open();
		razorpay.on("payment.failed", (response) => {
			toast.error(response.error.description);
		});
	};

	useEffect(() => {
		const fetchBusinessCategories = async () => {
			axios
				.get("/api/v1/business_categories")
				.then((res) =>
					setBusinessCategories(res.data.business_categories)
				)
				.catch((err) => {
					console.log(err);
					toast.error(err.response.data.message);
				});
		};
		const fetchPackages = async () => {
			const response = await axios.get("/api/v1/packages");
			setPackages(response.data.packages);
		};
		fetchBusinessCategories();
		fetchPackages();
	}, []);

	return (
		<div className="w-full max-w-screen h-full flex items-center justify-center gap-4 sm:py-8 py-6">
			<div className="w-full h-full lg:flex hidden items-center justify-center p-0">
				<img src={signup} className="w-auto h-auto p-3" alt="" />
			</div>
			<div className="w-full h-full flex items-center justify-center flex-col">
				<h1 className="sm:text-5xl text-3xl font-bold text-center">
					Biz<span className="text-blue">Comm</span>Sync
				</h1>
				<p className="sm:text-2xl text-center sm:my-4 my-2 mb-3 font-medium">
					Welcome to our app
				</p>
				<div>
					<form
						onSubmit={handleSubmit}
						className="flex flex-col gap-3 items-center justify-center w-full">
						<input
							type="text"
							name="username"
							placeholder="Name"
							className="w-full h-12 font-medium px-3 border border-black rounded-lg"
							value={formData.username}
							onChange={handleChange}
							required
						/>
						<input
							type="email"
							name="email"
							placeholder="name@gmail.com"
							className="w-full h-12 font-medium px-3 border border-black rounded-lg"
							value={formData.email}
							onChange={handleChange}
							required
						/>
						<input
							type="text"
							name="mobile"
							placeholder="Mobile Number"
							className="w-full h-12 font-medium px-3 border border-black rounded-lg"
							value={formData.mobile}
							onChange={handleChange}
							required
						/>
						<input
							type="text"
							name="address"
							placeholder="Address"
							className="w-full h-12 font-medium px-3 border border-black rounded-lg"
							value={formData.address}
							onChange={handleChange}
							required
						/>
						<div className="w-full h-12 relative">
							<input
								type={showPassword ? "text" : "password"}
								name="password"
								placeholder="Password"
								className="w-full h-full font-medium px-3 border border-black rounded-lg"
								value={formData.password}
								onChange={handleChange}
								required
							/>
							<p className="absolute right-1 top-1">
								<IconButton onClick={handleTogglePassword}>
									{showPassword ? (
										<VisibilityOff />
									) : (
										<Visibility />
									)}
								</IconButton>
							</p>
						</div>
						<div className="w-full h-12 relative">
							<input
								type={showConfirmPassword ? "text" : "password"}
								name="confirmPassword"
								placeholder="Confirm Password"
								className="w-full h-full font-medium px-3 border border-black rounded-lg"
								value={formData.confirmPassword}
								onChange={handleChange}
								required
							/>
							<p className="absolute right-1 top-1">
								<IconButton
									onClick={handleToggleConfirmPassword}>
									{showConfirmPassword ? (
										<VisibilityOff />
									) : (
										<Visibility />
									)}
								</IconButton>
							</p>
						</div>

						{/* Error Div */}
						{errors.confirmPassword && (
							<p className="error-message border-2 border-red-700 bg-red-100 text-red-800 px-3 py-2 rounded-lg w-full text-center">
								{errors.confirmPassword}
							</p>
						)}

						{/* Business Type Select */}
						<div className="w-full flex gap-3 items-center">
							<label
								htmlFor="business_category"
								className="font-semibold whitespace-nowrap">
								Business type
							</label>
							<select
								className="border border-black rounded-lg w-full p-2 px-2 text-sm font-normal !outline-none"
								id="business_category"
								name="businessCategory"
								value={formData.businessCategory}
								onChange={handleChange}>
								{/* <option value="1">Builder</option>
								<option value="2">Jeweller</option> */}
								<option value="">Select One</option>
								{businessCategories?.map((cat, idx) => {
									return (
										<option key={idx} value={cat.id}>
											{cat.name}
										</option>
									);
								})}
							</select>
						</div>

						{/* Package Type Select */}
						<div className="w-full flex gap-3 items-center">
							<label
								htmlFor="package"
								className="font-semibold whitespace-nowrap">
								Package
							</label>
							<select
								className="border border-black rounded-lg w-full p-2 px-2 text-sm font-normal !outline-none"
								id="package"
								name="package"
								value={formData.package}
								onChange={handleChange}>
								{packages?.map((pkg, idx) => {
									return (
										<option key={idx} value={pkg.id}>
											{pkg.name}
										</option>
									);
								})}
							</select>
						</div>

						<label className="flex items-start gap-1.5 font-normal md:text-base text-sm">
							<input
								type="checkbox"
								name="agreeToTerms"
								className="mt-1.5"
								checked={formData.agreeToTerms}
								onChange={handleChange}
								required
							/>
							I’ve read and agree with Terms of Service and our
							Privacy Policy
						</label>
						{errors.agreeToTerms && (
							<p className="error-message">
								{errors.agreeToTerms}
							</p>
						)}

						{/* Submit Button */}
						<input
							id="sign_up_btn"
							type="submit"
							value={
								formData.package === "1" ? "Sign Up" : "Pay Now"
							}
							className="w-full mt-2 bg-primary rounded-lg text-white font-bold text-lg h-12"
						/>

						{message && (
							<p className="success-message">{message}</p>
						)}
						{errors && (
							<p className="error-message">{errors.form}</p>
						)}
					</form>
					<div className="w-full flex items-center justify-center gap-1 py-2">
						<p className="">Already have an account?</p>
						<Link to={"/login"} className="underline font-medium">
							Login
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUppage;
