const { Router } = require('express');
const { check } = require('express-validator');
const { register, login, renew } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

// User Register
router.post(
  "/register",
  [
    check("username", "username is required").isLength({ min: 3 }),
    check("lastname", "lastname is required").isLength({ min: 3 }),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
    check("birthday", "birthday is required"),
    check("position", "position is required").isLength({ min: 3 }),
    check("roles", "roles is required"),
    check("isActive", "This status is required"),
    validateFields,
  ],
  register
);

// User Login
router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    check("password", "Password must be at least 6 characters").isLength( { min: 6 }),
    validateFields
  ],
  login
);

// Renew Token
router.get('/renew', validateJWT, renew);



module.exports = router;