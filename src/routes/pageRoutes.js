const express = require("express");
const router = express.Router();
const { pages } = require("../controllers/pageController");

router.route("/").get(pages);

module.exports = router;
