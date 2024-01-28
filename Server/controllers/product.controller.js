import Product from './../models/product.model.js';
const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

const listProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const products = await Product.findById(req.params.id);
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          image: req.body.image,
          price: req.body.price,
          discount: req.body.discount,
        },
      },
      { new: true }
    );
    return res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export { createProduct, listProducts, getProduct, updateProduct };
