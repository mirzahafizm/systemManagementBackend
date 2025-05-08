const { validationResult } = require("express-validator");
const response = require("./response");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const extractedErrors = [];

  errors.array().forEach((err) => {
    if (err.nestedErrors) {
      err.nestedErrors.forEach((nested) => {
        extractedErrors.push({
          source: nested.param || "unknown",
          message: nested.msg || "Validation error",
        });
      });
    } else if (err.param) {
      extractedErrors.push({
        source: err.param,
        message: err.msg,
      });
    } else if (typeof err.msg === "string" && err.msg.includes("-")) {
      const [source, message] = err.msg.split("-");
      extractedErrors.push({
        source: source || "unknown",
        message: message || "Validation error",
      });
    } else {
      extractedErrors.push({
        source: "unknown",
        message: err.msg || "Validation error",
      });
    }
  });

  return response.BadRequest(res, extractedErrors);
};

module.exports = validate;
