const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middlewares/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../../models/UserSchema");

// @route     Method: GET // $EndPoint: api/auth
// @desc      Verify the Authorized user and get user details(Get user by token)
// @access    Private

router.get("/", auth, async (req, res) => {
  try {
    //find user by Id and return details except password
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: error.message });
  }
});

// @route   Method: POST // $EndPoint: api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    // if user details fails
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    //destructuring login details from req.body /* frontend */
    const { email, password } = req.body;

    try {
      //find user email, if not exists it returns null
      let user = await User.findOne({ email });

      //user validation => if not exists throw error
      if (!user)
        return res
          .status(404)
          .json({ errors: [{ msg: "Invalid User Credentials" }] });

      //validate password
      const isMatch = await bcrypt.compare(password, user.password);

      //if password not matched
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      //payload for json web token
      const payload = {
        user: {
          _id: user.id,
        },
      };

      //create json web token for a unique user
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
