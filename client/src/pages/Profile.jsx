import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from './../firebase';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef();
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

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
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  return (
    <div className=" flex p-3 justify-center">
      <div className=" w-96">
        <h1 className=" text-3xl font-semibold text-center my-7 max-lg">
          Profile
        </h1>
        <form className="flex flex-col gap-4">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt="profile picture"
            className=" rounded-full h-24 w-24 self-center object-cover cursor-pointer mt-2"
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
          <input
            type="text"
            placeholder="username"
            className=" border p-3 rounded-lg mt-2"
          />
          <input
            type="email"
            placeholder="email"
            className=" border p-3 rounded-lg mt-2"
          />
          <input
            type="password"
            placeholder="password"
            className=" border p-3 rounded-lg mt-2"
          />
          <button className=" bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-75">
            update
          </button>
        </form>
        <div className=" flex justify-between mt-5">
          <span className=" text-red-700 cursor-pointer">Delete Account</span>
          <span className=" text-red-700 cursor-pointer">Log Out</span>
        </div>
      </div>
    </div>
  );
}