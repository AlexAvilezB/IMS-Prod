const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  product_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    category_name: { type: String, required: true },
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

module.exports = model("Product", ProductSchema);
