import { Router } from "express";
import { getPark, postPark, } from "../controllers/parks.controllers";


const router = Router();

router
.get("/", getPark)
.post("/register", postPark)


export default router;
