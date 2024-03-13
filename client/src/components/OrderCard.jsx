import React from 'react';
import PropTypes from 'prop-types';

function OrderCard({ order }) {
  return (
    <div className="bg-blue-gray-50 w-11/12 px-4 py-2 my-2 flex flex-col">
      <div className="flex text-gray-900 justify-between pb-2 text-lg  ">
        <p className=" ">Order {order._id}</p>
        <p className="text-gray-800 text-base italic font-normal rounded-lg ">
          {order.orderStatus}
        </p>
      </div>
      {order.items.map((item) => (
        <div className="flex flex-row" key={item._id}>
          <img className=" self-center size-16 bg-black" />
          <div className=" text-md pl-2">
            <p>{item.title}</p>
            <p className=" font-serif font-semibold">Rs. {item.price}</p>
            <p className=" text-gray-700">x{item.quantity}</p>
          </div>
        </div>
      ))}
      <p className=" self-end">
        {order.items.length} Items. Total:
        <span className=" text-orange-800 font-semibold">
          {' '}
          Rs.{order.total}
        </span>
      </p>
      <button
        className=" bg-red-600 py-1 px-5 rounded-md mt-2 text-white self-end  disabled:bg-gray-700"
        disabled={order.orderStatus === 'Cancelled'}
      >
        Cancel
      </button>
    </div>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    orderStatus: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
};

export default OrderCard;
