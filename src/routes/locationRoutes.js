const express = require("express");
const router = express.Router();
const {
  getLocations,
  setLocation,
  updateLocation,
  deleteLocation,
} = require("../controllers/locationController");
const {
  getComments,
  addComment,
  deleteComment,
} = require("../controllers/commentController");
const { validate } = require("../middleware/validateMiddleware");
const { body } = require("express-validator");
const { loggedIn } = require("../middleware/authMiddleware");

router.route("/").get(getLocations).post(setLocation);
router.route("/:id").put(updateLocation).delete(deleteLocation);

router
  .route("/:id/comments")
  .get(getComments)
  .post(
    loggedIn,
    body("content").isString().withMessage("Should be a string"),
    validate,
    addComment
  );
router.route("/:id/comments/:commentId").delete(loggedIn, deleteComment);

module.exports = router;
