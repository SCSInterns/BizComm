import React from "react";
import { CheckCircleIcon, ClockIcon, CrownIcon, GemIcon, ShieldCheckIcon, ShieldIcon, StarIcon, User2Icon, XCircleIcon } from "lucide-react";

const Badges = ({ type }) => {
	const variants = {
		approved: {
			classes: "bg-green-100 text-green-700 border-green-700",
			icon: <CheckCircleIcon className="size-3.5" />,
		},
		pending: {
			classes: "bg-yellow-100 text-yellow-700 border-yellow-700",
			icon: <ClockIcon className="size-3.5" />,
		},
		rejected: {
			classes: "bg-red-100 text-red-700 border-red-700",
			icon: <XCircleIcon className="size-3.5" />,
		},
		platinum: {
			classes: "bg-violet-100 text-primary border-primary",
			icon: <CrownIcon className="size-3.5" />,
		},
		ruby: {
			classes: "bg-red-100 text-red-700 border-red-700",
			icon: <GemIcon className="size-3.5" />,
		},
		gold: {
			classes: "bg-amber-100 text-amber-700 border-amber-700",
			icon: <StarIcon className="size-3.5" />,
		},
		basic: {
			classes: "bg-slate-100 text-slate-700 border-slate-700",
			icon: <ShieldIcon className="size-3.5" />,
		},
		admin: {
			classes: "bg-violet-100 text-primary border-primary",
			icon: <ShieldCheckIcon className="size-3.5" />,
		},
		vendor: {
			classes: "bg-slate-100 text-slate-700 border-slate-700",
			icon: <User2Icon className="size-3.5" />,
		},
	};
	return (
		<span
			className={`relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-1000 text-xs p-1.5 px-3 rounded-full w-fit border flex items-center gap-1 ${variants[type.toLowerCase()] ? variants[type.toLowerCase()].classes : ""}`}>
			{ variants[type.toLowerCase()] ? variants[type.toLowerCase()].icon : <></>}
			{type}
		</span>
	);
};

export default Badges;
