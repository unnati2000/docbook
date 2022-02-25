import { useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { useQuery } from "react-query";
import { XCircleIcon, VideoCameraIcon } from "@heroicons/react/solid";
import baseURL from "../utils/baseURL";
import Header from "../components/home/Header.component";
import Chatbot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import { BsChatRight } from "react-icons/bs";
import { useRouter } from "next/router";

const Home = ({ user }) => {
  const router = useRouter();

  const theme = {
    background: "#f5f8fb",
    fontFamily: "Open sans, sans-serif",
    headerBgColor: "#3d6bff",
    headerFontColor: "#fff",
    headerFontSize: "15px",
    botBubbleColor: "#3d6bff",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4a4a4a",
  };

  const { data, isLoading, isError, isSuccess } = useQuery(
    ["appointments", "today"],
    async () => {
      if (user.role === "patient") {
        const { data } = await axios.get(
          `${baseURL}/api/appointments/user/today`,
          {
            headers: {
              Authorization: cookie.get("token"),
            },
          }
        );
        return data;
      } else {
        const { data } = await axios.get(`${baseURL}/api/appointments/today`, {
          headers: {
            Authorization: cookie.get("token"),
          },
        });
        return data;
      }
    }
  );

  const [open, setOpen] = useState(false);
  const steps = [
    {
      id: "Greet",
      message: `Hello ${user?.name}, Welcome to Docbook! How can I help you today?`,
      trigger: "Help",
    },
    {
      id: "Help",
      message: "How can I help you today?",
      trigger: "Options",
    },

    {
      id: "Options",
      options: [
        { value: 1, label: "History page", trigger: "History" },
        { value: 2, label: "Symptom Tracking", trigger: "symptom" },
        { value: 3, label: "Mood tracking", trigger: "Mood" },
      ],
    },
    {
      id: "History",
      component: (
        <button
          className="bg-blue-500 rounded-md shadow-md text-white px-4 py-2"
          onClick={() => router.push("/history")}
        >
          Click here
        </button>
      ),
      trigger: "Done",
    },
    {
      id: "symptom",
      component: (
        <button
          className="bg-blue-500 rounded-md shadow-md text-white px-4 py-2"
          onClick={() => router.push("/symptom")}
        >
          Click here
        </button>
      ),
      trigger: "Done",
    },
    {
      id: "Mood",
      component: (
        <button
          className="bg-blue-500 rounded-md shadow-md text-white px-4 py-2"
          onClick={() => router.push("/mood")}
        >
          Click here
        </button>
      ),
      trigger: "Done",
    },
    {
      id: "Done",
      message: "Thank you for using Docbook",
    },
  ];

  return (
    <div className="">
      <Header />

      <div className="mx-12 my-8">
        <h2 className="text-blue-600 text-2xl mt-4 mb-6 font-semibold my-2">
          Upcoming Appointments
        </h2>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>Error</p>
          ) : isSuccess && data.length === 0 ? (
            <p>No appointments</p>
          ) : (
            data.map((appointment) => (
              <li
                key={appointment._id}
                className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
              >
                <div className="w-full flex justify-between p-6 space-x-6">
                  <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-gray-900 text-sm font-medium truncate">
                        {user.role === "doctor"
                          ? appointment.user.name
                          : appointment.doctor.name}
                      </h3>
                    </div>
                    <p className="mt-1 text-gray-500 text-sm truncate">
                      {appointment.date}
                    </p>

                    <p className="mt-1 text-gray-500 text-sm truncate">
                      {appointment.timeSlot}
                    </p>
                    <p className="mt-1 text-gray-500 text-sm truncate">
                      {appointment.day}
                    </p>
                  </div>
                  <img
                    className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                    src={
                      user.role === "doctor"
                        ? appointment.user.profilePic
                        : appointment.doctor.profilePic
                    }
                    alt={
                      user.role === "doctor"
                        ? appointment.user.name
                        : appointment.doctor.name
                    }
                  />
                </div>
                <div>
                  <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="w-0 flex-1 flex bg-blue-100">
                      <a className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                        <VideoCameraIcon
                          className="w-5 h-5 text-blue-600"
                          aria-hidden="true"
                        />
                        <span className="ml-3 text-blue-600">Join</span>
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="fixed bottom-10 right-10">
        {open && (
          <ThemeProvider theme={theme}>
            <Chatbot steps={steps} />;
          </ThemeProvider>
        )}
        <button
          className="bg-blue-600 p-4 shadow-md rounded-full"
          onClick={() => setOpen(!open)}
        >
          <BsChatRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Home;

{
  /* <li
              key={person.id}
              className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
            >
              <div className="w-full flex justify-between p-6 space-x-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-gray-900 text-sm font-medium truncate">
                      {person.name}
                    </h3>
                  </div>
                  <p className="mt-1 text-gray-500 text-sm truncate">
                    {person.title}
                  </p>

                  <p className="mt-1 text-gray-500 text-sm truncate">
                    {person.time}
                  </p>
                  <p className="mt-1 text-gray-500 text-sm truncate">
                    {person.day}
                  </p>
                </div>
                <img
                  className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                  src={person.imageUrl}
                  alt=""
                />
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="w-0 flex-1 flex bg-blue-100">
                    <a
                      href={`mailto:${person.email}`}
                      className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                    >
                      <VideoCameraIcon
                        className="w-5 h-5 text-blue-600"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-blue-600">Join</span>
                    </a>
                  </div>
                </div>
              </div>
            </li> */
}
