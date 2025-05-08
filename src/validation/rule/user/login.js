const { body, oneOf } = require("express-validator");
const emailShouldExists = require("../../validator/emailMustExists");

const login = [
  body("email")
    .exists()
    .withMessage("Must Not Null!")
    .bail()
    .isString()
    .withMessage("Must String!")
    .bail()
    .isLength({ min: 1 })
    .withMessage("Must Not Blank")
    .isEmail()
    .withMessage("Must Email!")
    .bail()
    .custom(emailShouldExists)
    .withMessage("Must Exists!"),
  body("password")
    .exists()
    .withMessage("Must Not Null")
    .bail()
    .isString()
    .withMessage("Must String")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Must 8 Character Minimal")
    .bail()
    .matches(/(?=.*\d)/)
    .withMessage("Must Contains Number")
    .bail()
    .matches(/(?=.*[a-z])(?=.*[A-Z])/)
    .withMessage("Must Contains Upper Case And Lower Case Character"),
];

module.exports = login