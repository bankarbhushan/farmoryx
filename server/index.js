import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import adminRouters from "./src/routes/admin.route.js";
import brokerRouter from "./src/routes/broker.route.js";
import farmerRouter from "./src/routes/farmer.route.js";
import merchantRouter from "./src/routes/merchant.route.js";
import vegRouter from "./src/routes/veg.route.js";
import itemRouter from "./src/routes/item.route.js";
import billRouter from "./src/routes/bill.route.js";

dotenv.config({
  path: "./env",
});
// here we give the path of the env file

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("server is running at port  :>> ", PORT);
    });
  })
  .catch((err) => {
    console.log("Mongo db Connect Failed !!!", err);
  });

const app = express();
app.use(express.json());

app.use("/api/admin", adminRouters);
app.use("/api/broker", brokerRouter);
app.use("/api/farmer", farmerRouter);
app.use("/api/merchant", merchantRouter);
app.use("/api/veg", vegRouter);
app.use("/api/item", itemRouter);
app.use("/api/bill", billRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
