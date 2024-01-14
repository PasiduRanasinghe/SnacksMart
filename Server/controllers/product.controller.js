import Product from './../models/product.model.js';
const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    console.log(products);
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { createProduct, getAllProducts };
