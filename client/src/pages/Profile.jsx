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
} from '../redux/user/userSlice';
import {
  Avatar,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';

export default function Profile() {
  const { currentUser, loading } = useSelector((state) => state.user);
  const fileRef = useRef();
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `avatars/${fileName}`);
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
          setFormData({ ...formData, avatar: downloadURL })
        );
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
        toast({
          title: 'Account create error.',
          description: `${data.message}`,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        dispatch(updateUserFailure(data.message));
        return;
      }
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      dispatch(updateUserSuccess(data));
    } catch (error) {
      toast({
        title: 'Account create error.',
        description: `${error.message}`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <Avatar
            size="xl"
            name={currentUser.userName}
            src={formData.avatar || currentUser.avatar}
            alignSelf="center"
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
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              id="username"
              defaultValue={currentUser.userName}
              placeholder="name"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              id="email"
              defaultValue={currentUser.email}
              placeholder="email"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="tel"
              id="phoneNumber"
              defaultValue={currentUser.phoneNumber}
              placeholder="phone number"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input
              type="text"
              id="address"
              defaultValue={currentUser.address}
              placeholder="address"
              onChange={handleChange}
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="yellow"
            isLoading={loading}
            loadingText="Submitting"
          >
            Update
          </Button>
        </form>
        <div className=" flex justify-between mt-2">
          <Button
            size="sm"
            onClick={handleDeleteUser}
            colorScheme="red"
            variant="outline"
          >
            Delete Account
          </Button>
          <Button
            size="sm"
            onClick={handleLogout}
            colorScheme="red"
            variant="outline"
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}
