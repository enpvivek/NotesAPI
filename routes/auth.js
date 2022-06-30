const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

//Create a user using: POST "/api/auth/". Doesn't require Auth
router.post(
  "/",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 3 }, body("password").isLength({ min: 5 })),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.json({ error: "Email already in use", message: err.message });
      });
  }
);

module.exports = router;
