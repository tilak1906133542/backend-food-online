const Vendor = require("../models/Vendor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
dotEnv.config();

// Register a vendor
const registerVendor = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const vendorEmail = await Vendor.findOne({ email });
    if (vendorEmail) {
      return res.status(400).json("Email already taken");
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    const newVendor = new Vendor({
      username,
      email,
      password: hashedpassword,
    });

    await newVendor.save();

    res.status(201).json({
      username: username,
      email: email,
      message: "Vendor registered successfully!",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json("Email already exists.");
    }
    console.error(error);
    res.status(500).json("Internal server error!");
  }
};

// Login a vendor
const loginVendor = async (req, res) => {
  const { email, password } = req.body;

  try {
    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res.status(400).json("Invalid email or password");
    }

    const isPasswordCorrect = await bcrypt.compare(password, vendor.password);
    if (!isPasswordCorrect) {
      return res.status(400).json("Invalid email or password");
    }
    const token = jwt.sign({ vendorId: vendor._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({
      vendor: vendor.email,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error!");
  }
};

const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("firm");
    res.status(200).json({
      vendors: vendors,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("internal server error");
  }
};
const getVendorById = async (req, res) => {
  const vendorId = req.params.id;
  try {
    const vendor = await Vendor.findById(vendorId).populate("firm");
    if (!vendor) {
      return res.status(404).json({ error: "vendor not found" });
    }
    res.status(200).json({ vendor });
  } catch (error) {
    console.error(error);
    res.status(500).json("internal server error");
  }
};
module.exports = { registerVendor, loginVendor, getAllVendors, getVendorById };
