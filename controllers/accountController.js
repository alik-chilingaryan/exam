import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const accountsFile = path.join(__dirname, "../data/accounts.json");

function readAccounts() {
  const data = fs.readFileSync(accountsFile, "utf8");
  return JSON.parse(data);
}

function writeAccounts(accounts) {
  let users = readAccounts();
  users.push(accounts);

  fs.writeFileSync(accountsFile, JSON.stringify(users, null, 2));
}

function PutAndDel(accounts) {
  fs.writeFileSync(accountsFile, JSON.stringify(accounts, null, 2));
}

export const createAccount = (req, res) => {
  const user = req.body;
  const { name, email, phone, balance } = req.body;
  if (!name || !email || !phone || !balance) {
    res.send({ msg: "invalid data" });
  }

  user.id = Date.now();
  writeAccounts(user);
  res.status(201).json(user);
};

export const getAccounts = (req, res) => {
  const accounts = readAccounts();
  res.status(200).json(accounts);
};

export const getAccountById = (req, res) => {
  const { id } = req.params;

  const accounts = readAccounts();

  const account = accounts.find((acc) => acc.id == id);
  if (!account) {
    return res.status(404).json({ error: "Account not found." });
  }
  res.json(account);
};

export const deleteAccount = (req, res) => {
  const { id } = req.params;
  let accounts = readAccounts();
  const index = accounts.findIndex((acc) => acc.id == id);
  if (index === -1) {
    return res.status(404).json({ error: "Account not found." });
  }
  const deletedAccount = accounts.splice(index, 1);
  PutAndDel(accounts);
  res.json(deletedAccount[0]);
};

export const updateById = (req, res) => {
  const { id } = req.params;
  let accounts = readAccounts();
  const index = accounts.findIndex((acc) => acc.id == id);

  if (index === -1) {
    return res.status(404).json({ error: "Account not found." });
  }

  const updatedAccount = accounts.map((acc) =>
    acc.id == id ? { ...acc, ...req.body } : acc
  );

  PutAndDel(updatedAccount);

  res.json(updatedAccount);
};
