import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import AuthRoutes from "./Routes/AuthRoutes.js";
import FoodRoutes from "./Routes/FoodRoutes.js";
import RestaurantRoutes from "./Routes/RestaurantRoutes.js";
import CartRoutes from "./Routes/CartRoutes.js";
import SearchRoutes from "./Routes/SearchRoutes.js";
import { DbConnect } from "./config/db.js";
import PaymentRoutes from "./Routes/PaymentRoutes.js";
import morgan from "morgan";
const app = express();

dotenv.config();
DbConnect();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/auth", AuthRoutes);
app.use("/api/food", FoodRoutes);
app.use("/api/restaurant", RestaurantRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/search", SearchRoutes);
app.use("/api/payment", PaymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(colors.bgGreen(`server is running on PORT ${process.env.PORT}`));
});
