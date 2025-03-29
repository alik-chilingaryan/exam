const fs = require("fs");
const path = require("path");
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

exports.createAccount = (req, res) => {
  const user = req.body;
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.send({ msg: "invalid data" });
  }

  user.id = Date.now();
  writeAccounts(user);
  res.status(201).json(user);
};

exports.getAccounts = (req, res) => {
  const accounts = readAccounts();
  res.status(200).json(accounts);
};

exports.getAccountById = (req, res) => {
  const { id } = req.params;
  console.log(id);

  const accounts = readAccounts();

  const account = accounts.find((acc) => acc.id == id);
  if (!account) {
    return res.status(404).json({ error: "Account not found." });
  }
  res.json(account);
};

exports.deleteAccount = (req, res) => {
  const { id } = req.params;
  let accounts = readAccounts();
  const index = accounts.findIndex((acc) => acc.id == id);
  if (index === -1) {
    return res.status(404).json({ error: "Account not found." });
  }
  const deletedAccount = accounts.splice(index, 1);
  writeAccounts(accounts);
  res.json(deletedAccount[0]);
};

exports.updateById = (req, res) => {
  const { id } = req.params;
  let accounts = readAccounts();
  const index = accounts.findIndex((acc) => acc.id == id);

  if (index === -1) {
    return res.status(404).json({ error: "Account not found." });
  }

  const updatedAccount = {
    ...accounts[index],
    ...req.body,
  };

  accounts[index] = updatedAccount;
  writeAccounts(accounts);

  res.json(updatedAccount);
};
