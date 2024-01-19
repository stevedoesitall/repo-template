import express from "express";
import cors from "cors";

const app = express();
const port = 5050;

app.use(cors({}));

app.post("/server", (req, res) => {
  res.json({
    "data": {
      "ok": true
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});