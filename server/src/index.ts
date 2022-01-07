import express from "express";
const app = express();

import authRouter from "./routes/auth";
import connectDB from "./config/configDB";
import notFound from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";

// Middleware
app.use(express.json());

// Not Found Page
app.use(notFound);

// Error Handler
app.use(errorHandler);


const startServer = async () => {
  const PORT = 3000;
  const MONGO_URI = "mongodb://127.0.0.1:27017/clickup_db";
  try {
    // Connect to Database
    await connectDB(MONGO_URI);
    console.log("Connected to Database ...");

    // Start server.
    app.listen(PORT || 80, () => {
      console.log("Listen on port ", PORT);
    });
  } catch (error) {
    console.log("Error: ", error.message);
  }
}

startServer();
