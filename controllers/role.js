const { response } = require("express");
const Role = require("../models/Role");

const getRoles = async (req, res = response) => {
  const roles = await Role.find(
    {},
    "role_name"
  );

  try {
    if (!roles) {
      return res.status(404).json({
        ok: false,
        msg: "No users found",
      });
    } else {
      res.json(roles);
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const createRole = async (req, res = response) => {
  const { role_name } = req.body;

  try {
    // Verify role

    let role = await Role.findOne({ role_name });

    if (role) {
      return res.status(400).json({
        ok: false,
        msg: "Role already exists",
      });
    }

    // Create role with model

    const dbRole = new Role(req.body);

    // Create DB role

    await dbRole.save();

    // Generate Response

    return res.status(201).json({
      ok: true,
      role_name: dbRole.role_name,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};


module.exports = {
  createRole,
  getRoles,
};
