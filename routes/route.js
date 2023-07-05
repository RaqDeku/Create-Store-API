const { createNewStore } = require("../controllers/store");
const validateStore = require("../middlewares/validateStore");
const validateUser = require("../middlewares/validateUser");

/**
 * @param {import('../app')} app
 */
const routes = (app) => {
  app.post("/store/new/", [validateUser, validateStore], createNewStore);
};

module.exports = routes;
