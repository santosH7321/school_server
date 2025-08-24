import { Router } from "express";
import { fetchSchool, login, signup, updateSchool } from "../controller/school.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";

const SchoolRouter = Router();

SchoolRouter.post("/signup", signup);
SchoolRouter.post("/login", login);
SchoolRouter.get("/fetchdata",AuthMiddleware, fetchSchool);
SchoolRouter.put("/update",AuthMiddleware, updateSchool);
export default SchoolRouter;
