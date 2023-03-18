const asyncHandler = require("express-async-handler");
const { errorResponse } = require("../helpers");
const Comment = require("../models/commentModel");
const Location = require("../models/locationModel");

const getComments = asyncHandler(async (req, res) => {
  // const locations = await Location.find();
  const location = await Location.findById(req.params.id).populate(
    "userComments"
  );
  res.status(200).json(location.userComments);
});

const addComment = asyncHandler(async (req, res) => {
  const location = await Location.findById(req.params.id);

  const newComment = await Comment.create({
    ownerUser: req.user,
    content: req.body.content,
  });
  location.userComments.push(newComment);
  location.save();

  res.status(200).json(newComment);
});

const deleteComment = asyncHandler(async (req, res) => {
  let comment;

  try {
    comment = await Comment.findById(req.params.commentId);
  } catch (e) {
    errorResponse(res, 404, "Failed to fetch comment");
    return;
  }

  if (req.user.id !== comment.ownerUser._id.toString()) {
    errorResponse(res, 403, "Forbidden");
    return;
  }

  const location = await Location.findById(req.params.id);
  location.userComments.pull({ _id: comment.id });
  location.save();

  await Comment.deleteOne({ _id: comment.id });

  res.status(200).json(comment);
});

module.exports = {
  getComments,
  addComment,
  deleteComment,
};
