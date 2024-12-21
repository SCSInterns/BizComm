import React, { useEffect, useState } from "react";

import { UsersIcon, BriefcaseBusinessIcon, PackageIcon } from "lucide-react";
import { LineChart, PieChart } from "@mui/x-charts";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDashboard = () => {

	const [totalVendors, setTotalVendors] = useState(null)
	const [totalBusinessCategories, setTotalBusinessCategories] = useState(null)
	const [totalPackages, setTotalPackages] = useState(null)

	useEffect(() => {
		const fetchTotalVendors = () => {
			axios.get(`/api/v1/users/all_vendors`)
			.then((res) => {
				setTotalVendors(res.data.vendors.length)
			})
			.catch((err) => {
				toast.error(err.response.data.message || err.message)
			})
		}

		const fetchTotalCategories = () => {
			axios.get(`/api/v1/business_categories`)
			.then((res) => {
				setTotalBusinessCategories(res.data.business_categories.length)
			})
			.catch((err) => {
				toast.error(err.response.data.message || err.message)
			})
		}

		const fetchTotalPackages = () => {
			axios.get(`/api/v1/packages`)
			.then((res) => {
				setTotalPackages(res.data.packages.length)
			})
			.catch((err) => {
				toast.error(err.response.data.message || err.message)
			})
		}

		fetchTotalVendors();
		fetchTotalCategories();
		fetchTotalPackages();
	}, [])

	const DashboardCard = ({ icon, text, data }) => {
		return (
			<div className="bg-gray-100 p-4 shadow rounded-lg w-full h-24 flex items-center justify-start gap-4">
				<div className="">{icon}</div>
				<div className="">
					<p className="text-2xl">{data}</p>
					<p className="text-sm font-normal text-gray-600 line-clamp-1">{text}</p>
				</div>
			</div>
		)
	}

	const data = [1, 2, 3, 5, 7, 8.5, 10]
	const user_name = localStorage.getItem("user_name") || "Admin"

	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	const years = ["2024", "2023"]

	return (
		<div className="w-full h-full flex flex-col items-center justify-center">
			{/* Header Div Table */}
			<div className="w-full flex flex-col items-end justify-between gap-2 my-2 !select-none">
				<h1 className="text-4xl text-primary w-full">Hello, {user_name}!</h1>
			</div>

			<div className="w-full flex flex-col items-center justify-center gap-5 mt-3">
				<div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
					<DashboardCard icon={<UsersIcon className="text-primary bg-primary/15 p-3 rounded-full size-12" />} text={"Currently Enrolled Vendors"} data={totalVendors} />
					<DashboardCard icon={<BriefcaseBusinessIcon className="text-primary bg-primary/15 p-3 rounded-full size-12" />} text={"Business Categories"} data={totalBusinessCategories} />
					<DashboardCard icon={<PackageIcon className="text-primary bg-primary/15 p-3 rounded-full size-12" />} text={"Packages"} data={totalPackages} />
					<DashboardCard icon={<UsersIcon className="text-primary bg-primary/15 p-3 rounded-full size-12" />} text={"Currently Enrolled Vendors"} data={"1000"} />
				</div>
				<div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
					<div className="w-full col-span-2">
						<LineChart
							xAxis={[{ data: data }]}
							series={[{
								data: [2, 5.5, 2, 8.5, 1.5, 5, 2.5],
								label: 'Monthly Earnings',
								color: '#6c63ff',
							}]}
							className="w-full h-full max-h-80"
							height={300}
						/>
						<div className="w-full flex items-center justify-center gap-2">
							<label>Select Month: </label>
							<select className="border border-black rounded px-1 py-1 font-normal text-sm !outline-none">
								{months.map((mon, idx) => {
									return( <option key={idx} className="">{mon}</option> )
								})}
							</select>
							<select className="border border-black rounded px-1 py-1 font-normal text-sm !outline-none">
								{years.map((year, idx) => {
									return( <option key={idx} className="">{year}</option> )
								})}
							</select>
						</div>
					</div>
					<div className="w-full col-span-2">
						<p></p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
