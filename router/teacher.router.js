import { Router } from "express";
import AuthMiddleware from "../middleware/auth.middleware.js";
import { createTeachers, deleteTeachers, fetchTeachers, updateTeachers, uploadTeacherImages } from "../controller/teacher.controller.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "storage/teacher")
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}.png`)
    }
})

const TeacherRouter = Router();

TeacherRouter.get("/", AuthMiddleware ,fetchTeachers);
TeacherRouter.post("/",AuthMiddleware, createTeachers);
TeacherRouter.put("/:id", AuthMiddleware, updateTeachers);
TeacherRouter.delete("/:id", AuthMiddleware, deleteTeachers);
TeacherRouter.put("/upload-image/:id", AuthMiddleware,upload.single('image'), uploadTeacherImages)


export default TeacherRouter;