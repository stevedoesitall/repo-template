import express from "express";
import cors from "cors";

const app = express();
const port = 5050;

app.use(express.urlencoded({ "extended": false }));
app.use(express.json());
app.use(cors({}));

app.get("/healthcheck", (req, res) => {
  res.json({
    "data": {
      "ok": true
    }
  });
});

app.post("/server", (req, res) => {
  console.log(req.body);
  res.json({
    "data": {
      "ok": true
    }
  });
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});