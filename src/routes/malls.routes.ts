import { Router } from "express";
import { getMall, postMall } from "../controllers/malls.controllers";

const router = Router();

router.get("/", getMall).post("/register", postMall);

export default router;
