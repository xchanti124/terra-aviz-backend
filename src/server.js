const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

const port = process.env.Port || 3000;
connectDB();

const app = express();

// This allows us to use the API cross-domain
app.use(cors());

// Json and URLencoded for the API/Routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// setting the API routes
app.use("/api/locations", require("./routes/locationRoutes"));

// setting the API search route to /api/locations
app.use("/api/search", require("./routes/searchRoutes"));

// setting the auth routes
app.use("/api/auth", require("./routes/authRoutes"));

// setting the API page routes
app.use("/api/page", require("./routes/pageRoutes"));

// setting the API like routes
app.use("/api/like", require("./routes/likeRoutes"));

// using Errorhandler
app.use(errorHandler);

// Starts the server on port 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
