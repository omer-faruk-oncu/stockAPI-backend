"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
/* ------------------------------------------------------- */


const { mongoose } = require("../configs/dbConnection");



// Sale Model:
const SaleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User',
      required: true,
    },

    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
   
    quantity: {
      type: Number,
      required: true,
    },
    
    price: {
      type: Number,
      required: true,
    },
  
    priceTotal: {
      type: Number,
    }, 
  },
  { collection: "sales", timestamps: true },
);

/* ------------------------------------------------------- */
module.exports = mongoose.model("Sale", SaleSchema);
