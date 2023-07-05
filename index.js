require("dotenv").config();
const { createServer } = require("./app");
const { connect } = require("./config/dbConfig");
const app = createServer();
const port = process.env.PORT;
// Hello

(async () => {
  await connect();

  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
})();
