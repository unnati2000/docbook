import { useState } from "react";
import Modal from "react-modal";
import Select from "react-select";
import { AiOutlinePlus, AiFillDelete } from "react-icons/ai";
import { useMutation, useQuery, QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";

import { parseCookies, destroyCookie } from "nookies";

import baseURL from "../utils/baseURL";
import cookie from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";

const getMedicine = async (token) => {
  const { data } = await axios.get(`${baseURL}/api/medicine/`, {
    headers: { Authorization: token },
  });
  return data;
};

const Medication = () => {
  const [open, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [day, setDay] = useState("");
  const [timeFrequency, setTimeFrequency] = useState("");

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: "200",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "540px",
      width: "540px",
    },
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const timeFreq = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
  ];
  const dayFreq = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Bi-Weekly", value: "bi-weekly" },
    { label: "Monthly", value: "monthly" },
  ];
  const { data } = useQuery(["medicine"], () =>
    getMedicine(cookie.get("token"))
  );

  const mutation = useMutation(
    async ({ name, time, day, timeFrequency }) => {
      const { data } = await axios.post(
        `${baseURL}/api/medicine/`,
        {
          name,
          time,
          day,
          frequency: timeFrequency,
        },
        {
          headers: { Authorization: cookie.get("token") },
        }
      );

      return data;
    },
    {
      onSuccess: () => {
        setIsOpen(false);
      },
    }
  );

  const mutation2 = useMutation(async ({ id }) => {
    const { data } = await axios.delete(
      `${baseURL}/api/medicine/${id}`,

      {
        headers: { Authorization: cookie.get("token") },
      }
    );

    return data;
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await mutation.mutateAsync({
        name,
        time,
        day,
        timeFrequency,
      });

      toast.success(data?.msg);
    } catch (error) {
      console.log(error);
      setIsOpen(false);
      toast.error(
        error.response?.data?.msg || "There was an error. Try again later."
      );
    }
  };

  const deleteItem = async (id) => {
    try {
      const data = await mutation2.mutateAsync({
        id,
      });

      toast.success(data?.msg);
    } catch (error) {
      console.log(error);
      setIsOpen(false);
      toast.error(
        error.response?.data?.msg || "There was an error. Try again later."
      );
    }
  };

  return (
    <div>
      <div className="p-8 bg-blue-100">
        <h1 className="text-blue-500 text-2xl font-semibold">
          Your health is our concenrn.
        </h1>
        <p className="text-gray-500">
          Do you have tendency to forgot medicines? Keep track of your medicines
          here
        </p>

        <Modal
          isOpen={open}
          onRequestClose={closeModal}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Example Modal"
        >
          <button
            className="absolute top-5 right-5 text-lg text-red-500 font-semibold"
            onClick={() => setIsOpen(false)}
          >
            x
          </button>

          <form className="p-8" onSubmit={onSubmit}>
            <h1 className="text-blue-600 font-semibold text-xl">
              Add your medicine here!
            </h1>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="postal-code"
              placeholder="Medicine name"
              autoComplete="postal-code"
              className="mt-4 p-2 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md"
            />
            <input
              type="time"
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              id="postal-code"
              placeholder="Medicine name"
              autoComplete="postal-code"
              className="mt-4 p-2 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md"
            />
            <div className="mt-4">
              <Select
                isClearable
                options={timeFreq}
                onChange={(e) => setTimeFrequency(e.value)}
                placeholder="Select frequency by time"
                //   className="md:w-48"
                isSearchable={false}
              />
            </div>

            <div className="mt-4">
              <Select
                isClearable
                options={dayFreq}
                onChange={(e) => setDay(e.value)}
                placeholder="Select frequency by day"
                //   className="md:w-48"
                isSearchable={false}
              />
              <button className="bg-blue-600 flex gap-2 items-center px-4 text-white shadow-md rounded-md my-4 py-2">
                Submit
              </button>
            </div>
          </form>
        </Modal>

        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 flex gap-2 items-center px-4 text-white shadow-md rounded-md my-4 py-2"
        >
          <AiOutlinePlus /> Add medicine
        </button>
      </div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Medicine name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Time
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Frequency during day
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Frequency for time span
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data?.medicine?.map((doc) => (
                    <tr key={doc?._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {doc?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{doc?.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {doc?.frequency}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {doc?.day}{" "}
                      </td>
                      <td
                        onClick={() => deleteItem(doc?._id)}
                        className="px-6 text-center py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        <AiFillDelete className="h-6 w-6" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["medicine"], () =>
    getMedicine(parseCookies(ctx).token)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Medication;
