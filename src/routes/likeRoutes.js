const express = require("express");
const router = express.Router();

const { addLike } = require("../controllers/likeController");

router.route("/:id").put(addLike);

module.exports = router;
