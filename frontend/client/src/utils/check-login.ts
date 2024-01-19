const checkLogin = async () => {
	const response = await fetch(`${process.env.BASE_URL}/server`, {
		"method": "POST"
	});

	const data = await response.json();

	return data;
};

export default checkLogin;
