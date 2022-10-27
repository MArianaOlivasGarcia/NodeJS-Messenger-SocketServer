import { Router } from "express";
import { getLocations, postLocations } from "../controllers/locations.controllers";


const router = Router();

router
.get("/", getLocations)
.post("/register",postLocations)


export default router;
