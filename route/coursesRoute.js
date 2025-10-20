import express from "express"
import { createCourse, editCourses, getCoursesById, getCreatorCourses, getPublishedCourses, removeCourse } from "../controller/coursesController.js"
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";

const courseRouter = express.Router()

courseRouter.post("/create",isAuth,createCourse)
courseRouter.get("/getpublished",getPublishedCourses)
courseRouter.get("/getcreator",isAuth,getCreatorCourses)
courseRouter.post("/editcourse/:courseId",isAuth,upload.single("thumbnail"),editCourses)
courseRouter.get("/getcourse/:courseId",isAuth,getCoursesById)
courseRouter.delete("/remove/:courseId",isAuth,removeCourse)

export default courseRouter