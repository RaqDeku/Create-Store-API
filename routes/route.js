const { addReview } = require("../controllers/reviews");
const { createNewStore, updateStore } = require("../controllers/store");
const validateData = require("../middlewares/validateData");
const validateUser = require("../middlewares/validateUser");
const reviewSchema = require("../schema/review");
const storeSchema = require("../schema/store");

/**
 * @param {import('../app')} app - Express App Instance
 */
const routes = (app) => {
  app.post(
    "/store/new/",
    [validateUser, validateData(storeSchema)],
    createNewStore
  );
  app.patch(
    "/store/:storeId",
    [validateUser, validateData(storeSchema)],
    updateStore
  );
  app.post(
    "/review/:id",
    [validateUser, validateData(reviewSchema)],
    addReview
  );
};

module.exports = routes;
