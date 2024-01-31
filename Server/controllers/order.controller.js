const placeOrder = async (req, res, next) => {
  try {
    const { items, total } = req.body;
    const newOrder = new Order({ items, total });
    const savedOrder = await newOrder.save();
    res.json(savedOrder);
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const { user } = req.body;
    const orders = await Order.find({ user: user._id });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};
export { placeOrder, getOrders };
