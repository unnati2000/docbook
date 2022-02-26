import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import baseURL from "../utils/baseURL";
import { Menu, Transition } from "@headlessui/react";
import { BsChat } from "react-icons/bs";
import { VscBellDot, VscBell } from "react-icons/vsc";
import { MenuAlt2Icon } from "@heroicons/react/outline";
import { logoutUser } from "../utils/auth.utils";
import { SearchIcon } from "@heroicons/react/solid";

const Searchbar = ({ user, setMobileMenuOpen }) => {
  const [search, setSearch] = useState("");

  const router = useRouter();

  const { data, isLoading, isSuccess } = useQuery(
    ["search", search],
    async () => {
      const CancelToken = axios.CancelToken;

      const source = CancelToken.source();

      const promise = await axios.get(`${baseURL}/api/search/${search}`, {
        cancelToken: source.token,
      });

      promise.cancel = () => {
        source.cancel();
      };

      return promise.data;
    },
    {
      enabled: !!search,
    }
  );

  return (
    <header className="w-full text-black">
      <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
        <button
          type="button"
          className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 flex justify-between px-4 sm:px-6">
          <div className="flex-1 flex flex">
            <form className="md:w-1/2  flex md:ml-0 relative">
              <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                  <SearchIcon
                    className="flex-shrink-0 h-5 w-5"
                    aria-hidden="true"
                  />
                </div>
                <input
                  name="search-field"
                  id="search-field"
                  className="h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400"
                  placeholder="Search"
                  type="search"
                  name="search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>

              {!isLoading && isSuccess && (
                <div className="absolute w-full top-20 shadow-md">
                  {data?.users?.map((user) => (
                    <div
                      key={user?._id}
                      onClick={() => {
                        router.push(`/doctor/${user?._id}`);
                        setSearch("");
                      }}
                      className="bg-white flex gap-4 p-4 cursor-pointer border-b border-gray-200"
                    >
                      <img
                        src={user?.profilePic}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-blue-600 font-semibold text-lg">
                          {user?.name}
                        </h3>
                        <p className="text-gray-400">
                          {user?.doctor?.speciality}
                        </p>
                      </div>
                    </div>
                  ))}

                  {data?.doctors?.map((doctor) => (
                    <div
                      key={doctor?.user?._id}
                      onClick={() => {
                        router.push(`/doctor/${doctor?.user?._id}`);
                        setSearch("");
                      }}
                      className="bg-white flex gap-4 p-4 cursor-pointer  border-b border-gray-200"
                    >
                      <img
                        src={user?.profilePic}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-blue-600 font-semibold text-lg">
                          {user?.name}
                        </h3>
                        <p className="text-gray-400">
                          {user?.doctor?.speciality}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>

          <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
            <VscBellDot className="h-6 w-6 text-gray-400" />
            <BsChat className="h-6 w-6 text-gray-400" />
            <Menu as="div" className="relative flex-shrink-0">
              {({ open }) => (
                <>
                  <div>
                    <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={user?.profilePic}
                        alt={user?.name}
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    show={open}
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      static
                      className="origin-top-right cursor-pointer absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <Menu.Item>
                        <a
                          className="block px-4 py-2 text-sm text-gray-700"
                          onClick={() => logoutUser()}
                        >
                          Log out
                        </a>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Searchbar;
