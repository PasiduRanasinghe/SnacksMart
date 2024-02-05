import { IconButton, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
export default function UsersList() {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const handleUsers = async () => {
      const res = await axios.get('/user/list');
      const data = res.data;
      if (data.success === false) {
        toast.error(data.message);
        return;
      }
      setUsersList(data);
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
      setUsersList((prev) =>
        prev.filter((inquiry) => inquiry._id !== inquiryId)
      );
      toast.success('User Deleted Successfully !');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div>
        <Typography variant="h3">Users List</Typography>
        <table className=" w-full min-w-max table-auto text-left mt-4">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Name
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Email
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Role
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Option
              </th>
            </tr>
          </thead>
          <tbody>
            {usersList &&
              usersList.length > 0 &&
              usersList.map((user) => (
                <tr key={user._id}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray">
                      {user.userName}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray">
                      {user.email}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                    >
                      {user.role}
                    </Typography>
                  </td>

                  <td className="p-4 border-b border-blue-gray-50">
                    <IconButton
                      onClick={() => handleDeleteUser(user._id)}
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
