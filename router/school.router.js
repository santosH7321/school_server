import { Router } from "express";
import { fetchSchool, login, signup } from "../controller/school.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";

const SchoolRouter = Router();

SchoolRouter.post("/signup", signup);
SchoolRouter.post("/login", login);
SchoolRouter.get("/fetchdata",AuthMiddleware, fetchSchool)
export default SchoolRouter;
