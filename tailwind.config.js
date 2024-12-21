/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,jsx}"],
	theme: {
		extend: {
			spacing: {
				68: "17rem",
			},
			colors: {
				primary: "#6C63FF",
			},
			backgroundColors: {
				primary: "#6C63FF",
			},
			borderColors: {
				primary: "#6C63FF",
			},
			dropShadow: {
				"primary-10": "0px 0px 10px #6C63FF",
				"primary-20": "0px 0px 20px #6C63FF",
			},
			animation: {
				rotate: "rotate 1s linear infinite",
				"rotate-back": "rotate-back 1s linear infinite",
			},
			keyframes: {
				rotate: {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(360deg)" },
				},
				"rotate-back": {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(-360deg)" },
				},
			},
		},
	},
	plugins: [
		// require('daisyui'),
	],
};
