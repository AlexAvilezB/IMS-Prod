const { response } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");



const getUsers = async (req, res = response) => {
  const users = await User.find(
    {},
    "username lastname email birthday position roles isActive"
  );

  try {
    if (!users) {
      return res.status(404).json({
        ok: false,
        msg: "No users found",
      });
    } else {
      res.json(users);
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const getUserById = async (req, res = response) => {
    const user = await User.findById(req.params.id, "username lastname email password birthday position roles isActive");
    try {
      if (!user) {
        return res.status(404).json({
          ok: false,
          msg: "User not found",
        });
      } else {
        res.json(user);
      }
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "Please contact the administrator",
      });
    }
}

const editUserData = async(req, res = response) => {

  const id = req.params.id;

  const { username, lastname, password, birthday, position, roles, isActive } = req.body;

  try {
    const salt = bcrypt.genSaltSync();
    hashPass = bcrypt.hashSync(password, salt);

    await User.findByIdAndUpdate(id, {
      username,
      lastname,
      password: hashPass,
      birthday,
      position,
      roles,
      isActive,
    });

    res.status(200).json({
      ok: true,
      msg: "User updated",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

module.exports = {
    getUsers,
    getUserById,
    editUserData
}