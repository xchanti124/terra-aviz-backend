const asyncHandler = require("express-async-handler");
const Location = require("../models/locationModel");



// @desc Get search results
// @route GET /api/search
// FOR SEARCH /api/page?pageNumber=0
const pages = asyncHandler(async (req, res) => {
  const locationsPerPage = 10;
  let pageNumber = req.query.pageNumber

  const pagination = await Location.find().limit(locationsPerPage).skip(locationsPerPage * pageNumber)
  res.status(200).json(pagination);




});

module.exports = {
  pages,
};