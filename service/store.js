const Database = require("../storeDao");
const database = new Database("stores");

class Store {
  constructor() {}
  /**
   * @param {Object} payload - Store Document to create
   * @returns {Promise<Object>} Created Store Document
   */
  async createStore(payload) {
    try {
      let store = await database.createStore({
        ...payload,
        sales: 0,
      });
      return store;
    } catch (error) {
      throw error;
    }
  }

  async getStore() {}

  /**
   * @param {string} storeId - Store Id
   * @param {Object} update - Store Update
   * @returns Updated Store Document
   */
  async updateStore(storeId, update) {
    let store = await database.updateStore(storeId, update);
    if (store) return store;
    return;
  }
}

module.exports = Store;
