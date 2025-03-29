const express = require("express");
const accountRoutes = require("./routes/accountRoutes.js");
// const customerRoutes = require("./routes/customerRoutes.js");
// const transactionRoutes = require("./routes/transactionRoutes.js");
const app = express();
app.use(express.json());
app.use("/accounts", accountRoutes);
// app.use("/customers", customerRoutes);
// app.use("/transactions", transactionRoutes);

app.listen(3000, () => {
  console.log("Server is running");
});
