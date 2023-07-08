const Reviews = require("../service/reviews");
const reviews = new Reviews();

module.exports = {
  /**
   * @param {Request} req
   * @param {Response} res
   * @param {Next} next
   * @returns {Response} Response of Operation
   */
  addReview: async (req, res, next) => {
    let { id } = req.params;
    let user = req.user;
    try {
      let review = await reviews.addRewiew(id, { ...req.body, userId: user });
      return res.status(201).json({ payload: review });
    } catch (error) {
      next(error);
    }
  },
};
