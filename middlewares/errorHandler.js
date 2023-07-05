/**
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Something Went Wrong";
  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;
  }
  console.log(err);
  return res.status(statusCode).json({ error: message });
};

/**
 * @description Custom Error Class
 */
class CustomError extends Error {
  /**
   * @param {Number} statusCode
   * @param {String} message
   */
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = { errorHandler, CustomError };
