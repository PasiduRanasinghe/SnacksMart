import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from './../firebase';
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  logoutUserFailure,
  logoutUserStart,
  logoutUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from '../redux/slices/userSlice';

import axios from '../api/axiosInstance';

import { toast } from 'react-toastify';
import { Avatar, Button, Input, Typography } from '@material-tailwind/react';

export default function Profile() {
  const { currentUser, loading } = useSelector((state) => state.user);
  const fileRef = useRef();
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
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
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
          toast.success('Avatar Uploaded!');
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
      dispatch(updateUserStart());
      const res = await fetch(`api/v1/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        toast.error('Account update error.');
        dispatch(updateUserFailure(data.message));
        return;
      }
      toast.success('Account Updated.');
      dispatch(updateUserSuccess(data));
    } catch (error) {
      toast.error(error.message);
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`api/v1/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      } else {
        dispatch(deleteUserSuccess());
      }
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };
  const handleLogout = async () => {
    try {
      dispatch(logoutUserStart());
      const res = await fetch('/api/v1/auth/logout');
      const data = await res.json();

      if (data.success === false) {
        dispatch(logoutUserFailure(data.message));
        return;
      }
      dispatch(logoutUserSuccess());
    } catch (error) {
      dispatch(logoutUserFailure(error));
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
            id="username"
            defaultValue={formData.userName}
            placeholder="name"
            onChange={handleChange}
          />
          <Typography className="mt-3 font-medium">Email</Typography>
          <Input
            type="email"
            id="email"
            defaultValue={formData.email}
            placeholder="email"
            onChange={handleChange}
          />
          <Typography className="mt-3 font-medium">Phone Number</Typography>
          <Input
            type="tel"
            id="phoneNumber"
            defaultValue={formData.phoneNumber}
            placeholder="phone number"
            onChange={handleChange}
          />
          <Typography className="mt-3 font-medium">Address</Typography>
          <Input
            type="text"
            id="address"
            defaultValue={formData.address}
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
