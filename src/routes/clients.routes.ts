import { Router } from "express";
import { getClients, postClients } from "../controllers/clients.controller";

const router = Router();

router
.get("/", getClients)
.post("/register", postClients);

export default router;
