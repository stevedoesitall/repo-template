import express from "express";
import cors from "cors";
import allRoutes from "../indeces/routes.index.js";

const app = express();

app.use(express.urlencoded({ "extended": false }));
app.use(express.json());
app.use(cors({}));

for (const route in allRoutes) {
	app.use("/" + route, allRoutes[route]);
}

app.get("/healthcheck", (req, res) => {
	res
		.send({
			"ok": true
		})
		.status(200);
});

app.post("/server", (req, res) => {
	console.log(req.body);
	res
		.send({
			"ok": true
		})
		.status(200);
});

app.get("/", (req, res) => {
	res
		.send({
			"easter": "ann"
		})
		.status(200);
});

export default app;
