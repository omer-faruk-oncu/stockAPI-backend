"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
/* ------------------------------------------------------- */


const { mongoose } = require("../configs/dbConnection");



// Category Model:
const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },

    image: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { collection: "brands", timestamps: true },
);

/* ------------------------------------------------------- */
module.exports = mongoose.model("Brand", BrandSchema);
