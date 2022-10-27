import { Router } from "express";
import { getProduction, postProduction } from "../controllers/prod.controllers";

const router = Router();

router.get("/", getProduction).post("/register", postProduction);

export default router;
