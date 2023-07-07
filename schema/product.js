const productSchema = {
  type: "object",
  properties: {
    productName: { type: "string" },
    productDescription: { type: "string" },
    productImg: { type: "string" },
    productPrice: { type: "string" },
    tags: { type: "array" },
  },
  required: ["productName", "productDescription", "productImg", "productPrice"],
};

module.exports = productSchema;
