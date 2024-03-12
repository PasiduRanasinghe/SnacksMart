import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button, IconButton, Typography } from '@material-tailwind/react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addToCart,
  clearCart,
  removeFromCart,
} from '../redux/slices/cartSlice';
import axios from '../api/axiosInstance';
import { toast } from 'react-toastify';

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleQuantityPlus = (item) => {
    dispatch(addToCart(item));
  };
  const handleQuantityMinus = (item) => {
    dispatch(removeFromCart(item));
  };
  const handlePlaceOrder = async () => {
    const total = cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    try {
      await axios.post('/order', {
        items: cartItems,
        total: total,
      });
      dispatch(clearCart());
      toast.success('Order Placed Successfully');
    } catch (error) {
      toast.error(error.response.statusText);
    }
  };
  return (
    <div className="flex flex-col items-center m-4 min-h-96">
      <Typography variant="h2">Shopping Cart</Typography>
      <table className=" mt-6 w-full table-auto">
        <thead>
          <tr>
            <th>Product </th>
            <th>Price</th>
            <th>Quantity</th>

            <th>Option</th>
          </tr>
        </thead>
        <tbody className="mt-9">
          {cartItems.map((item) => (
            <tr key={item._id}>
              <th>
                <Typography variant="paragraph" color="blue-gray">
                  {item.title}{' '}
                </Typography>
              </th>
              <th>
                <Typography variant="paragraph" color="blue-gray">
                  LKR-{item.price}
                </Typography>
              </th>
              <th>
                <div className="flex justify-center">
                  <IconButton
                    variant="text"
                    onClick={() => handleQuantityMinus(item)}
                  >
                    <MinusIcon className=" text-black size-4" />
                  </IconButton>
                  <input
                    className="w-8 rounded-lg text-center"
                    type="text"
                    disabled
                    value={item.quantity}
                  />
                  <IconButton
                    variant="text"
                    onClick={() => handleQuantityPlus(item)}
                  >
                    <PlusIcon className=" text-black size-4" />
                  </IconButton>
                </div>
              </th>

              <th>
                <IconButton
                  variant="text"
                  onClick={() => handleQuantityMinus(item)}
                >
                  <TrashIcon className=" text-red-300 size-7" />
                </IconButton>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex w-screen p-9 pr-16 justify-end">
        <Button onClick={handlePlaceOrder}>Place Order</Button>
      </div>
    </div>
  );
}
