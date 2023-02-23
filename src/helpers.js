const errorResponse = (res, code, ...errors) => {
  res.status(code).json({ errors });
};

module.exports = {
  errorResponse,
};
