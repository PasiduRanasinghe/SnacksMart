import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from './../firebase';

export default function CreateProduct() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const toast = useToast();

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `productImages/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        toast({
          title: 'Account create error.',
          description: `${error.message}`,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, image: downloadURL })
        );
      }
    );
  };

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
      if (file) {
        handleFileUpload(file);
      }
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
            onChange={(e) => setFile(e.target.files[0])}
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
