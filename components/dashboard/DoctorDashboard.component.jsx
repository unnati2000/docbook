import React, { useState } from "react";
import { useQuery, QueryClient } from "react-query";
import axios from "axios";
import cookie from "js-cookie";
import baseURL from "../../utils/baseURL";
import { BsCalendar2Check } from "react-icons/bs";
import { MdCalendarToday } from "react-icons/md";
import { IoCashOutline } from "react-icons/io5";
import AppointmentCard from "./AppointmentCard.component";
import Statistics from "./Statistics.component";

const getAppointments = async (tab) => {
  const data = await axios.get(`${baseURL}/api/appointments/${tab}/`, {
    headers: {
      Authorization: cookie.get("token"),
    },
  });

  return data.data;
};

const DoctorDashboard = ({ user }) => {
  const [tab, setTab] = useState("unchecked");

  const { data } = useQuery(["appointments", tab], () => getAppointments(tab));

  return (
    <div className="grid grid-cols-12 md:min-h-screen">
      <aside className="bg-white col-span-12 md:col-span-3 border-r border-gray-300">
        <div className="flex items-center space-x-4 border-b border-gray-300 pt-8 pl-4 pb-8">
          <img src={user?.profilePic} className="h-12 w-12 rounded-full" />
          <div>
            <h1 className="text-blue-500 font-semibold text-lg">
              {user?.name}
            </h1>
            <p className="text-gray-500 ">{user?.doctor?.speciality}</p>
          </div>
        </div>

        <div className="mt-6">
          <div
            onClick={() => setTab("unchecked")}
            className={
              tab === "unchecked"
                ? "text-blue-500 bg-blue-100 p-2 cursor-pointer rounded-tr-full rounded-br-full flex items-center space-x-4"
                : "text-gray-500 p-2 cursor-pointer rounded-tr-full rounded-br-full flex items-center space-x-4"
            }
          >
            <BsCalendar2Check />
            <p
              className={
                tab === "unchecked"
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }
            >
              Unchecked Appointments
            </p>
          </div>
          <div
            onClick={() => setTab("today")}
            className={
              tab === "today"
                ? "text-blue-500 bg-blue-100 p-2 cursor-pointer rounded-tr-full rounded-br-full flex items-center space-x-4"
                : "text-gray-500 p-2 cursor-pointer rounded-tr-full rounded-br-full flex items-center space-x-4"
            }
          >
            <MdCalendarToday />
            <p
              className={
                tab === "today"
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }
            >
              Today's Appointments
            </p>
          </div>

          <div
            onClick={() => setTab("statistics")}
            className={
              tab === "statistics"
                ? "text-blue-500 bg-blue-100 p-2 cursor-pointer rounded-tr-full rounded-br-full flex items-center space-x-4"
                : "text-gray-500 p-2 cursor-pointer rounded-tr-full rounded-br-full flex items-center space-x-4"
            }
          >
            <IoCashOutline />
            <p
              className={
                tab === "statistics"
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }
            >
              Your Statistics
            </p>
          </div>
        </div>
      </aside>
      <section className="col-span-12 md:col-span-6 bg-white border-r border-gray-300">
        <div className="border-b border-gray-300 py-8 px-4">
          <h2 className="text-gray-500 text-xl">
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </h2>
        </div>

        {tab === "statistics" ? (
          <Statistics data={data} fee={user?.doctor?.initialFee} />
        ) : (
          <AppointmentCard data={data} tab={tab} />
        )}
      </section>
      <aside className="col-span-12 md:col-span-3 bg-white">
        <div className="border-b border-gray-300 py-6 px-4">
          <h2 className="text-blue-500 text-xl">Upcoming Appointment</h2>
        </div>

        <div>
          <div className="flex space-x-2 py-4 px-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDkvFCLSMbUU6Bqb1m-0y3LPAQ7_Gcs-PNZw&usqp=CAU"
              className="h-6 w-6 rounded-full"
            />
            <div>
              <h3 className="text-lg text-blue-500">Name</h3>
              <p className="py-2">Time: 3:45 PM</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default DoctorDashboard;
