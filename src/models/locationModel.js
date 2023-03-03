const mongoose = require("mongoose");


const locationSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "please add a title value"],
    },

    description: {
      type: String,
      required: [true, "please add a description value"],
    },
    likes: {
      type: Number,
      required: [true, "please add a like number should be set to 0"],
    },
    address: {
      type: String,
      required: true,
    },
    loc: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number], //geoJson Long first -> long lat
        required: true,
      },
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
      type: String,
      required: [true, "please add a category"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Location", locationSchema);
