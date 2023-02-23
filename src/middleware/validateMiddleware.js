const { validationResult } = require("express-validator");

const validationErrorResponse = (res, errors) => {
  res.status(422).json({ validationErrors: errors.array() });
};

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    validationErrorResponse(res, errors);
    return;
  }
  next();
};

module.exports = {
  validate,
};
