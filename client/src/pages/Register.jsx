import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@material-tailwind/react';

import Oauth from '../components/Oauth';
import { toast } from 'react-toastify';
import axios from '../api/axiosInstance';

export default function Register() {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('/auth/signup', {
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
      });
      const data = res.data;
      if (data.success === false) {
        toast.error(data.message);
      } else {
        toast.success('User Registered  Successfully !');
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl text-center font-semibold my-6">Register</h1>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
        <Input
          label="Name"
          type="text"
          id="userName"
          onChange={handleChange}
          required
        />
        <Input
          label="Email"
          type="email"
          id="email"
          onChange={handleChange}
          required
        />
        <Input
          label="Phone Number"
          type="tel"
          id="phoneNumber"
          onChange={handleChange}
          required
        />
        <Input
          label="Address"
          type="text"
          id="address"
          onChange={handleChange}
          required
        />

        <Input
          label="Password"
          type="password"
          id="password"
          onChange={handleChange}
          required
        />

        <button className="mt-2 p-2 text-white hover:shadow-xl focus:opacity-90  rounded-lg w-full bg-light-blue-800">
          {isLoading ? 'loading...' : 'Register'}
        </button>
        <Oauth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Already have an account?</p>
        <Link to={'/login'}>
          <span className=" text-blue-700 hover:underline">Log-In</span>
        </Link>
      </div>
    </div>
  );
}
