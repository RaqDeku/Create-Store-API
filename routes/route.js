const { addReview } = require("../controllers/reviews");
const { createNewStore, updateStore } = require("../controllers/store");
const validateReview = require("../middlewares/validateReview");
const validateStore = require("../middlewares/validateStore");
const validateUser = require("../middlewares/validateUser");

/**
 * @param {import('../app')} app - Express App Instance
 */
const routes = (app) => {
  app.post("/store/new/", [validateUser, validateStore], createNewStore);
  app.patch("/store/:storeId", [validateUser, validateStore], updateStore);
  app.post("/review/:id", [validateUser, validateReview], addReview);
};

module.exports = routes;
