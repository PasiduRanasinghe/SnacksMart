import Order from '../models/order.model.js';

import Product from '../models/product.model.js';

const placeOrder = async (req, res, next) => {
  try {
    const { items, total } = req.body;
    const newOrder = new Order({ user: req.user._id, items, total });
    const savedOrder = await newOrder.save();
    res.json(savedOrder);
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate({
      path: 'user',
      select: 'userName address',
    });

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export { placeOrder, getOrders };
