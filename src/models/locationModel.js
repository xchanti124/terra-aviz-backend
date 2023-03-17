const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    category: {
      type: String,
      required: [true, "please add a category"],
    },
    userComments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Location", locationSchema);
