import app from "./servers/app.js";
const port = process.env.PORT || 5050;

app.listen(port, () => {
	console.log(`Backend server is running on port ${port}`);
});
