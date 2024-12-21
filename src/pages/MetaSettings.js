import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import FormikInput from "../components/Inputs/FormikInput";
import { InfoIcon, SettingsIcon, XIcon } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const MetaSettings = () => {
	const [facebookData, setFacebookData] = useState({})
	const [modalData, setModalData] = useState({});
	const [openDemoModal, setOpenDemoModal] = useState(false);

	const modalDataArray = [
		{
			image: null,
			video: "",
			title: "Account Name",
			description: "The name of your account. This will be used in the title of your messages and in the sender's name.",
		},
		{
			image: "",
			video: null,
			title: "Whatsapp Number",
			description: "Please enter the number through which you have registered on meta to send the message.",
		},
		{
			image: null,
			video: "",
			title: "Whatsapp Number",
			description: "Please enter the number through which you have registered on meta to send the message.",
		},
		{
			image: null,
			video: "",
			title: "Whatsapp Number",
			description: "Please enter the number through which you have registered on meta to send the message.",
		},
		{
			image: "",
			video: null,
			title: "Whatsapp Number",
			description: "Please enter the number through which you have registered on meta to send the message.",
		},
		{
			image: null,
			video: "",
			title: "App Access Token",
			description: "Its the access token through which you can send the messages through whatsapp. This is necessary as it gives access to the whatsapp API. To get the access token, follow the steps as shown in the video above.",
		},
	]

	const fetchMetaInfo = async () => {
		await axios.get(`/api/v1/facebook_accounts`)
		.then((response) => {
			setFacebookData(response.data.facebook_account)
		})
		.catch((error) => { console.log(error) })
	}

	useEffect(() => {
		fetchMetaInfo();
	}, [])

	const handleDemoModal = (data) => {
		setModalData(data);
		setOpenDemoModal(true);
	};

	const handleSubmit = (values) => {

		const formData = new FormData();
		formData.append("account[account_name]", values.account_name);
		formData.append("account[whatsapp_number]", values.whatsapp_number);
		formData.append("account[business_app_client_id]", values.business_app_client_id);
		formData.append("account[business_app_client_secret]", values.business_app_client_secret);
		formData.append("account[fb_phone_number_id]", values.fb_phone_number_id);
		formData.append("account[fb_access_token]", values.fb_access_token);

		axios.put(`/api/v1/facebook_accounts/${localStorage.getItem("user_id")}`, formData)
		.then((response) => {
			toast.success(response.data.message || "Meta account updated successfully")
			fetchMetaInfo();
		})
		.catch((error) => {
			console.log(error)
		});
	};

	return (
		<div className="w-full h-full pl-4 relative">
			<div className="w-full mt-2">
				<div className="w-full flex flex-col items-start justify-start gap-2">
					<div className="w-full flex items-center justify-start gap-2">
						<SettingsIcon className="size-7 text-black" />
						<h1 className="text-3xl font-bold">Meta Settings</h1>
					</div>
					<p className="font-normal text-sm text-primary">Manage your Meta account settings here. You can get help by clicking the info icon next to each field.</p>
				</div>
				<div className="w-full h-[1.5px] bg-gray-700 mt-3 mb-5" />
				<Formik
					initialValues={{
						account_name: facebookData.account_name || "",
						whatsapp_number: facebookData.whatsapp_number || "",
						fb_access_token: facebookData.fb_access_token || "",
						fb_phone_number_id: facebookData.fb_phone_number_id || "",
						business_app_client_id: facebookData.business_app_client_id || "",
						business_app_client_secret: facebookData.business_app_client_secret || "",
					}}
					enableReinitialize
					onSubmit={(values) => {
						handleSubmit(values);
					}}>
					{({ values, errors }) => (
						<Form>
							<div className="w-full grid md:grid-cols-2 gap-4">
								<div className="relative">
									<FormikInput
										label={"Account Name"}
										type="text"
										name="account_name"
										placeholder="Account Name"
										labelClassName={`md:text-base text-sm peer-focus:text-primary ${
											errors.account_name
												? "text-red-500"
												: ""
										}`}
										value={values.account_name}
										className={`w-full mt-1 peer font-normal text-sm !outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary py-2 px-3 border ${
											errors.account_name
												? "border-red-500 placeholder:text-red-500 text-red-500"
												: "border-black"
										} rounded-lg`}
									/>
									<InfoIcon onClick={() => handleDemoModal(modalDataArray[0])} className="!size-5 hover:text-primary cursor-pointer absolute top-0.5 right-0" />
								</div>
								<div className="relative">
									<FormikInput
										value={values.whatsapp_number}
										label={"Whatsapp Number"}
										type="text"
										name="whatsapp_number"
										placeholder="Whatsapp Number used for sending messages"
										labelClassName={`md:text-base text-sm peer-focus:text-primary ${
											errors.whatsapp_number
												? "text-red-500"
												: ""
										}`}
										className={`w-full mt-1 peer font-normal text-sm !outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary py-2 px-3 border ${
											errors.whatsapp_number
												? "border-red-500 placeholder:text-red-500 text-red-500"
												: "border-black"
										} rounded-lg`}
									/>
									<InfoIcon onClick={() => handleDemoModal(modalDataArray[1])} className="!size-5 hover:text-primary cursor-pointer absolute top-0.5 right-0" />
								</div>
								<div className="relative">
									<FormikInput
										value={values.business_app_client_id}
										label={"App Client ID"}
										type="text"
										name="business_app_client_id"
										placeholder="App Client ID"
										labelClassName={`md:text-base text-sm peer-focus:text-primary ${
											errors.business_app_client_id
												? "text-red-500"
												: ""
										}`}
										className={`w-full mt-1 peer font-normal text-sm !outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary py-2 px-3 border ${
											errors.business_app_client_id
												? "border-red-500 placeholder:text-red-500 text-red-500"
												: "border-black"
										} rounded-lg`}
									/>
									<InfoIcon onClick={() => handleDemoModal(modalDataArray[2])} className="!size-5 hover:text-primary cursor-pointer absolute top-0.5 right-0" />
								</div>
								<div className="relative">
									<FormikInput
										value={values.business_app_client_secret}
										label={"App Client Secret"}
										type="text"
										name="business_app_client_secret"
										placeholder="App Client Secret"
										labelClassName={`md:text-base text-sm peer-focus:text-primary ${
											errors.business_app_client_secret
												? "text-red-500"
												: ""
										}`}
										className={`w-full mt-1 peer font-normal text-sm !outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary py-2 px-3 border ${
											errors.business_app_client_secret
												? "border-red-500 placeholder:text-red-500 text-red-500"
												: "border-black"
										} rounded-lg`}
									/>
									<InfoIcon onClick={() => handleDemoModal(modalDataArray[3])} className="!size-5 hover:text-primary cursor-pointer absolute top-0.5 right-0" />
								</div>
								<div className="relative">
									<FormikInput
										value={values.fb_phone_number_id}
										label={"App Phone Number ID"}
										type="text"
										name="fb_phone_number_id"
										placeholder="App Phone Number ID"
										labelClassName={`md:text-base text-sm peer-focus:text-primary ${
											errors.fb_phone_number_id
												? "text-red-500"
												: ""
										}`}
										className={`w-full mt-1 peer font-normal text-sm !outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary py-2 px-3 border ${
											errors.fb_phone_number_id
												? "border-red-500 placeholder:text-red-500 text-red-500"
												: "border-black"
										} rounded-lg`}
									/>
									<InfoIcon onClick={() => handleDemoModal(modalDataArray[4])} className="!size-5 hover:text-primary cursor-pointer absolute top-0.5 right-0" />
								</div>
								<div className="relative">
									<FormikInput
										value={values.fb_access_token}
										label={"App Access Token"}
										type="text"
										name="fb_access_token"
										placeholder="App Access Token"
										labelClassName={`md:text-base text-sm peer-focus:text-primary ${
											errors.fb_access_token
												? "text-red-500"
												: ""
										}`}
										className={`w-full mt-1 peer font-normal text-sm !outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary py-2 px-3 border ${
											errors.fb_access_token
												? "border-red-500 placeholder:text-red-500 text-red-500"
												: "border-black"
										} rounded-lg`}
									/>
									<InfoIcon onClick={() => handleDemoModal(modalDataArray[5])} className="!size-5 hover:text-primary cursor-pointer absolute top-0.5 right-0" />
								</div>
							</div>
							<div className="w-full flex items-center justify-end">
								<button
									type="submit"
									className="w-fit mt-4 bg-primary text-white py-2 px-4 rounded-lg">
									Submit
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>

			{openDemoModal && (
				<div className="fixed z-10 top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-70 px-8">
					{console.log(modalData)}
					<button onClick={() => setOpenDemoModal(false)} className="absolute top-4 right-4 cursor-pointer">
						<XIcon className="w-6 h-6 text-white hover:text-primary  !size-7" />
					</button>
					<div className="bg-white p-7 rounded-lg w-full max-w-5xl flex flex-col items-center justify-center gap-2.5">
						{ modalData?.image != null ? <img src={modalData?.image} alt="Img" className="w-full h-80 object-contain border shadow rounded-lg mb-4" /> : <></>
						}
						{ modalData?.video != null ? <video src={modalData?.video} alt="Video" controls autoPlay className="w-full h-80 object-contain border shadow rounded-lg mb-4" /> : <></>
						}
						<h3 className="text-3xl font-bold text-primary">{modalData?.title}</h3>
						<p className="font-normal text-gray-700">{modalData?.description}</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default MetaSettings;
