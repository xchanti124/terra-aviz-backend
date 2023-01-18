const express = require("express");
const router = express.Router();
const {
    textSearch,
} = require("../controllers/searchController")

router.route("/").get(textSearch);

module.exports = router;

