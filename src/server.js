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

//setting the API route to /api/locations
app.use("/api/locations", require("./routes/locationRoutes"));

//setting the API search route to /api/locations
app.use("/api/search", require("./routes/searchRoutes"));

// setting the auth routes
app.use("/api/auth", require("./routes/authRoutes"));

//using Errorhandler
app.use(errorHandler);

// GET -> /
// This is the root endpoint for the API
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// POST -> /posts
// This endpoint returns all posts
app.post("/posts", (req, res) => {
  // todo: implement it after setting up the database,
  // currently returns fake data
  const fakePosts = [];
  for (let i = 0; i < 15; i++) {
    fakePosts.push({
      id: i,
      content: "some content " + i,
      likes: 0,
    });
  }
  res.send(JSON.stringify(fakePosts));
});

// Starts the server on port 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
