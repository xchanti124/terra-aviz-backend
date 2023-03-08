const asyncHandler = require("express-async-handler");
const Location = require("../models/locationModel");
const {Client} = require("@googlemaps/google-maps-services-js");
const client = new Client({})
require('dotenv').config();
let gmaps = process.env.GMAPS


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

  const userAddress = req.body.address;
  let lat, lng;

  try {
    const response = await client.geocode({
      params: {
        address: userAddress,
        key: gmaps,
      },
      timeout: 1000, // milliseconds
    });

    const result = response.data.results[0];
    lat = result.geometry.location.lat;
    lng = result.geometry.location.lng;
  } catch (error) {
    console.log(error.response.data.error_message);
    return res.status(400).json({ error: 'Geocoding failed, please change address' });
  }

  const location = await Location.create({
    title: req.body.title,
    description: req.body.description,
    likes: 0,
    address: req.body.address,
    loc: {
      type: req.body.type,
      coordinates: [lng, lat],
    },
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
