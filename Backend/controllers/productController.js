const ErrorHandler = require("../utils/errorhandler");
const Product = require("../models/productModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// create product --only admin

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
 req.body.user = req.user.id;
 
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// get all products 
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
const resultPerPage = 5;
const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
  });
});

// product detail
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
    productCount 
  });
});

// update product

exports.updateProduct = catchAsyncErrors(async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
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

exports.deleteProduct = catchAsyncErrors(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Product deleted successfuly",
  });
});
