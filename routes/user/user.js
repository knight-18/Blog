const express = require("express")
const router = express.Router()
const {check} = require("express-validator")
const authMiddleware = require("../../middleware/auth")
const registerUser = require("./registerUser")
const loginUser = require("./loginUser")
const logoutUser = require("./logoutUser")
const logoutAll = require("./logoutAll")
const {forgotPassword, resetPassword} = require("./resetPassword")
const getProfile = require("./getProfile")
const deleteUser = require("./deleteUser")

//Register Users
router.post(
    '/api/users/register',
    [
      check('username', 'Please enter username').not().isEmpty(),
      check('email', 'Please enter a valid email ').isEmail(),
      check(
        'password',
        'Please enter a password with 6 or more characters'
      ).isLength({ min: 6 })
    ],
    registerUser
  );
//Login User
router.post(
'/api/users/login',
[
    check('username', 'Username is required').exists(),
    check('password', 'Password is required').exists()
],
loginUser
)

//Get User's own profile
router.get("/api/users/me", authMiddleware, getProfile)

// Logout User
router.post("/api/users/logout", authMiddleware, logoutUser)

//logout all sessions
router.post("/api/users/logoutall", authMiddleware, logoutAll)

//Forgot Password

router.post(
    '/api/users/forgotPassword',
    [check('username').not().isEmpty()],
    forgotPassword
  );

//Reset Password
router.put(
    '/api/users/resetPassword/:token',
    [
      check(
        'password',
        'Please enter a password with 6 or more characters'
      ).isLength({
        min: 6
      }),
      check('confirmPassword', 'Please confirm password').exists()
    ],
    resetPassword
  );

  //Delete User

router.delete(
  '/api/users/delete',
  authMiddleware,
  [
    check('username', 'Please provide your username').not().isEmpty(),
    check('password', 'Password is required').isLength({ min: 2 }),
  ],
  deleteUser
);
module.exports = router