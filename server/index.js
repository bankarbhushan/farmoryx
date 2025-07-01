import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const PORT = dotenv.config.PORT || 3000;

const app = express();
app.get("/", (req, res) => {
  res.send("hey user i am here");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
