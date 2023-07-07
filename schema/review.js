const reviewSchema = {
  type: "object",
  properties: {
    comment: { type: "string" },
    rating: { type: "number" },
  },
  required: ["comment"],
};

module.exports = reviewSchema;
