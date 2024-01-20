import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5050;

app.use(express.urlencoded({ "extended": false }));
app.use(express.json());
app.use(cors({}));

app.get("/healthcheck", (req, res) => {
  res.send({
    "ok": true
  }).status(200);
});

app.post("/server", (req, res) => {
  console.log(req.body);
  res.send({
    "ok": true
  }).status(200);
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});