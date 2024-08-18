const ErrorHandler = require("../utils/errorhandler");
const Product = require("../models/productModel");
const catchAsyncError = require("../midlewaare/catchAsyncError");

// create product --only admin

exports.createProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// get all products
exports.getAllProducts = catchAsyncError (async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});

// product detail
exports.getProductDetails = catchAsyncError (async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next( new ErrorHandler("Product not found", 404) )
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// update product

exports.updateProduct = catchAsyncError (async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next( new ErrorHandler("Product not found", 404) )
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidator: true,
    useFindByIdAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// delete product

exports.deleteProduct = catchAsyncError( async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next( new ErrorHandler("Product not found", 404) )
  }

  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Product deleted successfuly",
  });
});
