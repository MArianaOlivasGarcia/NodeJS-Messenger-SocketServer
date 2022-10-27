import { Router } from "express";
import { factibilidad, facttest } from "../controllers/simulacion.controller";

const router = Router();

router
.get("/", facttest)
.post("/", factibilidad)


export default router;
