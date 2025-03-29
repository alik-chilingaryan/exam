import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const accountsFilePath = path.join(__dirname, "../data/transactions.json");
const transactionsFilePath = path.join(__dirname, "../data/transactions.json");

function readAccounts() {
  const data = fs.readFileSync(accountsFilePath);
  return JSON.parse(data);
}

function readTransactions() {
  const data = fs.readFileSync(transactionsFilePath);
  return JSON.parse(data);
}

export const getCustomerTransactions = (req, res) => {
  const customerId = req.params.id;
  const accounts = readAccounts();
  let transactions = readTransactions();
  transactions = transactions.filter((ts) => ts.id == customerId);
  res.json(transactions);
};
