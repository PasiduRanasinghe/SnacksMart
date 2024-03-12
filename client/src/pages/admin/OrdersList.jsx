import { IconButton, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../../api/axiosInstance';

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path
        fillRule="evenodd"
        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
        clipRule="evenodd"
      />
    </svg>
  );
}
export default function OrdersList() {
  const [ordersList, setOrdersList] = useState([]);
  useEffect(() => {
    const handleUsers = async () => {
      const res = await axios.get('/order/list');
      const data = res.data;
      if (data.success === false) {
        toast.error(data.message);
        return;
      }
      setOrdersList(data);
    };

    handleUsers();
  }, []);

  const handleDeleteUser = async (inquiryId) => {
    try {
      const res = await axios.delete(`/user/${inquiryId}`);
      const data = res.data;
      if (data.success === false) {
        toast.error(data.message);
        return;
      }
      setOrdersList((prev) =>
        prev.filter((inquiry) => inquiry._id !== inquiryId)
      );
      toast.success('User Deleted Successfully !');
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleSelectRole = async (userId, userName, role) => {
    const shouldUpdate = window.confirm(
      `Are you sure you want to update ${userName}'s role to ${role}?`
    );
    if (!shouldUpdate) {
      return;
    }
    try {
      await axios.put(`/user/update-role/${userId}`, {
        role: role,
      });
      toast.success(`${userName}'s Role Updated Successfully`);
    } catch (error) {
      toast.error(error.response.statusText);
    }
  };

  return (
    <>
      <div>
        <Typography variant="h3">Orders List</Typography>
        <table className=" w-full min-w-max table-auto text-left mt-4">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                UserName
              </th>

              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Phone Number
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Address
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Items
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Total
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Status
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Option
              </th>
            </tr>
          </thead>
          <tbody>
            {ordersList &&
              ordersList.length > 0 &&
              ordersList.map((order) => (
                <tr key={order._id}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray">
                      {order.user.userName}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray">
                      {order.user.phoneNumber}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray">
                      {order.user.address}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray">
                      j
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray">
                      LKR{order.total}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <select
                      id="roleSelect"
                      defaultValue={order.orderStatus}
                      className=" bg-transparent p-1 rounded-lg"
                      onChange={(e) => handleSelectRole(e.target.value)}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Placed">Placed</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td className="p-4 border-b border-blue-gray-50">
                    <IconButton
                      onClick={() => handleDeleteUser(order._id)}
                      variant="text"
                      color="red"
                    >
                      <TrashIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
