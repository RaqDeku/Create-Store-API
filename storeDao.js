// @ts-check
const { ObjectId } = require("mongodb");
const { dbCusor } = require("./config/dbConfig");

class Database {
  /**
   * @param {String} dbCollection - Database Collections
   */
  constructor(dbCollection) {
    this.collection = dbCollection;
    this.db = {
      [this.collection]: dbCusor().collection(this.collection),
      reviews: dbCusor().collection("reviews"),
    };
  }

  /**
   * @param {Object} payload - Store Document to Insert
   * @returns {Promise<import("mongodb").Document>} Store Id
   */
  async createStore(payload) {
    try {
      let { insertedId } = await this.db.stores.insertOne({ ...payload });
      insertedId &&
        (await this.db.reviews.insertOne({
          _id: new ObjectId(insertedId),
          reviews: [],
        }));
      return insertedId;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {String} storeId - Store Id
   * @param {Object=} filters - Query Params
   * @returns Store Document
   */
  async getStore(storeId, filters) {
    let options;
    filters && (options = filters);
    try {
      let store = await this.db.stores.findOne({ _id: storeId, ...options });
      return store;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {String} storeId - Store Id
   * @param {Object} update - Update Payload
   * @returns Updated Store
   */
  async updateStore(storeId, update) {
    let updatedStore = await this.db.stores.findOneAndUpdate(
      { _id: new ObjectId(storeId) },
      { $set: { ...update } },
      { returnDocument: "after", retryWrites: true }
    );
    return updatedStore;
  }

  /**
   * @param {String} storeId - Store Id
   * @returns
   */
  async deleteStore(storeId) {
    await this.db.stores.deleteOne({ _id: new ObjectId(storeId) });
    return;
  }

  /**
   * @param {String} storeId - Store Id
   * @param {Object} review - Customer Review Document
   */
  async addReview(storeId, review) {
    await this.db.reviews.updateOne(
      { _id: new ObjectId(storeId) },
      { $push: { reviews: { ...review } } }
    );
    return;
  }
  /**
   * @param {String} userId - User Id
   * @returns {Promise} User Id || null
   */
  async findUser(userId) {
    try {
      let user = await this.db.users.findOne({ _id: new ObjectId(userId) });
      return user?._id;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Database;
