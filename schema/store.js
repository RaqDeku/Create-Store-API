const storeSchema = {
  type: "object",
  properties: {
    storeName: { type: "string" },
    storeDescription: { type: "string" },
  },
  required: ["storeName", "storeDescription"],
};

module.exports = storeSchema;
