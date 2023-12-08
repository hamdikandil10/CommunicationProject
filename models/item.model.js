const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let itemSchema = new Schema(
  {
    idBook: {
      type: String,
    },
    daysRemaining: {
      type: String,
    },
  },
  {
    collection: "items",
  },
);
module.exports = mongoose.model("ItemSchema", itemSchema);