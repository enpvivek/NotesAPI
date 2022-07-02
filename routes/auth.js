const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

//Create a user using: POST "/api/auth/createuser". Doesn't require Auth
router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 3 }, body("password").isLength({ min: 5 })),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether user already exist with same email
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ eror: "Email already in use" });
    }

    //creating a new user
    try {
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      //   .then((user) => res.json(user))
      //   .catch((err) => {
      //     console.log(err);
      //     res.json({ error: "Email already in use", message: err.message });
      //   });
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

module.exports = router;
