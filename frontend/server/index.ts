import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";

const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "../build");
const app = express();

app.use(express.static(publicPath));

app.get("*", (req, res) => {
	res.sendFile(path.resolve(publicPath, "index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});