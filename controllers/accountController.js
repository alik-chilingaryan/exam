const fs = require("fs");
const path = require("path");
const accountsFile = path.join(__dirname, "../data/accounts.json");

function readAccounts() {
  const data = fs.readFileSync(accountsFile, "utf8");
  return JSON.parse(data);
}

function writeAccounts(accounts) {
  fs.writeFileSync(accountsFile, JSON.stringify(accounts, null, 2));
}

exports.createAccount = (req, res) => {
  const newAccount = req.body;
  const accounts = readAccounts();
  if (accounts.find((acc) => acc.id === newAccount.id)) {
    return res
      .status(400)
      .json({ error: "Account with this ID already exists." });
  }
  accounts.push(newAccount);
  writeAccounts(accounts);
  res.status(201).json(newAccount);
};

exports.getAccounts = (req, res) => {
  const accounts = readAccounts();
  res.status(200).json(accounts);
};

exports.getAccountById = (req, res) => {
  const { id } = req.params;
  const accounts = readAccounts();
  const account = accounts.find((acc) => acc.id === id);
  if (!account) {
    return res.status(404).json({ error: "Account not found." });
  }
  res.json(account);
};

exports.deleteAccount = (req, res) => {
  const { id } = req.params;
  let accounts = readAccounts();
  const index = accounts.findIndex((acc) => acc.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Account not found." });
  }
  const deletedAccount = accounts.splice(index, 1);
  writeAccounts(accounts);
  res.json(deletedAccount[0]);
};
