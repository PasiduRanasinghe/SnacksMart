import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateProduct() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
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
    try {
      setLoading(true);
      const res = await fetch('/api/v1/product/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        return;
      }
      navigate('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="p-3">
      <h1 className=" text-3xl font-semibold text-center my-7">
        Create Product
      </h1>
      <div className="flex justify-center">
        <form
          className=" flex flex-col m-5 w-auto  lg: :w-2/4"
          onSubmit={handleSubmit}
        >
          <input
            className="p-2 mb-1 border bg-white rounded"
            type="file"
            accept="image/*"
          />
          <input
            type="text"
            placeholder="title"
            className=" border p-3 rounded-lg mb-1"
            id="title"
            maxLength="40"
            required
            onChange={handleChange}
          />

          <textarea
            type="text"
            placeholder="Description"
            className=" border p-3 rounded-lg mb-1"
            id="description"
            required
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="price"
            className=" border p-3 rounded-lg mb-1"
            id="price"
            required
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="discount"
            className=" border p-3 rounded-lg mb-1"
            max="100"
            min="0"
            id="discount"
            onChange={handleChange}
          />
          {error ? <p className=" text-red-500">{error}</p> : null}
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-75">
            {loading ? 'loading...' : 'Create product'}
          </button>
        </form>
      </div>
    </main>
  );
}
