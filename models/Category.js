const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
  category_name: {
    type: String,
    required: true,
  },
  category_description: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

module.exports = model("Category", CategorySchema);
