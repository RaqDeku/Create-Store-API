const Store = require("../service/store");
const store = new Store();

module.exports = {
  /**
   * @param {Request} req
   * @param {Response} res
   * @param {Next} next
   * @returns {Response} Response of Operation
   */
  createNewStore: async (req, res, next) => {
    let userId = req.user;
    try {
      let newStore = await store.createStore({ user: userId, ...req.body });
      return res.status(201).json({ payload: newStore });
    } catch (error) {
      next(error);
    }
  },

  /**
   * @param {Request} req
   * @param {Response} res
   * @returns {Response} Response of Operation
   */
  updateStore: async (req, res, next) => {
    let { storeId } = req.params;
    try {
      let updatedStore = await store.updateStore(storeId, req.body);
      return res.status(200).json({ payload: updatedStore });
    } catch (error) {
      next(error);
    }
  },
};
