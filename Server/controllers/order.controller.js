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
    const orders = await Order.find({ user: req.user.id }).populate({
      path: 'user',
      select: 'userName address',
    });

    res.json(orders);
  } catch (error) {
    next(error);
  }
};
const getAllOrders = async (req, res, next) => {
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

const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          orderStatus: req.body.orderStatus,
        },
      },
      { new: true }
    );

    res.json(order);
  } catch (error) {
    next(error);
  }
};

export { placeOrder, getOrders, getAllOrders, updateOrderStatus };
