const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
    },
  },
  { collation: { locale: "en" } }
);

module.exports = mongoose.model("candidate", schema);
