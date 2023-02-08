const { Schema, model } = require("mongoose");

const RoleSchema = new Schema({
  role_name: {
    type: String,
    required: true,
  }
});

module.exports = model("Role", RoleSchema);
