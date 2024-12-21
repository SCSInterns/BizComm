import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./loginpage.css";
import loginImage from "../image/loginimage.svg";
import google from "../image/google.svg";
import { toast } from "react-toastify";
import FormikInput from "../components/Inputs/FormikInput";
import { Form, Formik } from "formik";
import { LoginValidations } from "../Validations";
import BgComponent from "../components/BgComponent";

const LoginPage = () => {
	const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate();

	// const validate = () => {
	// 	let errors = {};
	// 	if (!formData.email) {
	// 		errors.email = "Email is required";
	// 	} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
	// 		errors.email = "Email address is invalid";
	// 	}
	// 	if (!formData.password) errors.password = "Password is required";
	// 	return errors;
	// };

	const handleTogglePassword = () => setShowPassword(!showPassword);

	const handleSubmit = async (values) => {
		// const errors = validate();
		// if (Object.keys(errors).length > 0) {
		// 	setErrors(errors);
		// 	return;
		// }

		try {
			if (localStorage.getItem("client_id") === null) {
				const response = await axios.get(
					"/api/v1/get_client_id_secret"
				);
				if (response.status === 200) {
					localStorage.setItem("client_id", response.data.client_id);
					localStorage.setItem(
						"client_secret",
						response.data.client_secret
					);
				} else {
					console.log(response);
				}
			}

			let fmData = new FormData();
			fmData.append("user[email]", values.email);
			fmData.append("user[password]", values.password);
			fmData.append("client_id", localStorage.getItem("client_id"));

			const response = await axios.post("/api/v1/login", fmData);
			if (response.status === 200) {
				localStorage.setItem(
					"access_token",
					response.data.access_token
				);
				localStorage.setItem("user_id", response.data.user.id);
				localStorage.setItem("user_name", response.data.user.name);
				if (response.data.user.role === "vendor") {
					navigate("/vendor/dashboard");
				} else {
					navigate("/admin");
				}
			}
		} catch (error) {
			toast.error(
				error.response.data.message || "Login failed. Please try again."
			);
		}
	};

	return (
		<div className="w-full relative h-full flex items-center justify-center">
			<BgComponent />
			<div className="lg:flex hidden items-center justify-center w-full h-full">
				<img src={loginImage} alt="" className="" />
			</div>
			<div className="w-full h-full min-h-screen flex flex-col items-center justify-center !z-10">
				<div className="w-full max-w-[450px] lg:py-12 py-10 px-8">
					<h1 className="w-full bg-white text-center lg:text-5xl text-4xl font-bold">
						Biz<span className="text-blue">Comm</span>Sync
					</h1>
					<p className="w-full bg-white text-center lg:text-3xl text-2xl font-bold sm:my-4 my-2 mb-5 lg:mb-6">
						Welcome back!
					</p>

					<Formik
						initialValues={{
							email: "",
							password: "",
						}}
						// validationSchema={LoginValidations}
						onSubmit={(values) => handleSubmit(values)}>
						{({ errors, setFieldValue }) => (
							<Form className="flex flex-col gap-3 items-center justify-center w-full">
								<div className="w-full flex flex-col items-center justify-center gap-4">
									<FormikInput
										label={"Email"}
										type={"email"}
										name={"email"}
										onChange={(e) => { setFieldValue("email", e.target.value) }}
										placeholder={"Email"}
										labelClassName={`md:text-base text-sm peer-focus:text-primary text-gray-700`}
										className={`w-full mt-1 peer font-normal text-sm !outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary p-3 border border-black rounded-lg`}
									/>
									<div className="w-full relative">
										<FormikInput
											label={"Password"}
											type={
												showPassword
													? "text"
													: "password"
											}
											name={"password"}
											placeholder={"Password"}
											onChange={(e) => { setFieldValue("password", e.target.value) }}
											labelClassName={`md:text-base text-sm text-gray-700 peer-focus:text-primary`}
											className={`w-full mt-1 peer font-normal text-sm !outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary p-3 border border-black rounded-lg`}
										/>
										<p className="absolute right-1 top-8">
											<IconButton
												onClick={handleTogglePassword}>
												{showPassword ? (
													<VisibilityOff />
												) : (
													<Visibility />
												)}
											</IconButton>
										</p>
									</div>
								</div>

								<div className="flex items-center justify-between gap-4 w-full bg-white">
									<label className="flex items-center justify-center gap-2 text-sm">
										<input type="checkbox" />
										Remember me
									</label>
									<Link
										to="/forget-password"
										className="forgot-password-btn">
										Forgot your password?
									</Link>
								</div>

								<button
									type="submit"
									className="!bg-primary text-white !capitalize p-4 py-3 rounded-lg font-semibold w-full">
									Submit
								</button>
							</Form>
						)}
					</Formik>

					<p className="already-account-login-p bg-white w-full flex items-center justify-center gap-1 text-center mt-5">
						Already have an account?
						<Link to={"/sign-up"} className="hover:underline">
							<span className="text-black">Sign up</span>
						</Link>
					</p>
					<div className="w-full flex items-center justify-center gap-4 my-3 bg-white">
						<div className="horizontallinestart-login"></div>
						<h1 className="or-text-login">or</h1>
						<div className="horizontallineend-login"></div>
					</div>
					<div className="w-full flex items-center justify-center gap-4 bg-white">
						<button className="w-full flex items-center justify-center gap-3 font-semibold text-lg border border-black p-2.5 rounded-lg">
							<img src={google} alt="" />
							Sign in with Google
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
