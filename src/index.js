const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

// This allows us to use the API cross-domain
app.use(cors());

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
