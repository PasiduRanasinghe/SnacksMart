import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from './../firebase';
import { removeUser, setUser } from '../redux/slices/userSlice';

import axios from '../api/axiosInstance';

import { toast } from 'react-toastify';
import { Avatar, Button, Input, Typography } from '@material-tailwind/react';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [formData, setFormData] = useState({});
  const [fileUploadError, setFileUploadError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
    const fetchProduct = async () => {
      try {
        const res = await axios.get('/user');

        const data = res.data;
        if (data.success === false) {
          toast.error(data.message);
          return;
        }
        setFormData(data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchProduct();
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `avatars/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    const id = toast.loading('Avatar Uploading...');

    if (formData.avatar) {
      const fileRef = storage.refFromURL(formData.avatar);
      fileRef.delete();
    }

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);

        toast.update(id, {
          render: error.message,
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
          toast.update(id, {
            render: 'Avatar Uploaded !',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
          });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(`/user/update/${currentUser._id}`, {
        body: JSON.stringify(formData),
      });
      const data = res.data;

      if (data.success === false) {
        toast.error('Account update error.');
        return;
      }
      toast.success('Account Updated.');
      dispatch(setUser(data));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    const id = toast.loading('User Deleting...');
    try {
      const res = await axios.delete(`api/v1/user/delete/${currentUser._id}`);
      const data = res.data;
      if (data.success === false) {
        toast.update(id, {
          render: 'Error: User Delete Failed !',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        });
        return;
      } else {
        dispatch(removeUser());
        toast.update(id, {
          render: 'User Deleted Successfully !',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.update(id, {
        render: error.message,
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    }
  };
  const handleLogout = async () => {
    const id = toast.loading('User Deleting...');
    try {
      const res = await axios.get('/auth/logout');
      const data = res.data;

      if (data.success === false) {
        toast.update(id, {
          render: 'Error: Failed Log Out ',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        });
        return;
      }

      dispatch(removeUser());
      toast.update(id, {
        render: 'Logged Out Successfully !',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      toast.update(id, {
        render: error.message,
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className=" flex p-3 justify-center">
      <div className=" w-96">
        <h1 className=" text-3xl font-semibold text-center my-7 max-lg">
          Profile
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <Avatar
            size="xxl"
            variant="rounded"
            withBorder={true}
            src={formData.avatar}
            className=" self-center"
            onClick={() => fileRef.current.click()}
          />

          <div className=" text-sm self-center">
            {fileUploadError ? (
              <span className=" text-red-700">
                Error Unable to upload the image (Image must be less than 2mb)
              </span>
            ) : filePercentage > 0 && filePercentage < 100 ? (
              <span className=" text-slate-700">{`Uploading ${filePercentage}`}</span>
            ) : filePercentage === 100 ? (
              <span className=" text-green-700">Successfully Uploaded</span>
            ) : null}
          </div>

          <Typography className="mt-3 font-medium">Name</Typography>

          <Input
            type="text"
            id="userName"
            value={formData.userName}
            placeholder="name"
            onChange={handleChange}
          />
          <Typography className="mt-3 font-medium">Email</Typography>
          <Input
            type="email"
            id="email"
            value={formData.email}
            placeholder="email"
            onChange={handleChange}
          />
          <Typography className="mt-3 font-medium">Phone Number</Typography>
          <Input
            type="tel"
            id="phoneNumber"
            value={formData.phoneNumber}
            placeholder="phone number"
            onChange={handleChange}
          />
          <Typography className="mt-3 font-medium">Address</Typography>
          <Input
            type="text"
            id="address"
            value={formData.address}
            placeholder="address"
            onChange={handleChange}
          />

          <button className="mt-3 p-2 text-white hover:shadow-xl focus:opacity-90  rounded-lg w-full bg-light-blue-900">
            {loading ? 'loading...' : 'Update'}
          </button>
        </form>
        <div className=" flex justify-between mt-2">
          <Button
            size="sm"
            onClick={handleDeleteUser}
            color="red"
            variant="outlined"
          >
            Delete Account
          </Button>
          <Button
            size="sm"
            onClick={handleLogout}
            color="red"
            variant="outlined"
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}
