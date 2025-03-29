import express from "express";
import {
  createAccount,
  deleteAccount,
  getAccountById,
  getAccounts,
  updateById,
} from "../controllers/accountController.js";

const accountRoutes = express.Router();

accountRoutes.post("/", createAccount);
accountRoutes.get("/", getAccounts);
accountRoutes.put("/:id", updateById);
accountRoutes.get("/:id", getAccountById);
accountRoutes.delete("/:id", deleteAccount);

export default accountRoutes;
