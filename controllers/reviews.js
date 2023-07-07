const Reviews = require("../service/reviews");
const reviews = new Reviews();

module.exports = {
  /**
   * @param {Request} req
   * @param {Response} res
   * @returns {Response} Response of Operation
   */
  addReview: async (req, res) => {
    let { id } = req.params;
    let user = req.user;
    let review = await reviews.addRewiew(id, { ...req.body, userId: user });
    return res.status(201).json({ payload: review });
  },
};
