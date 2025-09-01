import { Router } from "express";
import AuthMiddleware from "../middleware/auth.middleware.js";
import { createTeachers, deleteTeachers, fetchTeachers, updateTeachers } from "../controller/teacher.controller.js";

const TeacherRouter = Router();

TeacherRouter.get("/", AuthMiddleware ,fetchTeachers);
TeacherRouter.post("/",AuthMiddleware, createTeachers);
TeacherRouter.put("/:id", AuthMiddleware, updateTeachers);
TeacherRouter.delete("/:id", AuthMiddleware, deleteTeachers);


export default TeacherRouter;