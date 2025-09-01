import express from "express";
import dotenv from "dotenv";

dotenv.config();

import mongoose from "mongoose";
import SchoolRouter from "./router/school.router.js";
import SubjectRouter from "./router/subject.router.js";

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("Database connected successfully ✅");
  })
  .catch(() => {
    console.error("Database connection failed ❌");
  });
const app = express();
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/school", SchoolRouter);
app.use("/subject", SubjectRouter);
