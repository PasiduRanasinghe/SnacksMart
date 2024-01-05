import { GoSearch } from 'react-icons/go';
import { FaUserLarge, FaCartShopping } from 'react-icons/fa6';
import { Menu } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
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
        <div className="flex items-center justify-evenly p-3 w-30">
          <Menu as="div" className="relative ">
            <div>
              <Menu.Button>
                {currentUser ? (
                  <img
                    src={currentUser.avatar}
                    alt="profile"
                    className="  size-7 rounded-full object-cover"
                  />
                ) : (
                  <FaUserLarge className=" fill-slate-700 size-7" />
                )}
              </Menu.Button>
              {currentUser ? (
                <Menu.Items className="absolute grid justify-items-center right-0 z-10 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className=" p-1 w-24">
                    <Menu.Item>
                      {({ active }) => (
                        <Link to={'/profile'}>
                          <p
                            className={`${
                              active ? 'bg-stone-200' : 'text-gray-900'
                            } group flex w-full items-center rounded-md p-2 justify-center text-sm`}
                            href="/"
                          >
                            Profile
                          </p>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          className={`${
                            active ? ' bg-stone-200' : 'text-gray-900'
                          } group flex w-full items-center rounded-md p-2 justify-center  text-sm`}
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
                            active ? 'bg-stone-200' : 'text-gray-900'
                          } group flex w-full items-center rounded-md p-2 justify-center text-sm`}
                          href="/"
                        >
                          Sign Out
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              ) : (
                <Menu.Items className="absolute grid justify-items-center right-0 z-10 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className=" p-1 w-24">
                    <Menu.Item>
                      {({ active }) => (
                        <Link to={'/login'}>
                          <p
                            className={`${
                              active ? 'bg-stone-200' : 'text-gray-900'
                            } group flex w-full items-center rounded-md p-2 justify-center text-sm`}
                            href="/login"
                          >
                            Log In
                          </p>
                        </Link>
                      )}
                    </Menu.Item>
                    <hr className=" bg-black" />
                    <Menu.Item>
                      {({ active }) => (
                        <Link to={'/signup'}>
                          <p
                            className={`${
                              active ? 'bg-stone-200' : 'text-gray-900'
                            } group flex w-full items-center rounded-md p-2 justify-center text-sm`}
                          >
                            Sign Up
                          </p>
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              )}
            </div>
          </Menu>
          <FaCartShopping className=" fill-slate-700 size-7 ml-3" />
        </div>
      </div>
    </header>
  );
}
