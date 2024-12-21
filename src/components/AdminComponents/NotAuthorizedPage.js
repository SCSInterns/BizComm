import React, { useEffect, useState } from "react";
import unauthorizedImg from "../../image/unauthorized-gif.gif";
import { useNavigate } from "react-router-dom";

const NotAuthorizedPage = ({ authorized }) => {
    const navigate = useNavigate();
    const [counter, setCounter] = useState(5)

	useEffect(() => {
		let interval;
		if (!authorized) {
		  interval = setInterval(() => {
			setCounter((prev) => {
			  if (prev <= 1) {
				clearInterval(interval);
				navigate("/");
				localStorage.clear();
				return 0;
			  }
			  return prev - 1;
			});
		  }, 1000);
		}
		return () => clearInterval(interval);
	  }, [authorized, navigate]);

	return (
		<div className="w-full h-full min-h-screen flex xl:flex-row flex-col items-center justify-center gap-5 py-10 lg:px-16 px-8 bg-primary/10">
			<img
				src={unauthorizedImg}
				alt=""
				className="w-full h-full max-h-[300px] md:max-h-[600px] object-contain"
			/>
			<div className="w-full h-full flex flex-col xl:items-start items-center justify-center gap-4">
				<h1 className="lg:text-7xl sm:text-5xl text-3xl font-bold text-primary sm:mb-0 -mb-2">
					Unauthorized
				</h1>
				<p className="font-normal w-full lg:text-2xl sm:text-lg text-gray-600 xl:text-left text-center">
					You are not authorized to access this page. Please login
					with an admin account or contact the admin for access. You
					will be redirected to the homepage in {counter} seconds...
				</p>
			</div>
		</div>
	);
};

export default NotAuthorizedPage;
