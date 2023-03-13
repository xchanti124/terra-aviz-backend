const asyncHandler = require("express-async-handler");
const Location = require("../models/locationModel");



// @desc Get search results
// @route GET /api/search
// FOR SEARCH /api/page?pageNumber=1
const pages = asyncHandler(async (req, res) => {
  const locationsPerPage = 10;
  let pageNumber = req.query.pageNumber-1 || 0;

  if(req.query.search && !req.query.category) {
    let querySearch = req.query.search;
    const result = await Location.find({$or:[
        {description: { $regex: `.*${querySearch}.*`, $options: "i" }}, {title: {$regex: `.*${querySearch}.*`, $options: "i" }}]
    }).limit(locationsPerPage).skip(locationsPerPage*pageNumber);

    const pageCalc = await Location.find({$or:[
        {description: { $regex: `.*${querySearch}.*`, $options: "i" }}, {title: {$regex: `.*${querySearch}.*`, $options: "i" }}]
    });

    let calc = Math.ceil(pageCalc.length / 10);
    const maxPage = {maxPage: calc};
    res.status(200).json({result, maxPage});


  } else if (!req.query.search && req.query.category) {
    let queryCategory = {"category" : req.query.category}
    const result = await Location.find(queryCategory).limit(locationsPerPage).skip(locationsPerPage*pageNumber);
    const pageCalc = await Location.find(queryCategory);


    let calc = Math.ceil(pageCalc.length / 10);
    const maxPage = {maxPage: calc};
    res.status(200).json({result, maxPage});


  } else if (req.query.search && req.query.category) {
    let queryCategory = {"category" : req.query.category}
    let querySearch = req.query.search;
    const result = await Location.find({$or:[
        {description: { $regex: `.*${querySearch}.*`, $options: "i" }}, {title: {$regex: `.*${querySearch}.*`, $options: "i" }}], queryCategory
    }).limit(locationsPerPage).skip(locationsPerPage*pageNumber);
    const pageCalc = await Location.find({$or:[
        {description: { $regex: `.*${querySearch}.*`, $options: "i" }}, {title: {$regex: `.*${querySearch}.*`, $options: "i" }}], queryCategory
    });

    let calc = Math.ceil(pageCalc.length / 10);
    const maxPage = {maxPage: calc};
    res.status(200).json({result, maxPage});


  } else {
    const result = await Location.find().limit(locationsPerPage).skip(locationsPerPage * pageNumber)
    const pageCalc = await Location.find()


    let calc = Math.ceil(pageCalc.length / 10);
    const maxPage = {maxPage: calc};
    res.status(200).json({result, maxPage});

  }






});

module.exports = {
  pages,
};