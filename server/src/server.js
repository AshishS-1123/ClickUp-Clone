// Configure environment variables.
require("dotenv").config({ path: "./src/config.env" });

// Create new Express App.
const express = require('express');
const app = express();

const authRouter = require("./routes/auth");
const workspaceRouter = require("./routes/private/workspace");
const spaceRouter = require("./routes/private/spaces");
const folderRouter = require("./routes/private/folder");
const listRouter = require("./routes/private/list");

const { protect } = require("./middleware/auth");
const { paramValidator } = require("./middleware/paramValidator");
const errorHandler = require("./middleware/error");
const notFound = require("./middleware/notFound");
const connectDB = require("./config/db");

// Cross-Origin Requests.
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(require('cors')());

// JSON Middleware.
app.use(express.json())

app.param(["userId", "workspaceId"], paramValidator);

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/workspaces", protect, workspaceRouter);
// app.use("/api/v1/user/:userId/workspaces/:workspaceId/spaces", protect, spaceRouter);
// app.use("/api/v1/user/:userId/workspaces/:workspaceId/folders", protect, folderRouter);
// app.use("/api/v1/user/:userId/workspaces/:workspaceId/lists", protect, listRouter);

// Not Found Page
app.use(notFound);

// Error Handler Middleware
app.use(errorHandler);

// Server
const startServer = async () => {
  try {
    // Try connecting to database before starting server.
    await connectDB();
    console.log("Connected to Database ...")

    // Start to server.
    app.listen(process.env.PORT || 80, () => {
      console.log(`Listen on port ${process.env.PORT} ...`);
    })
  } catch (error) {
    console.log("Error: ", error.message);
  }
}

startServer();
