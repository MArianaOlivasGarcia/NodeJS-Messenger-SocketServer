import { Router } from "express";
import { getCompetitors, postCompetitors } from "../controllers/competitors.controllers";


const router = Router();

router
.get("/", getCompetitors)
.post("/register",postCompetitors)


export default router;
