/** @format */

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Stepper, Step, StepLabel, Button, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import "./signuppage.css";
import { Form, Formik } from "formik";
import FormikInput from "../components/Inputs/FormikInput";
import FormikSelect from "../components/Inputs/FormikSelect";
import FormikTextarea from "../components/Inputs/FormikTextarea";
import { AddUserValidations } from "../Validations";
import BgComponent from "../components/BgComponent";
import { InfoIcon } from "lucide-react";

const SignUp = () => {
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useState(false);
	const [businessCategories, setBusinessCategories] = useState([]);
	const [packages, setPackages] = useState([]);

	const handleTogglePassword = () => setShowPassword(!showPassword);

	const handleSubmit = async values => {
		try {
			const fmData = new FormData();
			fmData.append("user[name]", values.name);
			fmData.append("user[email]", values.email);
			fmData.append("user[password]", values.password);
			fmData.append("user[address]", values.address);
			fmData.append("user[mobile_number]", values.mobile_number);
			fmData.append("user[business_category_id]", parseInt(values.business_category_id));
			fmData.append("user[package_id]", parseInt(values.package_id));

			const response = await axios.post("/api/v1/users", fmData);
			if (response.status === 201) {
				const user = response.data.user;
				localStorage.setItem("access_token", response.data.access_token);
				localStorage.setItem("user_id", user.id);
				navigate("/vendor/dashboard");
			}
		} catch (error) {
			toast.error(error.response.data.message || "Error while creating user");
		}
	};

	useEffect(() => {
		const fetchBusinessCategories = async () => {
			try {
				const response = await axios.get("/api/v1/business_categories");
				setBusinessCategories(response.data.business_categories);
			} catch (err) {
				toast.error(err.response.data.message);
			}
		};

		const fetchPackages = async () => {
			const response = await axios.get("/api/v1/packages");
			setPackages(response.data.packages);
		};

		fetchBusinessCategories();
		fetchPackages();
	}, []);

	return (
		<div className="w-full max-w-screen h-full min-h-screen flex items-center justify-center gap-4 sm:py-8 py-6 relative">
			<BgComponent />
			<div className="w-full h-full flex items-center justify-center flex-col max-w-5xl z-10">
				<h1 className="sm:text-5xl text-3xl font-bold text-center">
					Biz<span className="text-blue">Comm</span>Sync
				</h1>
				<p className="sm:text-2xl text-center sm:my-4 my-2 mb-3 font-medium">Welcome to our app</p>

				<Formik
					initialValues={{
						username: "",
						email: "",
						password: "",
						address: "",
						mobile_number: "",
						business_category_id: "",
						package_id: "",
					}}
					validationSchema={AddUserValidations}
					onSubmit={values => handleSubmit(values)}>
					{({ errors, touched, setFieldValue }) => (
						<Form className="flex flex-col gap-3 items-center justify-center w-full lg:px-10 md:px-10 px-6">
							<div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
								<FormikInput
									label={"Name"}
									type="text"
									name="name"
									placeholder="Name"
									labelClassName={`md:text-base text-sm peer-focus:text-primary ${
										touched.name && errors.name ? "text-red-500" : ""
									}`}
									onChange={e => setFieldValue("name", e.target.value)}
									className={`w-full mt-1 peer font-normal text-sm !outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary py-2 px-3 border ${
										touched.name && errors.name
											? "border-red-500 placeholder:text-red-500 text-red-500"
											: "border-black"
									} rounded-lg`}
								/>
								<FormikInput
									label={"Mobile Number"}
									type="text"
									name="mobile_number"
									placeholder="Mobile Number"
									length={10}
									onChange={e => setFieldValue("mobile_number", e.target.value)}
									labelClassName={`md:text-base text-sm peer-focus:text-primary ${
										touched.mobile_number && errors.mobile_number ? "text-red-500" : ""
									}`}
									className={`w-full mt-1 peer font-normal text-sm !outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary py-2 px-3 border ${
										touched.mobile_number && errors.mobile_number
											? "border-red-500 placeholder:text-red-500 text-red-500"
											: "border-black"
									} rounded-lg`}
								/>
								<FormikInput
									label={"Email"}
									type="email"
									name="email"
									placeholder="Email"
									onChange={e => setFieldValue("email", e.target.value)}
									labelClassName={`md:text-base text-sm peer-focus:text-primary ${
										touched.email && errors.email ? "text-red-500" : ""
									}`}
									className={`w-full mt-1 peer font-normal text-sm !outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary py-2 px-3 border ${
										touched.email && errors.email
											? "border-red-500 placeholder:text-red-500 text-red-500"
											: "border-black"
									} rounded-lg`}
								/>
								<div className="w-full relative">
									<FormikInput
										label={"Password"}
										type={showPassword ? "text" : "password"}
										name="password"
										placeholder="Password"
										onChange={e => setFieldValue("password", e.target.value)}
										labelClassName={`md:text-base text-sm peer-focus:text-primary ${
											touched.password && errors.password ? "text-red-500" : ""
										}`}
										className={`w-full mt-1 peer font-normal text-sm !outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary py-2 px-3 border ${
											touched.password && errors.password
												? "border-red-500 placeholder:text-red-500 text-red-500"
												: "border-black"
										} rounded-lg`}
									/>
									<p className="absolute right-1 top-[26px]">
										<IconButton onClick={handleTogglePassword}>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</p>
								</div>
								<FormikSelect
									label={"Business Type"}
									name={"business_category_id"}
									selectedOption={"Select Your Business Category"}
									optionData={businessCategories}
									labelClassName={`md:text-base text-sm peer-focus:text-primary ${
										touched.business_category_id && errors.business_category_id ? "text-red-500" : ""
									}`}
									onChange={e => setFieldValue("business_category_id", e.target.value)}
									valueProperty="id"
									className={`w-full mt-1 peer font-normal text-sm !outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary py-2 px-3 border ${
										touched.business_category_id && errors.business_category_id
											? "border-red-500 placeholder:text-red-500 text-red-500"
											: "border-black"
									} rounded-lg`}
								/>
								<FormikSelect
									label={"Package"}
									name={"package_id"}
									selectedOption={"Select Your Package"}
									optionData={packages}
									onChange={(e) => setFieldValue("package_id", e.target.value)}
									labelClassName={`md:text-base text-sm peer-focus:text-primary ${
										touched.package_id && errors.package_id ? "text-red-500" : ""
									}`}
									valueProperty="id"
									className={`w-full mt-1 peer font-normal text-sm !outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary py-2 px-3 border ${
										touched.package_id && errors.package_id ? "border-red-500 placeholder:text-red-500 text-red-500" : "border-black"
									} rounded-lg`}
								/>
								<FormikTextarea
									label={"Address"}
									name={"address"}
									placeholder="Address"
									containerClassName={"col-span-2"}
									onChange={(e) => setFieldValue("address", e.target.value)}
									labelClassName={`md:text-base text-sm peer-focus:text-primary ${
										touched.address && errors.address ? "text-red-500" : ""
									}`}
									className={`w-full mt-1 peer font-normal text-sm !outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary py-2 px-3 border ${
										touched.address && errors.address ? "border-red-500 placeholder:text-red-500 text-red-500" : "border-black"
									} rounded-lg`}
								/>
							</div>
							<p className="w-full flex items-center justify-center gap-1 font-semibold bg-white">
								Already have an account?
								<Link to="/login" className="text-blue hover:underline">
									Login
								</Link>
							</p>

							<div className="w-full flex items-center justify-center gap-2">
								<button type="submit" className="!bg-primary text-white !capitalize p-4 py-2 rounded-lg font-semibold">
									Submit
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default SignUp;
