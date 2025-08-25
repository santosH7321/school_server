import { Router } from "express";
import path from "path";
import multer from "multer";
import { fetchSchool, login, signup, updateSchool, uploadImage } from "../controller/school.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";

const SchoolRouter = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("storage", "school"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // unique filename
  }
});
const upload = multer({storage: storage});


SchoolRouter.post("/signup", signup);
SchoolRouter.post("/login", login);
SchoolRouter.get("/fetchdata",AuthMiddleware, fetchSchool);
SchoolRouter.put("/update",AuthMiddleware, updateSchool);
SchoolRouter.post("/uploadimage",AuthMiddleware,upload.single('image'), uploadImage);


export default SchoolRouter;
