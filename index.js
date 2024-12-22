const express = require("express");
const mongoose = require("mongoose");
const dotENv = require("dotenv");
const bodyparser = require("body-parser");
const vendorRoutes = require(`${__dirname}/routes/vendorRoutes`);

const firmRoutes = require("./routes/firmRoutes");
const productRoutes = require("./routes/productRoutes");
const cors = require("cors");
const path = require("path");

dotENv.config();
const app = express();
app.use(bodyparser.json());
app.use("/api/v1/vendor", vendorRoutes);
app.use("/api/v1/firm", firmRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/uploads", express.static("uploads"));

mongoose
  .connect(process.env.MONGO_CONNECT_URL)
  .then(() => {
    console.log("sussessfully conected to the database");
  })
  .catch((error) => {
    console.log(error);
  });
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`the app is running on port ${PORT}`);
});
