const express = require("express");
const router = express.Router();
const {
  getLocations,
  setLocation,
  updateLocation,
  deleteLocation,
} = require("../controllers/locationController");

router.route("/").get(getLocations).post(setLocation);
router.route("/:id").put(updateLocation).delete(deleteLocation);

module.exports = router;
