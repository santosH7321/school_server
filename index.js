import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import mongoose from "mongoose";
import SchoolRouter from "./router/school.router.js";
import SubjectRouter from "./router/subject.router.js";
import TeacherRouter from "./router/teacher.router.js";

dotenv.config();


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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/school", SchoolRouter);
app.use("/subject", SubjectRouter);
app.use("/teacher", TeacherRouter);
