const Ajv = require("ajv");
const storeSchema = require("../schema/store");
const { CustomError } = require("./errorHandler");
const ajv = new Ajv();

/**
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 * @description Validate Req.body Object against a schema
 */
const validateStore = (req, res, next) => {
  const data = req.body;
  try {
    const validate = ajv.compile(storeSchema);
    const valid = validate(data);
    if (valid) next();
    else throw new CustomError(400, "Missing Details");
  } catch (error) {
    next(error);
  }
};

module.exports = validateStore;
