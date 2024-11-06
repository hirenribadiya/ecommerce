const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const sellerSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  brandName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  image: {
    type: String, // Store the filename or file path of the uploaded image
    required: true,
  },
  category: {
    type: String,
    enum: ["men", "women", "kids"],
    required: true,
  },
  color: {
    type: String, // Add color field
    required: true,
  },
});

const sellerModel = model("seller", sellerSchema);

module.exports = sellerModel;
