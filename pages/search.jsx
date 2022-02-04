import { useState, Fragment } from "react";
import axios from "axios";
import Link from "next/link";
import { memo } from "react";
import { useQuery, QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/router";
import { AiFillStar } from "react-icons/ai";
import { FaStarHalf } from "react-icons/fa";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import baseURL from "../utils/baseURL";

const publishingOptions = [
  {
    title: "Fees",
    current: true,
  },
  {
    title: "Rating",
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const getDoctorsFromSearch = async (location, speciality) => {
  const data = await axios.get(
    `${baseURL}/api/search/${location}/${speciality}`
  );
  return data.data;
};

const Doctors = ({ user }) => {
  const router = useRouter();
  const { location, speciality } = router.query;

  const [selected, setSelected] = useState(publishingOptions[0]);

  const { data } = useQuery(["search", location, speciality], () =>
    getDoctorsFromSearch(location, speciality)
  );

  return (
    <div className="text-center my-8">
      <div className="flex justify-between mx-8">
        <h2 className="text-blue-500 text-xl">Search Results</h2>
        <div className="flex items-center space-x-4">
          <p className="text-xl text-blue-500 ">Sort </p>
          <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
              <>
                <div className="relative">
                  <div className="inline-flex shadow-sm rounded-md divide-x divide-blue-600">
                    <div className="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-blue-600">
                      <div className="relative inline-flex items-center bg-blue-500 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        <p className="ml-2.5 text-sm font-medium">
                          {selected.title}
                        </p>
                      </div>
                      <Listbox.Button className="relative inline-flex items-center bg-blue-500 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500">
                        <span className="sr-only">Change published status</span>
                        <ChevronDownIcon
                          className="h-5 w-5 text-white"
                          aria-hidden="true"
                        />
                      </Listbox.Button>
                    </div>
                  </div>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options
                      static
                      className="origin-top-right absolute z-10 right-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      {publishingOptions.map((option) => (
                        <Listbox.Option
                          key={option.title}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "text-white bg-blue-500"
                                : "text-gray-900",
                              "cursor-default select-none relative p-4 text-sm"
                            )
                          }
                          value={option}
                        >
                          {({ selected, active }) => (
                            <div className="flex flex-col">
                              <div className="flex justify-between">
                                <p
                                  className={
                                    selected ? "font-semibold" : "font-normal"
                                  }
                                >
                                  {option.title}
                                </p>
                                {selected ? (
                                  <span
                                    className={
                                      active ? "text-white" : "text-blue-500"
                                    }
                                  >
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>
      </div>
      {data === undefined ? (
        <h1>Loading!!!!</h1>
      ) : (
        data?.map((doc) => (
          <div
            key={doc._id}
            className={
              doc?._id === user?._id
                ? "hidden"
                : "border bg-white rounded-md mx-8 my-4 p-8"
            }
          >
            <div className="flex items-center justify-between">
              <div className="flex text-left">
                <img
                  src={doc?.user?.profilePic}
                  className="h-16 w-16 rounded-full"
                />
                <div className="ml-2">
                  <Link href={`/doctor/${doc?.user?._id}`}>
                    <h2 className="text-blue-500 text-xl font-semibold">
                      {doc?.user?.name}
                    </h2>
                  </Link>

                  <h4 className="text-gray-500 text-md ">{doc?.speciality}</h4>
                  <p className="text-gray-500 text-md">
                    Initial Fee:{" "}
                    <span className="text-blue-500"> ₹{doc?.initialFee}</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="flex items-center">
                  <AiFillStar className="h-4 w-4 text-yellow-500" />
                  <AiFillStar className="h-4 w-4 text-yellow-500" />
                  <AiFillStar className="h-4 w-4 text-yellow-500" />
                  <FaStarHalf />
                </p>
                <Link href={`/doctor/${doc?.user?._id}`}>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md my-2">
                    Book Appointment
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export async function getServerSideProps(ctx) {
  // Get location and speciality from params
  const { location, speciality } = ctx.query;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["search", location, speciality], () =>
    getDoctorsFromSearch(location, speciality)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default memo(Doctors);
