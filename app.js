const express = require("express");
const { errorHandler } = require("./middlewares/errorHandler");
const routes = require("./routes/route");

/**
 * @description Creates Express App
 * @returns Express App Instance
 */
const createServer = () => {
  const app = express();
  // Initialising middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(errorHandler);

  // Routes
  routes(app);

  return app;
};

module.exports = { createServer };
