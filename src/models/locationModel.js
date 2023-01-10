const mongoose = require("mongoose");

/* Tables
description
likes
gAPI
comments
imageLink
hashtags
category
*/

const locationSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "please add a description value"],
    },
    likes: {
      type: Number,
      required: [true, "please add a like number should be set to 0"],
    },
    gAPI: {
      type: String,
      required: [false],
    },
    comments: {
      type: String,
      required: [false],
    },
    imageLink: {
      type: String,
      required: [true, "please add an imagelink"],
    },
    hashtags: {
      //for the first MVP only one Hashtag to make it simple, later list/array
      type: String,
      required: [true, "please add a hashtag"],
    },
    category: {
      // question how to handle it later, if we have like 5 category I think it should looke more like this category[2]
      type: String,
      required: [true, "please add a hashtag"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Location", locationSchema);
