import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { toast } from 'react-toastify';
import OrderCard from '../components/OrderCard';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const handleOrders = async () => {
      const res = await axios.get('/order/list');
      const data = res.data;
      if (data.success === false) {
        toast.error(data.message);
        return;
      }
      setOrders(data);
    };

    handleOrders();
  }, []);

  return (
    <div>
      <h1 className=" font-mono my-3 text-3xl text-center">Orders</h1>
      <div className="flex flex-col items-center">
        <ul className=" w-full flex flex-col items-center">
          {orders &&
            orders.length > 0 &&
            orders.map((order) => <OrderCard key={order._id} order={order} />)}
        </ul>
      </div>
    </div>
  );
}
