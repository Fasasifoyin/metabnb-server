import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./router/user.js"

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

app.use("/api/import", userRoutes)

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(6060, () => console.log("App connected to MongoDB")))
  .catch((error) => {
    console, log(error);
  });
