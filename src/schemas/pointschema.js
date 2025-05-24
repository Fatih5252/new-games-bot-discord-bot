const { model, Schema } = require("mongoose");

let pointSchema = new Schema({
  Guild: String,
  User: String,
  Points: Number
});

module.exports = model("point", pointSchema);