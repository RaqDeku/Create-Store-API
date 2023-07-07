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
    let error = validate.errors?.params.missingProperty;
    if (!valid) throw new CustomError(400, `Missing Detail(s) ${error}`);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateStore;
