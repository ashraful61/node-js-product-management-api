const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const productSchema = require("../schemas/productSchema");
const Product = new mongoose.model("Product", productSchema);

const checkLogin = require("../middleWares/checkLogin");

//Get all the products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      status: true,
      resultSet: products,
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error for get all products",
      status: false,
    });
  }
});

//Get product by id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    res.status(200).json({
      status: true,
      result: product,
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error for get product by id",
      status: false,
    });
  }
});

//Post a product
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product({
      ...req.body,
    });

    const product = await newProduct.save();

    res.status(200).json({
      status: true,
      message: "Product was inserted successfully",
      result: product,
    });
  } catch (err) {
    res.status(500).json({
      error: err.error,
      status: err.error,
    });
  }
});

//Update a product
router.put("/:id", async (req, res) => {
  try {
    const updatedDoc = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: "out-of-stock",
        },
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      status: true,
      message: "Product was updated successfully",
      result: updatedDoc,
    });
  } catch (err) {
    res
      .status(500)
      .json({
        error: "There was a server side error for updated product by id",
        status: false,
      });
  }
});

//Delete a product
router.delete("/:id", checkLogin, async (req, res) => {
  try {
    const product = await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({
      status: true,
      message: "Product was deleted successful",
      result: product,
    });
  } catch (err) {
    res
      .status(500)
      .json({
        error: "There was a server side error for deleting product by id",
        status: false,
      });
  }
});

module.exports = router;
