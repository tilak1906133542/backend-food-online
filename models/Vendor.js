const mongoose = require("mongoose");
const vendorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username must be  not empty "],
  },
  email: {
    type: String,
    required: [true, "email field must be not empty "],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password field must be not empty"],
  },
  firm: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Firm",
    },
  ],
});
const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
