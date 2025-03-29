const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController.js");

router.post("/", accountController.createAccount);
router.get("/", accountController.getAccounts);
router.put("/:id", accountController.updateById);
router.get("/:id", accountController.getAccountById);
router.delete("/:id", accountController.deleteAccount);

module.exports = router;
