import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import axios from '../api/axiosInstance';
import Oauth from '../components/Oauth';
import { toast } from 'react-toastify';
import { Input } from '@material-tailwind/react';

export default function Login() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('/auth/login', {
        username: formData.email,
        password: formData.password,
      });
      const data = res.data;
      if (data.success === false) {
        toast.error(data.message);
        return;
      } else {
        dispatch(setUser(data));
        toast.success('Log In Successfully !');
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl text-center font-semibold my-7">Log In</h1>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          id="email"
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
          {loading ? 'loading...' : 'Log In'}
        </button>
        <Oauth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don&apos;t have an account?</p>
        <Link to={'/signup'}>
          <span className=" text-blue-700 hover:underline">Register</span>
        </Link>
      </div>
    </div>
  );
}
