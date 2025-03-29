import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const accountsFilePath = path.join(__dirname, "../data/accounts.json");
const transactionsFilePath = path.join(__dirname, "../data/transactions.json");

function readAccounts() {
  const data = fs.readFileSync(accountsFilePath);
  return JSON.parse(data);
}

function writeAccounts(data) {
  fs.writeFileSync(accountsFilePath, JSON.stringify(data, null, 2));
}

function readTransactions() {
  const data = fs.readFileSync(transactionsFilePath);
  return JSON.parse(data);
}

function writeTransactions(data) {
  fs.writeFileSync(transactionsFilePath, JSON.stringify(data, null, 2));
}

export const transferFunds = (req, res) => {
  const { fromAccountId, toAccountId, amount } = req.body;

  if (!fromAccountId || !toAccountId || !amount) {
    return res.status(400).json({ message: "Invalid Data" });
  }

  const accounts = readAccounts();
  const fromAccount = accounts.find((acc) => acc.id == fromAccountId);
  const toAccount = accounts.find((acc) => acc.id == toAccountId);

  if (!fromAccount || !toAccount) {
    return res.status(404).json({ message: "One or both accounts not found" });
  }

  if (fromAccount.balance < amount) {
    return res.status(400).json({ message: "don't have enough money" });
  }

  fromAccount.balance -= amount;
  toAccount.balance += amount;
  writeAccounts(accounts);

  const transactions = readTransactions();
  const date = new Date().toISOString(); //gpt um em nayel

  const transferTo = {
    id: Date.now(),
    accountId: fromAccountId,
    amount: -amount,
    transactionType: "transfer-out",
    date,
  };

  const transferIn = {
    id: Date.now(),
    accountId: toAccountId,
    amount: amount,
    transactionType: "transfer-in",
    date,
  };

  transactions.push(transferTo);
  transactions.push(transferIn);

  writeTransactions(transactions);

  res.json({ message: "Transfer successful", transferTo, transferIn });
};
