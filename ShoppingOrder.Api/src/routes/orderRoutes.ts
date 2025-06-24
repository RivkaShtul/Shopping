import express from "express";
import { submitOrder } from "../controllers/orderController";

const router = express.Router();

router.post("/", submitOrder);

export default router;
