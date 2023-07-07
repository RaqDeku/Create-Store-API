const jwt = require("jsonwebtoken");
const Database = require("../storeDao");
const database = new Database("users");
const { CustomError } = require("./errorHandler");

/**
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
const validateUser = async (req, res, next) => {
  let bearerHeader = req.headers.authorization;
  if (bearerHeader.startsWith("Bearer")) {
    try {
      let token = bearerHeader.split(" ")[1];
      let { data } = jwt.verify(token, "yourSecretKey");
      let user = await database.findUser(data);
      req.user = user?._id;
      if (req.user) next();
      else throw new CustomError(401, "Unauthorised! Invalid Access token");
    } catch (error) {
      next(error);
    }
  }
};

module.exports = validateUser;
