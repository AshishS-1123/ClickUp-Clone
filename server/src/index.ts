require("dotenv").config({ path: "./config.env" });

import express from "express";
import authRouter from "./routes/auth";

const app = express();
const PORT = process.env.PORT || 5000;

// Global Middlewares.
app.use(express.json());

// Routes.
app.use("/api/auth", authRouter);

// Start Server.
app.listen(PORT, () => {
  console.log(`> Server started on port ${PORT}`);
});
