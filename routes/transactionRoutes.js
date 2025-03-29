import { transferFunds } from "../controllers/transactionController.js";
import express from "express";

const transactionRoutes = express.Router();

transactionRoutes.post("/transfer", transferFunds);

export default transactionRoutes;
