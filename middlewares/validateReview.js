const Ajv = require("ajv");
const reviewSchema = require("../schema/review");
const { CustomError } = require("./errorHandler");
const ajv = new Ajv();

/**
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
const validateReview = (req, res, next) => {
  const review = req.body;
  try {
    const validate = ajv.compile(reviewSchema);
    const valid = validate(review);
    console.log(validate.errors);
    if (!valid) throw new CustomError(400, `Invalid Review`);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateReview;
