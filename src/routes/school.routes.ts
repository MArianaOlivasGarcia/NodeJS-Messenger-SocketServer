import { Router } from "express";
import { getSchool, postSchool } from "../controllers/schools.controllers";

const router = Router();

router
.get("/", getSchool)
.post("/register",postSchool)


export default router;
