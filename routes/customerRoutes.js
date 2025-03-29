import { getCustomerTransactions } from "../controllers/customerController.js";
import express from "express";

const customerRoutes = express.Router();

customerRoutes.get("/:id/transactions", getCustomerTransactions);

export default customerRoutes;
