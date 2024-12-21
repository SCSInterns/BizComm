import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import { fetchMoreData } from "../components/actions"; // Assuming you have an action to fetch more data
import "./Home.css";
import main_right from "../image/main_right.svg";
import message from "../image/message.svg";
import whatsapp from "../image/whatsapp.svg";
import email from "../image/email.svg";
import dash from "../image/dash.svg";

import messagebig from "../image/messagebig.svg";
import whatsappbig from "../image/whatsappbig.svg";
import emailbig from "../image/emailbig.svg";
import dashbig from "../image/dashbig.svg";

import aboutbg from "../image/aboutbg.svg";
import verification from "../image/verification.svg";
import img24 from "../image/img24.svg";

//social media
import instagram from "../image/instagram.svg";
import linkedin from "../image/linkedin.svg";
import facebook from "../image/facebook.svg";
import Navbar from "../components/navbar";
const Home = ({ data, fetchMoreData }) => {
	return (
		<div className="main  mt-5">
			<Navbar />
			<div className="home-page w-full px-7">
				<div className="left-content">
					<h2>
						"Maximize your business communication efficiency with
						Biz<span className="comm-color-blue">Comm</span>Sync" –
					</h2>
					<p>
						“the ultimate B2B platform for seamless coordination
						across
						<span className="comm-color-black"> WhatsApp </span>,{" "}
						<span className="comm-color-black">SMS</span>,and{" "}
						<span className="comm-color-black"> Email</span>{" "}
						Channels.”
					</p>
					<Link to="/details">
						<button className="see-more-btn">See More</button>
					</Link>
				</div>

				<div className="right-content">
					<img src={main_right} alt="Image1" />
				</div>
			</div>

			{/* Pricing Section */}
			<div className="pricing-section px-7">
				<p>Here are</p>
				<h1>
					The <span className="text-blue">best</span> plans
				</h1>
				<p>For your best experience with a platform </p>

				<div className="horizontal-line">
					{/* Horizontal line */}
					<div className="pricing-options">
						<div className="circle"></div> {/* Basic Circle */}
						<div className="circle"></div> {/* Gold Circle */}
						<div className="circle"></div> {/* Platinum Circle */}
					</div>
				</div>
				<div className="labels">
					<p>Basic</p> {/* Basic Label */}
					<p>Gold</p> {/* Gold Label */}
					<p>Platinum</p> {/* Platinum Label */}
				</div>
			</div>
			{/* Pricing Cards */}
			<div className="pricing-card-main px-7">
				<div
					className="pricing-card card-small"
					style={{ width: "330px", height: "439px" }}>
					<h1 className="pricing-main-h1">Basic</h1>
					<h1 className="pricing-main-h1 price-h1">
						<span className=" price-gray">₹</span>0.00
						<span className=" price-gray">/month</span>
					</h1>

					<div className="rectangular-div">
						<div>
							<img src={message} alt="sms" className="icon-set" />{" "}
						</div>
						<p>
							<span className="text-black">10 SMS </span>for
							budget-friendly messaging.{" "}
						</p>{" "}
					</div>
					<div className="rectangular-div">
						<div>
							<img src={whatsapp} alt="" className="icon-set" />{" "}
						</div>
						<p>
							Enjoy
							<span className="text-black"> 10 WhatsApp</span>{" "}
							Message at unbeatable rates.{" "}
						</p>
					</div>
					<div className="rectangular-div">
						<div>
							<img src={email} alt="" className="icon-set" />
						</div>
						<p>
							<span className="text-black">10 emails</span> at
							your fingertips.{" "}
						</p>
					</div>
					<button className="pricing-btn-plan">Choose plane</button>
				</div>
				<div
					className="pricing-card card-big"
					style={{ width: "352px", height: "537px" }}>
					{/* Card 2 content */}
					<h1 className="pricing-main-h1">Gold</h1>
					<h1 className="pricing-main-h1 ">
						<span className="price-white">₹</span>500.00
						<span className=" price-white">/month</span>
					</h1>

					<div className="rectangular-div-big card-big-rect">
						<div>
							<img
								src={messagebig}
								alt="sms"
								className="icon-set"
							/>{" "}
						</div>
						<p>
							{" "}
							<span className="text-black">100 SMS </span>for
							budget-friendly messaging.{" "}
						</p>{" "}
					</div>
					<div className="rectangular-div-big card-big-rect">
						<div>
							<img
								src={whatsappbig}
								alt=""
								className="icon-set"
							/>{" "}
						</div>
						<p>
							Enjoy{" "}
							<span className="text-black"> 100 WhatsApp </span>{" "}
							Message at unbeatable rates.{" "}
						</p>
					</div>
					<div className="rectangular-div-big card-big-rect">
						<div>
							<img src={emailbig} alt="" className="icon-set" />
						</div>
						<p>
							Experience unbeatable rates with our Basic User
							Pricing -{" "}
							<span className="text-black">100 emails</span> at
							your fingertips.{" "}
						</p>
					</div>
					<div className="rectangular-div-big card-big-rect">
						<div>
							<img src={dashbig} alt="" className="icon-set" />
						</div>
						<p>
							Full dashboard{" "}
							<span className="text-black">
								{" "}
								control, standard features.{" "}
							</span>
						</p>
					</div>

					<button className="pricing-btn-plan-big">
						Choose plane
					</button>
				</div>
				<div
					className="pricing-card card-small"
					style={{ width: "330px", height: "439px" }}>
					{/* Card 3 content */}
					<h1 className="pricing-main-h1">platinum</h1>
					<h1 className="pricing-main-h1 price-h1">
						<span className=" price-gray">₹</span>1000.00
						<span className=" price-gray">/month</span>
					</h1>

					<div className="rectangular-div">
						<div>
							<img src={message} alt="sms" className="icon-set" />{" "}
						</div>
						<p>
							<span className="text-black">unlimited SMS</span>{" "}
							for budget-friendly messaging,
							<span className="text-black">
								unlimited emails{" "}
							</span>
							at your fingertips.
						</p>{" "}
					</div>
					<div className="rectangular-div">
						<div>
							<img src={whatsapp} alt="" className="icon-set" />{" "}
						</div>
						<p>
							Enjoy{" "}
							<span className="text-black">
								unlimited WhatsApp Message{" "}
							</span>{" "}
							at unbeatable rates.{" "}
						</p>
					</div>
					<div className="rectangular-div">
						<div>
							<img src={dash} alt="" className="icon-set" />
						</div>
						<p>
							Full dashboard{" "}
							<span className="text-black">
								{" "}
								control, standard features.{" "}
							</span>
						</p>
					</div>
					<button className="pricing-btn-plan">Choose plane</button>
				</div>
			</div>

			{/* {About section} */}
			<div className="about-main px-7">
				<div className="about-section">
					<h1>
						About <span className="text-blue">us</span>{" "}
					</h1>
					<p>
						As a Web Development Services we are Committed to
						Building Custom Web Solutions that Drive Business
						Success.{" "}
					</p>
				</div>

				<div className="about-content">
					{/* Left Side */}
					<div className="left-side">
						<img
							src={aboutbg}
							alt="Left Image"
							style={{ width: "624.45px", height: "614.16px" }}
						/>
					</div>
					{/* Right Side */}
					<div className="right-side">
						<div>
							<p>
								<span className="text-blue">BizCommSync</span>{" "}
								revolutionizes business communication strategies
								with its synchronization-focused platform,
								streamlining processes for seamless integration
								of WhatsApp, SMS, and email channels. Our
								commitment to efficiency and productivity
								empowers organizations to save time, reduce
								errors, and enhance collaboration.{" "}
							</p>
							<p>
								With innovative features tailored to modern
								business needs,
								<span className="text-blue"> BizCommSync</span>{" "}
								provides the tools and support for enterprises
								of all sizes to thrive in today's dynamic
								marketplace. Join us in redefining the future of
								communication, where connectivity meets
								efficiency with BizCommSync.
							</p>
							<Link to="/details">
								<button className="Get-into-touch-btn">
									Get into touch
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className="choose-main px-7">
				<div className="choose-section">
					<h1>
						Why <span className="text-blue">choose us ? </span>{" "}
					</h1>
					<p>
						Choose BizCommSync for seamless integration of
						communication channels, empowering your business to
						connect effectively and thrive in today's dynamic
						marketplace.{" "}
					</p>
				</div>
			</div>
			<div className="choose-content px-7">
				<div className="card-main-small">
					<div className="small-card1">
						<div>
							<img src={message} />
							<h1>Communication</h1>
							<p>
								"Efficient Multichannel Business Communication"
							</p>
						</div>
					</div>
					<div className="small-card2">
						<div>
							<img src={verification} />
							<h1>Attention to detail</h1>
							<p>"Precision in Every Interaction"</p>
						</div>
					</div>
					<div className="small-card3">
						<div>
							<img src={img24} />
							<h1>Customer Service</h1>
							<p>"Exceptional Customer Service Solutions"</p>
						</div>
					</div>
				</div>
			</div>

			<div className="customer-main px-7">
				<div className="customer-section">
					<h1>
						Customer <span className="text-blue">Support </span>{" "}
					</h1>
					<p>
						"Comprehensive customer support solutions tailored to
						your needs, ensuring satisfaction and success."
					</p>
				</div>
				<div className="customer-content">
					<div className="container">
						<div className="screen">
							<div className="screen-body">
								<div className="screen-body-item left">
									<div className="app-title">
										<span>CONTACT</span>
										<span>US</span>
									</div>
								</div>
								<div className="screen-body-item">
									<div className="app-form">
										<div className="app-form-group">
											<input
												className="app-form-control"
												placeholder="NAME"
											/>
										</div>
										<div className="app-form-group">
											<input
												className="app-form-control"
												placeholder="EMAIL"
											/>
										</div>
										<div className="app-form-group">
											<input
												className="app-form-control"
												placeholder="CONTACT NO"
											/>
										</div>
										<div className="app-form-group message">
											<input
												className="app-form-control"
												placeholder="MESSAGE"
											/>
										</div>
										<div className="app-form-group buttons">
											<button className="app-form-button">
												CANCEL
											</button>
											<button className="app-form-button">
												SEND
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* footer-section */}
			<footer className="w-full p-7 mt-10 bg-black">
				<div className="footer-main w-full text-white">
					<div className="footer-content">
						<div className="footer-c-first">
							<h2>Contact Us</h2>
							<h1>
								{" "}
								<a href="mailto:bizcommsync@gmail.com">
									biz<span className="text-blue">comm</span>
									sync@gmail.com
								</a>
							</h1>
							<div className="socialmedia">
								<p>Get Latest Update Here</p>
								<div className="horizontalline-home"></div>
								<div>
									<a href="https://www.instagram.com/">
										<img src={instagram} />
									</a>
									<a href="https://www.linkedin.com/">
										<img src={linkedin} />
									</a>
									<a href="https://www.facebook.com/">
										<img src={facebook} />
									</a>
								</div>
							</div>
						</div>
					</div>
					<div className="footer-c-second">
						<h1>
							Ld College Of Engg |{" "}
							<a href="tel:+919723150397">+919723150397</a>
						</h1>
						<h2>@copyright 2024</h2>
					</div>
				</div>
			</footer>
		</div>
	);
};

const mapStateToProps = (state) => ({
	data: state.data, // Assuming you have data stored in your Redux store
});

const mapDispatchToProps = {
	fetchMoreData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
