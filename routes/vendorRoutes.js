const vendorController = require("../controllers/vendorcontroller");
const express = require("express");
const router = express.Router();

router.post("/register", vendorController.registerVendor);
router.post("/login", vendorController.loginVendor);
router.get("/get-all-vendors", vendorController.getAllVendors);
router.get("/single-vendor/:id", vendorController.getVendorById);
module.exports = router;
