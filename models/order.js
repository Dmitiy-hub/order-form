const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
}, {timestamps: true});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;