const Store = require("../service/store");
const store = new Store();

module.exports = {
  /**
   * @param {Request} req
   * @param {Response} res
   * @returns {Response} Response of Operation
   */
  createNewStore: async (req, res) => {
    let userId = req.user;
    let newStore = await store.createStore({ user: userId, ...req.body });
    return res.status(201).json({ payload: newStore });
  },

  /**
   * @param {Request} req
   * @param {Response} res
   * @returns {Response} Response of Operation
   */
  updateStore: async (req, res) => {
    let { storeId } = req.params;
    let updatedStore = await store.updateStore(storeId, req.body);
    return res.status(200).json({ payload: updatedStore });
  },
};
