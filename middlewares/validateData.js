const Ajv = require("ajv");
const { CustomError } = require("./errorHandler");
const ajv = new Ajv();

/**
 * @param {Schema} schema - Data Schema to validate against
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 * @description Validate Req.body Object against a schema
 */
const validateData = (schema) => (req, res, next) => {
  const data = req.body;
  try {
    const validate = ajv.compile(schema);
    const valid = validate(data);
    let error = validate.errors?.message;
    if (!valid) throw new CustomError(400, `Missing Detail(s) ${error}`);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateData;
