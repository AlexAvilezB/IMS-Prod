const { response } = require("express");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");
const uri = process.env.MONGODB_URI;

const register = async(req, res = response) => {
  const { username, lastname, email, password, birthday, position, roles, isActive } = req.body;

  try {
    // Verify email

    let user = await User.findOne({ email });

    if( user ) {
      return res.status(400).json({
        ok: false,
        msg: "Email already exists"
      });
    }

    // Create user with model

    const dbUser = new User( req.body );

    // Hash password

    const salt = bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync( password, salt );

    // Generate JWT

    const token = await generateJWT( dbUser.id, username );

    // Create DB user

    await dbUser.save();

    // Generate Response

    return res.status(201).json({
      ok: true,
      uid: dbUser.id,
      username: dbUser.name,
      token
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: true,
      msg: "Please contact the administrator",
    });
  }

  
};

const login = async(req, res= response ) => {

const { email, password } = req.body;

try {

  const dbUser = await User.findOne({ email });

  if( !dbUser ) {
    return res.status(400).json({
      ok: false,
      msg: "Email or password is incorrect"
    });
  }

  // Confirm password

  const validPass = bcrypt.compareSync( password, dbUser.password );

  if( !validPass ) {
    return res.status(400).json({
      ok: false,
      msg: "Password is incorrect"
    });
  }

  // Validate if user is active

  if(!dbUser.isActive) {
    return res.status(401).json({
      ok: false,
      msg: "This user is not active, please contact the administrator",
    });
  }

  // Generate JWT

  const token = await generateJWT(dbUser.id, dbUser.username);

  // Generate Response

  return res.json({
    ok: true,
    uid: dbUser.id,
    name: dbUser.username,
    role: dbUser.roles.role_name,
    token
  })

  
} catch (error) {
  console.log(error);
  return res.status(500).json({
    ok: true,
    msg: "Please contact the administrator"
  })
  
}

};

const renew = async(req, res = response) => {
  const { uid } = req;

  // Read DB

  const dbUser = await User.findById(uid);

  // Validate if user is active

  if (!dbUser.isActive) {
    return res.status(401).json({
      ok: false,
      msg: "This user is not active, please contact the administrator",
    });
  }

  // Generate new JWT

  const token = await generateJWT(uid, dbUser.username);

  return res.json({
    ok: true,
    msg: "renew",
    uid,
    name: dbUser.username,
    role: dbUser.roles.role_name,
    token,
  });
};

module.exports = {
    register,
    login,
    renew
}