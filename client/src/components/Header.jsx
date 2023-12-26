import { GoSearch } from "react-icons/go";
import {
  FaUserLarge,
  FaCartShopping,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import { Menu, Transition, Popover } from "@headlessui/react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-lime-200 shadow-md">
      <div className="flex justify-between items-center">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex-wrap p-3">
            <span className="text-slate-500">Snacks</span>
            <span className="text-slate-700">Mart</span>
          </h1>
        </Link>
        <form
          action=""
          className="bg-lime-100 p-2  flex items-center rounded-lg"
        >
          <input
            type="text"
            placeholder="Search.."
            className=" bg-transparent w-24 sm:w-64 focus:outline-none"
          />
          <GoSearch className="text-slate-700" />
        </form>
        <div className="flex items-center justify-between p-3 w-20">
          <FaCartShopping className=" fill-slate-700 size-5" />

          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button>
                <FaUserLarge className=" fill-slate-700 size-5" />
              </Menu.Button>
              <Menu.Items className="absolute grid justify-items-center right-0 z-10 mt-2 w-20 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  <Menu.Item className="rounde">
                    {({ active }) => (
                      <a
                        className={`${
                          active ? "bg-lime-400 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        href="/"
                      >
                        Profile
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={`${
                          active ? "bg-lime-400 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        href="/"
                      >
                        Orders
                      </a>
                    )}
                  </Menu.Item>
                  <hr className=" bg-black" />
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={`${
                          active ? " bg-red-400 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        href="/"
                      >
                        Sign Out
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </div>
          </Menu>
        </div>
      </div>
    </header>
  );
}
