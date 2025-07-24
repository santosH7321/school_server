import { Router } from "express";
import { createSchool } from "../controller/school.controller.js";

const SchoolRouter = Router();

SchoolRouter.post("/signup", createSchool);
export default SchoolRouter;
