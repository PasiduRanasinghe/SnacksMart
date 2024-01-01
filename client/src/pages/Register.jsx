import { Link } from "react-router-dom";
export default function Register() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl text-center font-semibold my-7">Register</h1>
      <form className=" flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className=" border p-3 rounded-lg"
          id="userName"
        />
        <input
          type="text"
          placeholder="email"
          className=" border p-3 rounded-lg"
          id="email"
        />
        <input
          type="text"
          placeholder="password"
          className=" border p-3 rounded-lg"
          id="password"
        />
        <button className=" bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">
          Create Account
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Already have an account?</p>
        <Link to={"/login"}>
          <span className=" text-blue-700">Log-In</span>
        </Link>
      </div>
    </div>
  );
}
