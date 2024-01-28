import {
  Button,
  Input,
  Textarea,
  Tooltip,
  Typography,
} from '@material-tailwind/react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../firebase';
export default function UpdateProduct() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    image: '',
    discount: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const fileRef = useRef();
  const params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const productId = params.productId;
      const res = await fetch(`/api/v1/product/${productId}`);

      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchProduct();
  }, []);

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
    console.log('done');
    e.preventDefault();
    try {
      setLoading(true);
      if (file) {
        handleFileUpload(file);
      }
      console.log(formData);

      const res = await fetch(`/api/v1/product/${params.productId}`, {
        method: 'PUT',
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
      navigate('/admin');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <Typography variant="h2">Update Product</Typography>
      <form
        className=" my-7 w-80 sm:w-96 flex flex-col"
        onSubmit={handleSubmit}
      >
        <Tooltip content="Click To Change Image" placement="bottom">
          <img
            className=" size-40 rounded-lg self-center"
            src={formData.image}
            alt="image"
            onClick={() => fileRef.current.click()}
          />
        </Tooltip>

        <input
          onChange={(e) => setFile(e.target.files[0])}
          id="image"
          type="file"
          ref={fileRef}
          accept="image/*"
          hidden
        />
        <Typography className="mt-3 font-medium">Title</Typography>
        <Input
          type="text"
          id="title"
          onChange={handleChange}
          required
          value={formData.title}
        />
        <Typography className="mt-3 font-medium">Description</Typography>
        <Textarea
          id="description"
          onChange={handleChange}
          required
          value={formData.description}
        />
        <Typography className="mt-3 font-medium">Price</Typography>
        <Input
          type="number"
          min={0}
          id="price"
          onChange={handleChange}
          required
          value={formData.price}
        />
        <Typography className="mt-3 font-medium">Discount</Typography>
        <Input
          type="number"
          max={99}
          min={0}
          id="discount"
          onChange={handleChange}
          value={formData.discount}
        />
        <Button
          className="mt-3 w-full bg-light-blue-900"
          onClick={handleSubmit}
        >
          {loading ? 'loading...' : 'Update Product'}
        </Button>
      </form>
    </div>
  );
}
