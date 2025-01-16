import express from "express"

import isAuthenticated from "../middleware/isAuthenticated.js"
import { createCourse } from "../controller/course.controller.js";

const router = express.Router()

router.route("/").post(isAuthenticated,createCourse)


export default router;