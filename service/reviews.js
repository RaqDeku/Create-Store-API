const Database = require("../storeDao");
const database = new Database("reviews");

class Reviews {
  constructor() {}

  async addRewiew(id, review) {
    try {
      let reviews = await database.addReview(id, review);
      return reviews;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Reviews;
