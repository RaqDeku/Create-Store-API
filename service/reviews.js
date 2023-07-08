const { CustomError } = require("../middlewares/errorHandler");
const Database = require("../storeDao");
const database = new Database("reviews");

class Reviews {
  constructor() {}

  /**
   * @param {String} id
   * @param {Object} review
   * @returns {Promise<Array>} - Array With All Reviews for Store or Products
   */
  async addRewiew(id, review) {
    let reviewsList = [];
    let { userId } = review;
    try {
      let store = await new Database("stores").getStore(id);
      let { user } = store;
      if (user.equals(userId)) {
        throw new CustomError(
          403,
          "As owner of the store, you cannot add a review."
        );
      }

      let { reviews } = await database.addReview(id, review);

      for (const review in reviews) {
        if (Object.hasOwnProperty.call(reviews, review)) {
          const element = reviews[review];
          reviewsList.push(element);
        }
      }
      return reviewsList;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Reviews;
