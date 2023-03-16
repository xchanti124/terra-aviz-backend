const asyncHandler = require("express-async-handler");
const Location = require("../models/locationModel");

const addLike = asyncHandler(async (req, res) => {
  const location = await Location.findById(req.params.id);

  if (!location) {
    res.status(400);
    throw new Error("Location not found");
  }

  let oldLikes = location.likes;
  let newLikes = oldLikes + 1;

  await Location.findByIdAndUpdate(req.params.id, {
    $set: { likes: newLikes },
  });

  res.status(200).json(newLikes);
});

module.exports = {
  addLike,
};
