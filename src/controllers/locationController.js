const asyncHandler = require("express-async-handler");
const Location = require("../models/locationModel");

// @desc Get locations
// @route GET /api/locations
// @acces Public will be changed later with auth to private
const getLocations = asyncHandler(async (req, res) => {
  const locations = await Location.find();
  res.status(200).json(locations);
});

// @desc Set locations
// @route POST /api/locations
// @acces Public will be changed later with auth to private
/* Tables
description
likes
gAPI
comments
imageLink
hashtags
category
*/
const setLocation = asyncHandler(async (req, res) => {
  const location = await Location.create({
    description: req.body.description,
    likes: 0,
    gAPI: req.body.gAPI, // don't have a clue yet how it will work
    comments: req.body.comments,
    imageLink: req.body.imageLink,
    hashtags: req.body.hashtags,
    category: req.body.category,
  });
  res.status(200).json(location);
});

// @desc Update location
// @route PUT /api/locations/:id
// @acces Public will be changed later with auth to private
const updateLocation = asyncHandler(async (req, res) => {
  const location = await Location.findById(req.params.id);
  // 10-01-23 not implemented yet, just an example code, could be working already but needs further testing
  if (!location) {
    res.status(400);
    throw new Error("Location not found");
  }

  const updatedLocation = await Location.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedLocation);
});

// @desc Delete location
// @route DEL /api/locations/:id
// @acces Private
const deleteLocation = asyncHandler(async (req, res) => {
  const location = await Location.findById(req.params.id);

  if (!location) {
    res.status(400);
    throw new Error("Location not found");
  }

  //const deletedLocation = await Location.findByIdAndRemove(req.params.id)
  // oder
  location.remove();

  res.status(200).json({ message: `location ID deleted: ${req.params.id}` });
});

module.exports = {
  getLocations,
  setLocation,
  updateLocation,
  deleteLocation,
};
