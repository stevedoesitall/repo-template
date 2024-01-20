const checkLogin = async () => {
	const body = {
		"id": "123"
	};

	const response = await fetch(`${process.env.BASE_URL}/server`, {
		"method": "POST",
		"body": JSON.stringify(body)
	});

	const data = await response.json();

	return data;
};

export default checkLogin;
