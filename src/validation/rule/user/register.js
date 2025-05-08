const { body, oneOf } = require("express-validator");
const isEmailExists = require("../../validator/emailMustNotExists");

const register = [
  body('name')
    .exists()
    .withMessage("Must Not Null!")
    .bail()
    .isString()
    .withMessage("Must String!")
    .bail()
    .isLength({ min: 1 })
    .withMessage("Must Not Blank"),
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
    .custom(isEmailExists)
    .withMessage("Must Not Exists!"),
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

module.exports = register