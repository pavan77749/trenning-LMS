import express from "express"
import upload from "../utils/multer.js"
import isAuthenticated from "../middleware/isAuthenticated.js"
import { createCourse, editCourse, getCreatorCourses } from "../controller/course.controller.js";

const router = express.Router()

router.route("/").post(isAuthenticated,createCourse)
router.route("/").get(isAuthenticated,getCreatorCourses)
router.route("/:courseId").put(isAuthenticated,upload.single("courseThumbnail"),editCourse)


export default router;