const { MongoClient, ServerApiVersion } = require("mongodb");
const { CustomError } = require("../middlewares/errorHandler");
const uri = process.env.MONGODB;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

/**
 * @param {string} dbRef
 * @returns {Promise<MongoClient>} Client Connection to db
 */
const connect = async () => {
  try {
    await client.connect();
    console.log("Connected to DB Client...");
    return client;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * @returns {import('mongodb').Db} Database Cursor
 */
const dbCusor = () => {
  const db = client.db("ecommerces");
  return db;
};

module.exports = { connect, dbCusor };
