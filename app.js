import express from "express";
import accountRoutes from "./routes/accountRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

const app = express();
app.use(express.json());

app.use("/accounts", accountRoutes);
app.use("/customers", customerRoutes);
app.use("/transactions", transactionRoutes);

app.listen(3000, () => {
  console.log("Server is running");
});
