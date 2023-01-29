const express = require("express");
const {
  register,
  login,
  refresh,
  profile,
} = require("../controllers/authController");
// this is a library for request validation
const { body } = require("express-validator");
const { loggedIn } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validateMiddleware");

const router = express.Router();

router
  .route("/register")
  .post(
    body("username")
      .isString()
      .withMessage("Should be a string")
      .isAlphanumeric()
      .withMessage("Should only contain alphanumeric characters")
      .isLength({ min: 3, max: 32 })
      .withMessage("Should have a length between 3 and 32 characters"),
    body("email").isEmail().withMessage("Should be a valid email"),
    body("password")
      .isLength({ min: 8, max: 128 })
      .withMessage("Should have a length between 8 and 128 characters"),
    body("repeatPassword")
      .isLength({ min: 8, max: 128 })
      .withMessage("Should have a length between 8 and 128 characters"),
    validate,
    register
  );
router
  .route("/login")
  .post(
    body("email").isString().withMessage("Should be a string"),
    body("password").isString().withMessage("Should be a string"),
    validate,
    login
  );
router
  .route("/refresh")
  .post(
    body("refreshToken").isString().withMessage("Should be a string"),
    validate,
    refresh
  );
router.route("/profile").get(loggedIn, profile);

module.exports = router;
