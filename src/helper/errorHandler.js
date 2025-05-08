// errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err);
  
    let status = 500;
    let message = "Internal Server Error";
  
    if (err instanceof RangeError && /^401-/.test(err.message)) {
      status = 401;
      message = err.message.replace("401-", "");
    } else if (err instanceof RangeError && /^403-/.test(err.message)) {
      status = 403;
      message = err.message.replace("403-", "");
    } else if (err instanceof RangeError && /^400-/.test(err.message)) {
      status = 400;
      message = err.message.replace("400-", "");
    }
  
    return res.status(status).json({
      success: false,
      message,
    });
  };
  
  module.exports = errorHandler;
  