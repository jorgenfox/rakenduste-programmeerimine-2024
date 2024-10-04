const { body } = require("express-validator");

// Validation for generating token
const generateTokenValidation = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty"),
];

// Validation for verifying token
const verifyTokenValidation = [
  body("token").isJWT().withMessage("Invalid token format"),
];

module.exports = {
  generateTokenValidation,
  verifyTokenValidation,
};
