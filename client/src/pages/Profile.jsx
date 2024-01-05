import { useSelector } from 'react-redux';
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className=" flex p-3 justify-center">
      <div className=" w-96">
        <h1 className=" text-3xl font-semibold text-center my-7 max-lg">
          Profile
        </h1>
        <form className="flex flex-col gap-4">
          <img
            src={currentUser.avatar}
            alt="profile picture"
            className=" rounded-full h-24 w-24 self-center object-cover cursor-pointer mt-2"
          />
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
