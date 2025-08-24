import { Router } from "express";
import { login, signup } from "../controller/school.controller.js";

const SchoolRouter = Router();

SchoolRouter.post("/signup", signup);
SchoolRouter.post("/login", login);
export default SchoolRouter;
