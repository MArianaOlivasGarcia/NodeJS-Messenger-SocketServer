import { Router } from "express";
import { getDistros, postDistros } from "../controllers/distro.controller";

const router = Router();

router
.get("/", getDistros)
.post("/register", postDistros);

export default router;
