// @ts-check
const { ObjectId } = require("mongodb");
const { dbCusor } = require("./config/dbConfig");

class Database {
  /**
   * @param {String} dbCollection - Database Collections
   */
  constructor(dbCollection) {
    validateCollection(dbCollection);
    this.collection = dbCollection;
    this.db = {
      [this.collection]: dbCusor().collection(this.collection),
    };
  }
  /**
   * Methods for Creating and Modifing A Store
   */

  /**
   * @param {Object} payload - Store Document to Insert
   * @returns {Promise<import("mongodb").Document>} Store Id
   */
  async createStore(payload) {
    try {
      let { insertedId } = await this.db.stores.insertOne({
        ...payload,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      let store = await this.getStore(insertedId);
      return store;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {String} storeId - Store Id
   * @returns {Promise<import("mongodb").Document>} Store Document
   */
  async getStore(storeId) {
    try {
      let store = await this.db.stores.findOne({ _id: new ObjectId(storeId) });
      return store;
    } catch (error) {
      throw error;
    }
  }
  /**
   * @returns {Promise<[]>} Stores
   */
  async getStores() {
    let storeArray = [];
    try {
      let stores = this.db.stores.find();
      for (const store in stores) {
        storeArray.push(store);
      }
      return storeArray;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {String} storeId - Store Id
   * @param {Object} update - Update Payload
   * @returns {Promise} Updated Store
   */
  async updateStore(storeId, update) {
    try {
      let { value } = await this.db.stores.findOneAndUpdate(
        { _id: new ObjectId(storeId) },
        { $set: { ...update, updatedAt: new Date() } },
        { returnDocument: "after", retryWrites: true }
      );
      return value;
    } catch (error) {
      throw error;
    }
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
   * @param {String} id - Store or Product Id
   * @param {Object} review - Customer Review Document
   * @returns {Promise<Array>} - Reviews Available
   */
  async addReview(id, review) {
    try {
      let reviewDoc = await this.db.reviews.updateOne(
        { _id: new ObjectId(id) },
        { $push: { reviews: review } }
      );
      !reviewDoc &&
        (await this.db.reviews.insertOne({
          _id: new ObjectId(id),
          reviews: [review],
        }));
      return await this.getReviews(id);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {String} id - Store or Product Id
   * @returns {Promise} - Reviews Document
   */
  async getReviews(id) {
    try {
      let reviewsDoc = this.db.reviews.findOne({ _id: new ObjectId(id) });
      return reviewsDoc;
    } catch (error) {}
  }
  /**
   * @param {String} userId - User Id
   * @returns {Promise<import("mongodb").Document>} User || null
   */
  async findUser(userId) {
    try {
      let user = await this.db.users.findOne({ _id: new ObjectId(userId) });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createProduct() {}

  async updateProduct() {}

  async getProduct() {}

  async deleteProduct() {}
}

module.exports = Database;

/**
 * @param {string} collString - Database Collection
 * @returns
 */

function validateCollection(collString) {
  const allowedCollections = ["users", "stores", "reviews", "products"];
  if (allowedCollections.includes(collString)) {
    return;
  } else {
    throw Error("Collection not allowed!");
  }
}
