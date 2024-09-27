const getBasePath = () => {
	let base_url =
		process.env.NEXT_PUBLIC_NODE_ENV === "development"
			? "http://localhost:3000"
			: "https://weather-app-green-sigma.vercel.app";

	let url = "http://localhost:3000";
	return url;
};

export default getBasePath;
