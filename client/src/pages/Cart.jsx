import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { IconButton, Typography } from '@material-tailwind/react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleQuantityPlus = (item) => {
    dispatch(addToCart(item));
  };
  const handleQuantityMinus = (item) => {
    dispatch(removeFromCart(item));
  };
  return (
    <div className="flex flex-col items-center m-4">
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
        <tbody>
          {cartItems.map((item) => (
            <tr key={item._id}>
              <th>{item.title} </th>
              <th>LKR${item.price}</th>
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
    </div>
  );
}
