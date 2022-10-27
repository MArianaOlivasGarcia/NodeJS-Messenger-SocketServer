import { Router } from "express";
import { getCustomers } from "../controllers/customers.controllers";


const router = Router();

router
.get("/:max", getCustomers)


export default router;
