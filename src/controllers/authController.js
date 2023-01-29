const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { errorResponse } = require("../helpers");
// this is a library for hashing passwords
const bcrypt = require("bcrypt");
// this is a library for generating jwt tokens
const jwt = require("jsonwebtoken");

// the larger this number is, the longer hashing passwords will take
const saltRounds = 10;

const generateTokens = (sub) => {
  const currentTime = Math.floor(Date.now() / 1000);
  const authToken = jwt.sign(
    {
      sub: sub,
      iat: currentTime,
      exp: currentTime + 3_600,
      type: "auth",
    },
    process.env.JWT_SECRET
  );
  const refreshToken = jwt.sign(
    {
      sub: sub,
      iat: currentTime,
      exp: currentTime + 2_592_000,
      type: "refresh",
    },
    process.env.JWT_SECRET
  );
  return { authToken, refreshToken };
};

const register = asyncHandler(async (req, res) => {
  if (req.body.password !== req.body.repeatPassword) {
    res.status(422).json({
      validationErrors: [
        {
          msg: "Fields `password` and `repeatPassword` should match",
          param: "repeatPassword",
          location: "body",
        },
      ],
    });
    return;
  }

  const emailExists = await User.findOne({ email: req.body.email });

  if (emailExists) {
    errorResponse(res, 422, "Email is already in use");
    return;
  }

  const usernameExists = await User.findOne({ username: req.body.username });

  if (usernameExists) {
    errorResponse(res, 422, "Username already exists");
    return;
  }

  const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    passwordHash: passwordHash,
  });

  res.status(200).json(user);
});

const login = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const combinationError =
    "This combination of username and password does not exist";

  if (!user) {
    errorResponse(res, 401, combinationError);
    return;
  }

  if (!(await bcrypt.compare(req.body.password, user.passwordHash))) {
    errorResponse(res, 401, combinationError);
    return;
  }

  res.status(200).json(generateTokens(user._id));
});

const refresh = asyncHandler(async (req, res) => {
  let payload;
  try {
    payload = jwt.verify(req.body.refreshToken, process.env.JWT_SECRET);
  } catch (e) {
    errorResponse(res, 401, e.message);
    return;
  }

  if (payload.type !== "refresh") {
    errorResponse(res, 401, "Should be a refresh token");
    return;
  }

  res.status(200).json(generateTokens(payload.sub));
});

const profile = asyncHandler(async (req, res) => {
  res.status(200).json({ email: req.user.email, username: req.user.username });
});

module.exports = {
  register,
  login,
  refresh,
  profile,
};
