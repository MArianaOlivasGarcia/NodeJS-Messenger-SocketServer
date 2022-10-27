import { Router } from "express";
import {
  getAvLocation,
  postAvLocation,
} from "../controllers/avlocations.controllers";

const router = Router();

router.get("/", getAvLocation).post("/register", postAvLocation);

export default router;
