import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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
      const res = await fetch('/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
      } else {
        setError(null);
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl text-center font-semibold my-7">Register</h1>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className=" border p-3 rounded-lg"
          id="userName"
          required
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className=" border p-3 rounded-lg"
          id="email"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className=" border p-3 rounded-lg"
          id="password"
          required
          onChange={handleChange}
        />
        {error && <p className=" text-red-500 ">{error}</p>}
        <button
          disabled={isLoading}
          className=" bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-70"
        >
          {isLoading ? 'Loading...' : 'Create Account'}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Already have an account?</p>
        <Link to={'/login'}>
          <span className=" text-blue-700">Log-In</span>
        </Link>
      </div>
    </div>
  );
}
