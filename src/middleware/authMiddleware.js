const { errorResponse } = require("../helpers");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const loggedIn = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    errorResponse(res, 401, "Invalid auth token");
    return;
  }

  const tokenHeaderRegex = /^Bearer\s([^\s]+)$/;
  const groups = authHeader.match(tokenHeaderRegex);
  const token = groups?.[1];

  if (!token) {
    errorResponse(res, 401, "Invalid auth token");
    return;
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    errorResponse(res, 401, e.message);
    return;
  }

  if (payload.type !== "auth") {
    errorResponse(res, 401, "Should be an auth token");
    return;
  }

  try {
    req.user = await User.findById(payload.sub);
  } catch (e) {
    errorResponse(res, 401, "Token belongs to a user that doesn't exist");
    return;
  }

  next();
});

module.exports = {
  loggedIn,
};
