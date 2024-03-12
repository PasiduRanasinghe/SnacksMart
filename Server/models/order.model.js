import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        title: String,
        quantity: Number,
        price: Number,
      },
    ],
    total: Number,
    orderStatus: {
      type: String,
      enum: [
        'Processing',
        'Placed',
        'Preparing',
        'Out for delivery',
        'Delivered',
        'Cancelled',
      ],
      default: 'Processing',
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
